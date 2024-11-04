"use client";

import Placeholder from "@/public/images/product-image-placeholder.png";
import ImageGallery from "./ImageGallery";
import Rating from "@/components/shared/Rating";
import Image from "next/image";
import ShippingGreen from "@/public/images/shipping-green.svg";
import { Button } from "@/components/ui/button";
import ProductSelectionDialog from "./ProductSelectionDialog";
import { getPriceRange } from "@/lib/utils";
import ProductBadge from "./ProductBadge";
import useProductDetail from "@/hooks/useProductDetail";
import { useEffect, useState } from "react";
import { AuthDialog } from "../auth/dialogs/AuthDialog";
import EnterOtp from "../auth/dialogs/EnterOtp";
import { useGetRatingAndReviewSummary } from "@/hooks/queries/products/getRatingSummary";
import { gtmProductView } from "@/lib/gtm";
import DownloadAppDialog from "@/components/product/DownloadAppDialog";

const ProductDetailsIntroduction = ({ productId }: { productId: string }) => {
  const {
    images,
    data,
    newPrices,
    prices,
    colors,
    toggleProductSelectionDialog,
    openProductSelectionDialog,
    setOpenProductSelectionDialog,
  } = useProductDetail(productId);
  const { ratingAndReviewSummary } = useGetRatingAndReviewSummary(productId);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [openDownloadAppModal, setOpenDownloadAppModal] = useState(false);

  useEffect(() => {
    if (productId && data) {
      const product = data.response;

      const props = {
        value:
          product.productColors[0].productPriceDetails[0].price *
          parseInt(product.productColors[0].productPriceDetails[0].quantity),
        id: product.id,
        name: product.name,
        price: product.productColors[0].productPriceDetails[0].price,
        quantity: parseInt(
          product.productColors[0].productPriceDetails[0].quantity,
        ),
        category: product.category,
        subCategory: product.subCategory,
        secondSubCategory: product.secondSubCategory,
        storeName: product.store.storeName,
      };
      gtmProductView(props);
    }
  }, [productId]);

  return (
    <>
      <div className="grid grid-cols-12 lg:gap-5 lg:mx-8">
        <div className="lg:col-span-5 col-span-12">
          <ImageGallery
            images={images}
            id={productId}
            name={data?.response.name as string}
            price={0}
          />
        </div>
        <div className="lg:col-span-7 col-span-12 lg:rounded-2xl p-4 lg:p-6 bg-white">
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              <h1 className="font-bold lg:text-2xl">{data?.response.name}</h1>

              <div className="flex lg:flex-row flex-col justify-between space-y-2 lg:space-y-0">
                <div className="flex space-x-2 items-center">
                  <Rating rating={ratingAndReviewSummary?.averageRating || 0} />
                  <p className="text-sm text-kaiglo_grey-placeholder">
                    ({ratingAndReviewSummary?.totalNumberOfReviews || 0}{" "}
                    verified reviews)
                  </p>
                </div>

                <p className="w-fit flex items-center text-xs rounded-lg bg-kaiglo_grey-100 p-2.5 gap-2 font-bold">
                  SKU:{" "}
                  <span className="text-kaiglo_grey-placeholder">
                    {data?.response.productColors[0].productPriceDetails[0].sku}
                  </span>
                </p>
              </div>

              <div className="lg:border border-kaiglo_grey-disabled rounded-lg lg:p-4 py-2">
                {data?.response.sales ? (
                  data.response.kaigloSale === "APP_ONLY_DEALS" ? (
                    <div className="space-y-2">
                      <p className="font-bold text-xl lg:text-2xl">
                        ₦{prices[0].toLocaleString()}
                      </p>

                      <div className="bg-kaiglo_info-100 text-kaiglo_info-base w-fit rounded-md py-[9px] px-3 space-x-3 flex items-center">
                        <p className="font-bold lg:text-lg">
                          {getPriceRange(newPrices)}
                        </p>
                        <ProductBadge
                          discount={
                            data?.response.productColors[0]
                              .productPriceDetails[0].discount
                          }
                          type={data?.response.kaigloSale as string}
                          className=""
                        />
                        <div className="text-kaiglo_info-base font-bold text-sm lg:text-base bg-white rounded-md px-2 py-1">
                          <p className="text-[10px]">App Only Deal</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-bold text-lg lg:text-2xl">
                        {getPriceRange(newPrices)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium line-through text-kaiglo_grey-placeholder h-full">
                          ₦{prices[0].toLocaleString()}
                        </span>

                        <ProductBadge
                          discount={
                            data?.response.productColors[0]
                              .productPriceDetails[0].discount
                          }
                          type={data?.response.kaigloSale as string}
                          className=""
                        />
                      </div>
                    </div>
                  )
                ) : (
                  <p className="font-bold text-lg lg:text-2xl">
                    {getPriceRange(prices)}
                  </p>
                )}
              </div>

              <div className="lg:border border-kaiglo_grey-disabled rounded-lg lg:p-4 space-y-2">
                <p className="font-medium">Select Colour, Size</p>

                <div className="flex justify-between items-center">
                  <div className="flex gap-x-2 overflow-x-auto">
                    {colors.map((color, index) => (
                      <div
                        className="border-2 border-kaiglo_grey-placeholder rounded-lg cursor-pointer"
                        key={index}
                        onClick={toggleProductSelectionDialog}
                      >
                        <Image
                          src={color.colorUrl || Placeholder}
                          alt={`colour ${color.color.color}`}
                          className="rounded-md min-w-14 lg:w-12 lg:h-12 min-h-14 object-cover overflow-hidden"
                          width={48}
                          height={48}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:border border-kaiglo_grey-disabled rounded-lg lg:p-4 space-y-2 py-2">
                <div className="flex space-x-2">
                  <Image
                    src={ShippingGreen}
                    alt="Shipping green"
                    className="w-6 h-6"
                    width={24}
                    height={24}
                  />
                  <p className="font-medium">Door Delivery</p>
                </div>

                <div className="grid grid-cols-5 justify-between items-center text-sm text-kaiglo_grey-base gap-x-8 gap-y-4">
                  <div className="col-span-3 space-y-1 flex flex-col lg:flex-row lg:justify-between items-start lg:items-center">
                    <p className="">Pay on Delivery Available - Lagos</p>
                    <p className="lg:text-center order-last">2-7 Days</p>
                  </div>

                  <p className="col-span-2 lg:text-center text-black font-bold lg:order-last text-end">
                    From ₦3,000
                  </p>
                </div>
              </div>
            </div>

            {data?.response.kaigloSale === "APP_ONLY_DEALS" ? (
              <div className="hidden lg:flex justify-between space-x-8 mt-8 xl:mt-0">
                <Button
                  variant="ghost"
                  className="text-black rounded-full min:w-[316px] w-full h-12 uppercase font-medium bg-transparent border border-black"
                  onClick={toggleProductSelectionDialog}
                >
                  Buy Now
                </Button>

                <Button
                  variant="info_solid"
                  className="min:w-[316px] w-full h-12 text-white rounded-full px-8 py-3 uppercase font-medium"
                  onClick={() => setOpenDownloadAppModal(true)}
                >
                  App Deal ({getPriceRange(newPrices)})
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex justify-between space-x-8 mt-8 xl:mt-0">
                <Button
                  variant="accent"
                  className="text-black rounded-full min:w-[316px] w-full h-12 uppercase font-medium bg-kaiglo_accent-100"
                  onClick={toggleProductSelectionDialog}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="primary"
                  className="bg-kaiglo_brand-base min:w-[316px] w-full h-12 text-white rounded-full px-8 py-3 uppercase font-medium"
                  onClick={toggleProductSelectionDialog}
                >
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {openProductSelectionDialog && (
        <ProductSelectionDialog
          colors={colors}
          productUrl={data?.response.productUrl as string}
          productId={data?.response.id as string}
          productName={data?.response.name as string}
          open={openProductSelectionDialog}
          setOpen={setOpenProductSelectionDialog}
          setOpenAuthModal={setOpenAuthModal}
          setOpenSideCart={undefined}
        />
      )}

      {openAuthModal && (
        <AuthDialog
          openAuthModal={openAuthModal}
          setOpenAuthModal={setOpenAuthModal}
          setShowOtpModal={setShowOtpModal}
          setEmail={setEmail}
          setPhone={setPhone}
        />
      )}

      {showOtpModal && (
        <EnterOtp
          open={showOtpModal}
          setOpen={setShowOtpModal}
          email={email}
          phone={phone}
        />
      )}

      {openDownloadAppModal && (
        <DownloadAppDialog
          open={openDownloadAppModal}
          setOpen={setOpenDownloadAppModal}
        />
      )}
    </>
  );
};

export default ProductDetailsIntroduction;
