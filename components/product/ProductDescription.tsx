"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { useGetProductDescription } from "@/hooks/queries/products/gerProductDescription";
import useProductDetail from "@/hooks/useProductDetail";
import { productSpecificationsAreValid } from "@/lib/utils";

const ProductDescription = ({ productId }: { productId: string }) => {
  return (
    <div className="lg:mx-8 bg-white lg:rounded-2xl lg:p-6 p-4 pb-0 space-y-8">
      <h1 className="font-medium text-3xl">Description</h1>
      <ProductSpecifications productId={productId} />
      <Description productId={productId} />
    </div>
  );
};

export default ProductDescription;

const ProductSpecifications = ({ productId }: { productId: string }) => {
  const { data } = useProductDetail(productId);

  // return data?.response.specifications &&
  //   data?.response.specifications.length > 0 ? (
  return data?.response.specifications &&
    data?.response.specifications.length > 0 &&
    productSpecificationsAreValid(data?.response.specifications) ? (
    <div className="border border-kaiglo_grey-placeholder rounded-lg">
      <h2 className="font-bold py-4 px-6 border-b border-kaiglo_grey-placeholder">
        Product Specifications
      </h2>
      <div className="p-6">
        <table className="w-full text-left">
          <tbody className="space-y-4">
            {/*{data?.response.specifications.map((specification) => (*/}
            {/*  <tr key={specification.name} className="grid grid-cols-12">*/}
            {/*    <td className="font-semibold lg:col-span-3 col-span-5 capitalize">*/}
            {/*      {specification.name}*/}
            {/*    </td>*/}
            {/*    <td className="capitalize lg:col-span-9 col-span-7">*/}
            {/*      {specification.option ?? "null"}*/}
            {/*    </td>*/}
            {/*  </tr>*/}
            {/*))}*/}
            {data?.response.specifications.map((specification) => {
              if (specification.option != null) {
                return (
                  <tr key={specification.name} className="grid grid-cols-12">
                    <td className="font-semibold lg:col-span-3 col-span-5 capitalize">
                      {specification.name}
                    </td>
                    <td className="capitalize lg:col-span-9 col-span-7">
                      {specification.option ?? "null"}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : null;
};

const Description = ({ productId }: { productId: string }) => {
  const { productDescription } = useGetProductDescription(productId);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const maxHeight = 100;

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [productDescription]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col">
      <div
        ref={contentRef}
        className={`text-sm ${isExpanded ? "" : "line-clamp-4"}`}
        style={{
          maxHeight: isExpanded ? "none" : `${maxHeight}px`,
          overflow: "hidden",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: productDescription as string }}
        />
      </div>

      {isOverflowing && (
        <Button
          variant="secondary"
          onClick={toggleExpanded}
          className="font-medium mx-auto flex justify-center rounded-full mt-8"
        >
          {isExpanded ? "See Less" : "See More"}
          <span>{isExpanded ? <CaretUpIcon /> : <CaretDownIcon />}</span>
        </Button>
      )}
    </div>
  );
};
