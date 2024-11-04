import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useGetAvailableSecondSubCategories = (
  category: string,
  subCategory: string,
) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["available-second-sub-categories", category, subCategory],
      () =>
        getRequestParams<{ category: string; subCategory: string }, string[]>({
          url: "/product-category/second-sub/available",
          params: { category, subCategory },
        }),
      {
        enabled: !!category && !!subCategory,
      },
    );

  return {
    allCategories: data,
    fetchingAllCategories: isFetching,
    refetchAllCategories: refetch,
    allCategoriesSuccess: isSuccess,
    allCategoriesPaused: isPaused,
    allCategoriesError: isError,
    removeAllCategories: remove,
  };
};

export default useGetAvailableSecondSubCategories;
