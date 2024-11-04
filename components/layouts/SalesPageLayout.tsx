"use client";

import useGetSalesPromotion from "@/hooks/queries/homePage/getSalePromotion";
import { useGetSalePromotionProducts } from "@/hooks/queries/homePage/getSalePromotionProducts";
import { capitalizeFirstLetterOfEachWord, cn } from "@/lib/utils";
import Image from "next/image";
import CountdownTimer from "../shared/CountdownTimer";
import ProductCard from "../product/ProductCard";
import Loader from "../shared/Loader";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import ErrorComponent from "../shared/ErrorComponent";
import Link from "next/link";

const SalesPageLayout = ({ saleName }: { saleName: string }) => {
  const { salesPromotion } = useGetSalesPromotion(saleName);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    promotionProducts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetchPromotionProducts,
    status,
  } = useGetSalePromotionProducts(saleName);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") {
    return (
      <div className="lg:px-8 px-4 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <ErrorComponent
        message="Failed to load sales promotion products."
        action={refetchPromotionProducts}
      />
    );
  }

  return (
    <>
      {salesPromotion === undefined ? (
        <main className="grid min-50vh mt-40 max-w-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 shadow">
          <div className="text-center">
            <p className="text-base font-semibold text-kaiglo_brand-base">
              Uh Oh!
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {`${capitalizeFirstLetterOfEachWord(saleName.replace(/_/g, " "))} sale does not exist!!`}
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-kaiglo_brand-base px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-kaiglo_brand-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kaiglo_brand-base"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <div
          className={cn(
            "relative pb-14 space-y-6 min-h-screen",
            `bg-[${salesPromotion?.colors.background}]`,
          )}
          style={{ background: salesPromotion?.colors.background }}
        >
          <div className="lg:mx-8 mx-4 mt-4">
            <Image
              src={
                isMobile
                  ? salesPromotion.banners.mobileSalesPage
                  : salesPromotion.banners.desktopSalesPage
              }
              alt="promotion banner"
              width={2000}
              height={296}
              className="lg:h-[400px] h-36 object-cover rounded-t-md"
            />
            <div className="lg:h-24 h-16 rounded-b-md flex justify-center items-center bg-opacity-30 bg-black">
              <CountdownTimer
                endDate={salesPromotion?.endDate as string}
                backgroundColor={salesPromotion?.colors.itemCountBG}
                textColor={salesPromotion?.colors.itemCountText}
              />
            </div>
          </div>
          <div className="lg:mx-8 mx-4 mt-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
            {promotionProducts?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={
                  product.productColors[0].productPriceDetails[0].newPrice
                    ? product.productColors[0].productPriceDetails[0].newPrice
                    : product.productColors[0].productPriceDetails[0].price
                }
                oldPrice={
                  product.productColors[0].productPriceDetails[0].newPrice
                    ? product.productColors[0].productPriceDetails[0].price
                    : undefined
                }
                category={product.category}
                discount={
                  product.productColors[0].productPriceDetails[0].discount
                }
                imageUrl={product.productUrl}
                kaigloSale={product.kaigloSale as string}
                sales={product.sales}
                sold={product.sold}
                featured={product.featured}
                productViews={product.productViews}
              />
            ))}
          </div>

          {isFetchingNextPage && (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          )}

          <div ref={ref}>
            {/* This empty div acts as a sentinel for the IntersectionObserver */}
          </div>
        </div>
      )}
    </>
  );
};
export default SalesPageLayout;
