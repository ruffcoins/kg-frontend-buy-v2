import { IProduct } from "@/interfaces/product.interface";
import { IRecommendedProductResponse } from "@/interfaces/responses/product.interface";
import { getRequest } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useRecommendedProducts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
  } = useInfiniteQuery<IRecommendedProductResponse, Error>(
    ["recommended-products"],
    ({ pageParam = 0 }) =>
      getRequest<IRecommendedProductResponse>({
        url: `product/home-recommendation/${pageParam}`,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // No more pages
        return lastPage.number + 1; // Next page number
      },
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const recommendedProducts: IProduct[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return {
    recommendedProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetchRecommendedProducts: refetch,
    removeRecommendedProducts: remove,
    totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
    currentPage: data?.pages[data.pages.length - 1]?.number as number,
    totalPages: data?.pages[data.pages.length - 1]?.totalPages,
  };
};
