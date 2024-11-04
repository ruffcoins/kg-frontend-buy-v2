"use client";

import Image from "next/image";
import { useProductCategoryDetail } from "@/hooks/queries/products/productCategoryDetail";
import { capitalizeFirstLetterOfEachWord } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import useGetAllCategories from "@/hooks/queries/category/getAllCategories";
import {
  Category,
  CategoryView,
} from "@/interfaces/responses/allCategory.interface";
import Placeholder from "@/public/images/product-image-placeholder.png";

const getSubCategoryImages = (
  categoryName: string,
  allCategories: CategoryView[],
) => {
  const category = allCategories?.filter(
    (category) => category.name === decodeURIComponent(categoryName),
  );

  const subCategories = category?.map((subCategory) => subCategory.category);
  const subCategoriesImages = subCategories?.map((item) =>
    item.filter((item) => item.category.length > 0),
  );
  return subCategoriesImages?.[0] || [];
};

const SelectedForYou = ({ categoryName }: { categoryName: string }) => {
  const [images, setImages] = useState<Category[]>([]);
  const { allCategories } = useGetAllCategories();

  const { productCategoryDetail } = useProductCategoryDetail(categoryName);

  useEffect(() => {
    const subCategories = getSubCategoryImages(
      categoryName,
      allCategories as CategoryView[],
    );

    setImages(subCategories);
  }, [allCategories, categoryName]);

  return (
    <div className="space-y-5">
      <h1 className="font-medium lg:text-[32px] text-lg">Selected for you</h1>

      <div className="lg:grid lg:grid-cols-3 flex overflow-x-auto lg:space-x-5 w-full scrollbar-hide">
        {productCategoryDetail?.productCategory.category
          .filter((item) => item.category.length > 0)
          .slice(0, 3)
          .map((category, index) => (
            <div
              className="lg:col-span-1 flex-shrink-0 grid grid-cols-2 rounded-xl bg-white overflow-hidden min-w-[250px] lg:min-w-0 mb-4 lg:mb-0 mr-4 lg:mr-0"
              key={index}
            >
              <div className="col-span-1 flex justify-center items-center p-4">
                <Image
                  src={images[index]?.productUrl || Placeholder}
                  alt={images[index]?.name || "category"}
                  className="lg:p-4 lg:w-40 lg:h-40 w-32 h-32 rounded-full"
                  width={128}
                  height={128}
                />
              </div>

              <div className="w-full p-4 space-y-2">
                <Link
                  href={`/category/${categoryName}/${category?.name}`}
                  className="font-medium normal-case lg:text-base text-sm"
                >
                  {capitalizeFirstLetterOfEachWord(category?.name)}
                </Link>
                <div className="flex flex-col space-y-2">
                  {category?.category.slice(0, 4).map((item, index) => (
                    <Link
                      href={`/category/${categoryName}/${category?.name}/${item.name}`}
                      key={index}
                      className="text-kaiglo_grey-placeholder lg:text-base text-sm"
                    >
                      {capitalizeFirstLetterOfEachWord(item.name)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SelectedForYou;
