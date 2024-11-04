"use client";

import { FilterOptionResponse } from "@/interfaces/responses/filter.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useGetSubCategoryFilterOptions = (
  category: string,
  subcategory: string,
) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["sub-category-filter-options", category, subcategory],
      () =>
        getRequestParams<
          { category: string; subcategory: string },
          FilterOptionResponse
        >({
          url: "/category/filter-option/subcategory",
          params: { category, subcategory },
        }),
      {
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    filterOptions: data,
    fetchingFilterOptions: isFetching,
    refetchFilterOptions: refetch,
    filterOptionsSuccess: isSuccess,
    filterOptionsPaused: isPaused,
    filterOptionsError: isError,
    removeFilterOptions: remove,
  };
};

export const useGetSecondSubCategoryFilterOptions = (
  category: string,
  subcategory: string,
  secondsubcategory: string,
) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      [
        "second-sub-category-filter-options",
        category,
        subcategory,
        secondsubcategory,
      ],
      () =>
        getRequestParams<
          { category: string; subcategory: string; secondsubcategory: string },
          FilterOptionResponse
        >({
          url: "/category/filter-option/secondsubcategory",
          params: { category, subcategory, secondsubcategory },
        }),
      {
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    filterOptions: data,
    fetchingFilterOptions: isFetching,
    refetchFilterOptions: refetch,
    filterOptionsSuccess: isSuccess,
    filterOptionsPaused: isPaused,
    filterOptionsError: isError,
    removeFilterOptions: remove,
  };
};
