import { IProduct, ProductFilters } from "@/interfaces/product.interface";
import { IPaginatedProductResponse } from "@/interfaces/responses/product.interface";
import { postRequest } from "@/utils/apiCaller";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBelow10KProducts = (filters: ProductFilters) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
        refetch,
        remove,
        isRefetching,
        isFetching,
    } = useInfiniteQuery<IPaginatedProductResponse, Error>(
        ["below10K-products", filters],
        ({ pageParam = 0 }) =>
            postRequest({
                url: `product/filter/${pageParam}`,
                payload: filters,
            }),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.last) return undefined; // No more pages
                return lastPage.number + 1; // Next page number
            },
            // enabled: !!size,
            // staleTime: 1000 * 60 * 30,
            staleTime: 1000 * 60 * 30,
            cacheTime: 1000 * 60 * 30,
        }
    );

    const below10KProducts: IProduct[] = data?.pages.flatMap((page) => page.content) ?? [];
    console.log(below10KProducts);

    return {
        below10KProducts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isRefetching,
        status,
        error,
        refetchbelow10KProducts: refetch,
        removebelow10KProducts: remove,
        totalProducts: data?.pages[data.pages.length - 1]?.totalElements,
        currentPage: data?.pages[data.pages.length - 1]?.number as number,
        totalPages: data?.pages[data.pages.length - 1]?.totalPages,
    };
};
