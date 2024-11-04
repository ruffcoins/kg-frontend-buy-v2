"use client";

import Loader from "@/components/shared/Loader";
import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import dynamic from "next/dynamic";
import { useGetSubCategoryFilterOptions } from "@/hooks/queries/products/filterOptions";
import useGetAvailableSecondSubCategories from "@/hooks/queries/category/getAvailableSecondSubCategories";

const SubCategoryProductsPage = dynamic(
  () => import("@/components/category/SubCategoriesProductsPage"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen">
        <Loader />
      </div>
    ),
  },
);

export default async function Page({
  params,
}: {
  params: { categoryName: string; subCategoryName: string };
}) {
  const { categoryName, subCategoryName } = params;
  const { filterOptions } = useGetSubCategoryFilterOptions(
    decodeURIComponent(categoryName),
    decodeURIComponent(subCategoryName),
  );

  const { allCategories, fetchingAllCategories } =
    useGetAvailableSecondSubCategories(
      decodeURIComponent(categoryName),
      decodeURIComponent(subCategoryName),
    );

  if (filterOptions && !fetchingAllCategories && allCategories) {
    filterOptions.secondSubCategory = allCategories;
  }

  return (
    <InnerPageLayout>
      <div className="lg:my-10 my-24 space-y-5 min-h-[calc(100vh-8rem)]">
        <SubCategoryProductsPage
          Category={decodeURIComponent(categoryName)}
          SubCategory={decodeURIComponent(subCategoryName)}
          SecondSubCategory=""
          filterOptions={filterOptions}
        />
      </div>
    </InnerPageLayout>
  );
}
