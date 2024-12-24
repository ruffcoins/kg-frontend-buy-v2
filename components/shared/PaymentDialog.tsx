"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SetStateAction, useState, Dispatch } from "react";
import PayOnDelivery from "@/public/images/pay-on-delivery.svg";
import PayFromWallet from "@/public/images/pay-from-wallet.svg";
import PayFromCard from "@/public/images/pay-from-card.svg";
import Image from "next/image";
import { useUserWallet } from "@/hooks/queries/wallet/getUserWallet";
import {
  cn,
  getKlumpPayloadItems,
  getPhoneNumWithoutCountryCode,
} from "@/lib/utils";
import { useGetShippingCost } from "@/hooks/queries/getShippingCost";
import { useDebitWallet } from "@/hooks/mutation/wallet/debitWallet";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import useCreateOrder from "@/hooks/mutation/order/createOrder";
import {
  CheckoutOrderItem,
  CheckoutPaymentDTO,
} from "@/interfaces/checkout.interface";
import { ICacheCart } from "@/lib/cookieUtils";
import Pay from "./Pay";
import { DialogDescription } from "@radix-ui/react-dialog";
import { AbandonedOrderDTO } from "@/interfaces/orders/order.interface";
import useAbandonedOrder from "@/hooks/mutation/order/abandonedOrder";
import { sendGTMEvent } from "@next/third-parties/google";
// @ts-ignore
import { KlumpCheckout } from "klump-react";
import {
  KlumpOnErrorResponse,
  KlumpOnOpenOrOnLoadResponse,
  KlumpOnSuccessResponse,
} from "@/interfaces/klump/klump.interface";
import useGetKlumpActive from "@/hooks/queries/configuration/getKlumpActive";
import { klumpConsts } from "@/constants/siteConfig";
import useKlumpPublicKey from "@/hooks/queries/configuration/getKlumpPublicKey";
import useCreateKlumpTransaction from "@/hooks/mutation/order/createKlumpTransaction";
import { KlumpTransactionDTO } from "@/interfaces/dtos/klump.dto.interface";

