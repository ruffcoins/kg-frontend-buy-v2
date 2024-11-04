import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";
import useApplyCoupon from "@/hooks/mutation/cart/coupon";
import { ApplyCouponDTO } from "@/interfaces/responses/cart.interface";

const Coupon = ({
  price,
  productId,
  storeId,
  setSubtractBy,
  couponCode,
  setCouponCode,
}: {
  price: number;
  productId: string;
  storeId: string;
  setSubtractBy: Dispatch<SetStateAction<number>>;
  couponCode: string;
  setCouponCode: Dispatch<SetStateAction<string>>;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const { applyCouponAsync } = useApplyCoupon();

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    const applyCouponPayload: ApplyCouponDTO = {
      coupon: couponCode.toUpperCase(),
      price,
      productCoupons: [{ price, productId }],
      storeId,
    };

    setIsLoading(true);
    setCouponError("");

    try {
      const { response, message } = await applyCouponAsync(applyCouponPayload);

      if (typeof response === "string") {
        setCouponError("Invalid coupon code");
        if (message === "User has already used the coupon!") {
          setCouponError("You have used this coupon");
        }
      } else {
        setSubtractBy(response.price - response.newPrice);
        setIsCouponApplied(true);
      }
    } catch (error) {
      setCouponError("Invalid coupon code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setSubtractBy(0);
    setCouponCode("");
    setIsCouponApplied(false);
  };

  return (
    <div className="flex flex-col space-y-4 bg-white rounded-xl p-6 font-medium">
      <div className="flex justify-between">
        <p>Have a Coupon?</p>
        <ChevronDownIcon
          onClick={() => setIsVisible((prev) => !prev)}
          className={cn(
            "w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out",
            isVisible ? "rotate-180" : "",
          )}
        />
      </div>

      {isVisible ? (
        <div className="space-y-3">
          <Input
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              if (e.target.value === "") {
                setCouponError("");
              }
            }}
            className="h-12 text-sm font-normal uppercase"
            placeholder="Enter coupon code"
            disabled={isLoading || isCouponApplied}
          />
          {couponError && (
            <p
              className="text-kaiglo_critical-500 text-xs font-medium"
              aria-live="assertive"
            >
              {couponError}
            </p>
          )}
          <Button
            className={cn(
              "rounded-full w-full h-12",
              isCouponApplied &&
                "bg-kaiglo_critical-500 text-white hover:bg-kaiglo_critical-400",
            )}
            onClick={isCouponApplied ? handleRemoveCoupon : handleApplyCoupon}
          >
            {isLoading
              ? "Applying..."
              : isCouponApplied
                ? "Remove Coupon"
                : "Apply"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Coupon;