const PaymentDialog = ({
  open,
  setOpen,
  checkoutAmount,
  totalAmount,
  lga,
  state,
  shippingAmount,
  address,
  name,
  email,
  transformedCartItems,
  setOrderCreated,
  setIsProcessing,
  appliedCoupon,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  checkoutAmount: string;
  totalAmount: number;
  lga: string;
  state: string;
  shippingAmount: string;
  checkoutItems: ICacheCart[];
  address: string;
  name: string;
  email: string;
  transformedCartItems: CheckoutOrderItem[];
  setOrderCreated: React.Dispatch<SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<SetStateAction<boolean>>;
  appliedCoupon: string;
}) => {
  const userDetails: {
    address: string;
    appliedCoupon: string;
    buyer: string;
    state: string;
    email: string;
  } = {
    address,
    appliedCoupon,
    buyer: name,
    state,
    email,
  };

  const { user } = useFetchUserProfile();
  const { wallet, fetchingWallet } = useUserWallet();
  const [selectedMethod, setSelectedMethod] = useState("cards");
  const { shippingCost } = useGetShippingCost(lga, state);
  const { debitWalletAsync } = useDebitWallet();
  const { createOrderAsync } = useCreateOrder();
  const { abandonedOrder } = useAbandonedOrder();
  const { createKlumpTransaction } = useCreateKlumpTransaction();
  const { klumpIsActive, klumpThresholdAmount } = useGetKlumpActive(
    klumpConsts.KLUMP_CHECKOUT,
  );
  const { klumpPublicKey, fetchingKlumpPublicKey } = useKlumpPublicKey(
    klumpConsts.KLUMP_PUBLIC_KEY,
  );
  const [isClosingOrganically, setIsClosingOrganically] = useState(false);

  const handlePayment = async () => {
    setIsClosingOrganically(true);

    // Handle payment with Klump
    if (selectedMethod === "klump") {
      // generate order items for klump payload
      const klumpItems = getKlumpPayloadItems(transformedCartItems);
      const klumpAmount = parseInt(checkoutAmount) + parseInt(shippingAmount);
      const klumpShippingFee = parseInt(shippingAmount);
      const klumpPhoneNum = getPhoneNumWithoutCountryCode(user.phone);
      const klumpEmail = userDetails.email;
      const klumpRedirectURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}app/orders`;

      // Generate payload for klump
      const klumpPayload = {
        publicKey: klumpPublicKey,
        data: {
          amount: klumpAmount,
          shipping_fee: klumpShippingFee,
          currency: "NGN",
          phone: klumpPhoneNum,
          email: klumpEmail,
          items: klumpItems,
          redirect_url: klumpRedirectURL,
          meta_data: {
            customerId: user.id,
            email: user.email,
          },
        },
        onSuccess: (data: KlumpOnSuccessResponse) => {
          if (data.data?.data.status === "successful") {
            const checkoutPayload = {
              checkoutPayLoad: {
                items: transformedCartItems,
                tax: "0",
                buyerEmail: userDetails.email,
                orderTotal: totalAmount.toString(),
                subTotal: checkoutAmount.toString(),
                shipping: shippingAmount,
                platform: "WEB",
              },
              paymentOption: "KLUMP",
              paymentDetail: {
                message: "Approved",
                reference: data.data.data.data.reference,
                status: data.data.data.status,
                trans: data.data.data.data.reference,
                transaction: data.data.data.data.reference,
                trxref: data.data.data.data.reference,
              },
            };

            const klumpTransactionPayload: Partial<KlumpTransactionDTO> = {
              status: data.data.data.status,
              reference: data.data.data.data.reference,
              userId: user.id,
              amount: klumpAmount,
              shippingFee: klumpShippingFee,
              currency: "NGN",
              redirectUrl: klumpRedirectURL,
              metaData: {
                customerId: user.id,
                email: user.email,
              },
            };

            createOrderAsync(checkoutPayload).then(() =>
              setOrderCreated?.(true),
            );
            createKlumpTransaction(klumpTransactionPayload);
          }
        },
        onError: (data: KlumpOnErrorResponse) => {
          handleAbandonOrder();
        },

        onLoad: (data: KlumpOnOpenOrOnLoadResponse) => {
          console.log("Klump checkout loading:", data);
        },

        onOpen: (data: KlumpOnOpenOrOnLoadResponse) => {
          console.log("Klump checkout opened:", data);
        },

        onClose: (data: KlumpOnOpenOrOnLoadResponse) => {
          handleAbandonOrder();
        },
      };

      // @ts-ignore
      new Klump(klumpPayload);
    }

    // Handle payment with wallet
    if (selectedMethod === "balance") {
      await debitWalletAsync({
        amount: totalAmount,
        channel: "WEB",
        description: "Product Purchase",
        referenceCode: "",
        tranType: "",
        userId: user.id,
      }).then((data) => {
        const checkoutPayload: CheckoutPaymentDTO = {
          checkoutPayLoad: {
            items: transformedCartItems,
            tax: "0",
            buyerEmail: userDetails.email,
            orderTotal: totalAmount.toString(),
            subTotal: checkoutAmount.toString(),
            shipping: shippingAmount,
            platform: "WEB",
            debitId: data.response.id,
          },
          paymentOption: "WALLET",
        };
        createOrderAsync(checkoutPayload).then(() => setOrderCreated(true));
      });
    }

    // Handle payment with cash on delivery
    if (selectedMethod === "pod") {
      const checkoutPayload: CheckoutPaymentDTO = {
        checkoutPayLoad: {
          items: transformedCartItems,
          tax: "0",
          buyerEmail: userDetails.email,
          orderTotal: totalAmount.toString(),
          subTotal: checkoutAmount.toString(),
          shipping: shippingAmount,
          platform: "WEB",
        },
        paymentOption: "PAY_ON_DELIVERY",
        paymentDetail: {},
      };
      createOrderAsync(checkoutPayload).then(() => setOrderCreated(true));
    }
  };

  const handleAbandonOrder = async () => {
    const abandonedOrderPayload: AbandonedOrderDTO = {
      amount: totalAmount.toString(),
      platform: "WEB",
      productIds: transformedCartItems.map(
        (item) => item.orderLines[0].orderItem.productId,
      ),
      shipping: shippingAmount,
      userId: user.id,
    };

    abandonedOrder(abandonedOrderPayload);
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          if (!newOpen && !isClosingOrganically) {
            console.log("Dialog closed without proceeding to next step");
            handleAbandonOrder();
          }
          setOpen(newOpen);
          setIsClosingOrganically(false);
        }}
      >
        <DialogContent className="lg:w-[552px]">
          <DialogHeader>
            <DialogTitle className="text-start lg:text-center">
              Select Payment Method
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Klump */}

            {!fetchingKlumpPublicKey &&
              klumpIsActive &&
              klumpThresholdAmount &&
              parseInt(checkoutAmount) >= parseInt(klumpThresholdAmount) && (
                <div
                  className={`flex space-x-4 ${selectedMethod === "klump" ? "selected" : ""}`}
                  onClick={() => setSelectedMethod("klump")}
                >
                  <input
                    type="radio"
                    checked={selectedMethod === "klump"}
                    readOnly
                  />
                  <div className="rounded-xl px-4 py-2 border grid items-center w-full ">
                    <KlumpCheckout />
                  </div>
                </div>
              )}

            {/* Cards */}
            <div
              className={`flex space-x-4 ${selectedMethod === "cards" ? "selected" : ""}`}
              onClick={() => setSelectedMethod("cards")}
            >
              <input
                type="radio"
                checked={selectedMethod === "cards"}
                readOnly
              />
              <div className="rounded-xl p-4 border flex items-center justify-between w-full">
                <div className="flex space-y-1 flex-col font-medium h-fit">
                  <div className="text-sm">
                    Pay with Cards, Transfer or USSD
                  </div>
                  <div className="text-[10px] text-kaiglo_grey-placeholder">
                    Pay online with paystack secure payment
                  </div>
                </div>
                <Image
                  src={PayFromCard}
                  alt="Pay with card"
                  width={500}
                  height={200}
                  className="lg:block hidden w-[148px]"
                />
              </div>
            </div>

            {/* Wallet */}
            <div
              className={`flex flex-col space-y-2 ${selectedMethod === "balance" ? "selected" : ""}`}
              onClick={() => {
                if (!fetchingWallet && wallet && totalAmount <= wallet.amount) {
                  setSelectedMethod("balance");
                }
              }}
            >
              <div className="flex space-x-4">
                <input
                  type="radio"
                  checked={selectedMethod === "balance"}
                  readOnly
                  disabled={
                    fetchingWallet || !wallet || totalAmount > wallet?.amount
                  }
                  className="disabled:cursor-not-allowed"
                />
                <div
                  className={cn(
                    wallet &&
                      totalAmount > wallet?.amount &&
                      "bg-[#f5f7fa] text-[#cbd1db]",
                    "rounded-xl p-4 border flex justify-between w-full",
                  )}
                >
                  <>
                    <div className="flex space-y-1 flex-col font-medium">
                      <div className="text-sm">
                        Balance ₦{wallet?.amount.toLocaleString()}
                      </div>
                      <div
                        className={cn(
                          wallet && totalAmount > wallet?.amount
                            ? "text-[#cbd1db]"
                            : "text-kaiglo_grey-placeholder",
                          "text-[10px] ",
                        )}
                      >
                        Pay with Shopping Balance
                      </div>
                    </div>
                    <Image
                      src={PayFromWallet}
                      alt="Pay with wallet"
                      width={500}
                      height={200}
                      className={cn(
                        wallet && totalAmount > wallet?.amount
                          ? "opacity-40"
                          : "opacity-100",
                        "w-[148px] lg:block hidden ",
                      )}
                    />
                  </>
                </div>
              </div>

              {wallet && totalAmount > wallet?.amount && (
                <p className="pl-8 text-sm text-kaiglo_critical-base font-medium">
                  Insufficient Wallet Balance
                </p>
              )}
            </div>

            {/* Pay on delivery */}
            <div
              className={`flex space-x-4 ${selectedMethod === "pod" ? "selected" : ""}`}
              onClick={() => {
                if (shippingCost?.paidOnDelivery) {
                  setSelectedMethod("pod");
                }
              }}
            >
              <input
                type="radio"
                checked={selectedMethod === "pod"}
                className="disabled:cursor-not-allowed"
                readOnly
                disabled={!shippingCost?.paidOnDelivery}
              />
              <div
                className={cn(
                  !shippingCost?.paidOnDelivery &&
                    "bg-[#f5f7fa] text-[#cbd1db]",
                  "rounded-xl p-4 border flex justify-between w-full",
                )}
              >
                <div className="flex space-y-1 flex-col font-medium">
                  <div className="text-sm">Pay with cash upon delivery</div>
                  <div
                    className={cn(
                      !shippingCost?.paidOnDelivery
                        ? "text-[#cbd1db]"
                        : "text-kaiglo_grey-placeholder",
                      "text-[10px] ",
                    )}
                  >
                    Pay with cash, Transfer, POS
                  </div>
                </div>
                <Image
                  src={PayOnDelivery}
                  alt="Pay on delivery"
                  width={500}
                  height={200}
                  className={cn(
                    !shippingCost?.paidOnDelivery
                      ? "opacity-40"
                      : "opacity-100",
                    "w-[148px] lg:block hidden ",
                  )}
                />
              </div>
            </div>
          </div>

          {/* Render paystack payment button */}
          {selectedMethod === "cards" ? (
            <Pay
              amount={totalAmount * 100}
              email={user?.email}
              referrer={""}
              classNames={
                "bg-kaiglo_brand-base h-12 w-full rounded-full text-white font-medium uppercase"
              }
              userId={user?.id}
              setOpen={setOpen}
              setBalance={undefined}
              action="payment"
              transformedCartItems={transformedCartItems}
              checkoutAmount={checkoutAmount}
              shippingAmount={shippingAmount}
              address={address}
              name={name}
              setOrderCreated={setOrderCreated}
              state={state}
              setIsProcessing={setIsProcessing}
              abandonedOrder={handleAbandonOrder}
            />
          ) : (
            <Button
              variant="primary"
              className="rounded-full flex-1 min-h-12 font-medium"
              onClick={() => {
                handlePayment();
                setOpen(false);

                if (
                  process.env.NODE_ENV === "production" &&
                  process.env.NEXT_PUBLIC_KAIGLO_ENV === "prod"
                ) {
                  sendGTMEvent({ ecommerce: null });

                  sendGTMEvent({
                    event: "add_payment_info",
                    ecommerce: {
                      currency: "NGN",
                      value: checkoutAmount,
                      payment_type: selectedMethod,
                      items: transformedCartItems,
                    },
                    kaigloEnv: process.env.NEXT_PUBLIC_KAIGLO_ENV,
                  });
                }
              }}
            >
              PAY
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default PaymentDialog;
