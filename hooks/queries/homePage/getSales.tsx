import { getRequest } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { SalesTemplate } from "@/interfaces/responses/saleTemplate.interface";

export const useGetSales = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["sales"],
      () =>
        getRequest<SalesTemplate>({
          url: `/home-page/home-content-sale-template`,
        }),
      {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    sales: data?.response,
    fetchingSales: isFetching,
    refetchSales: refetch,
    salesSuccess: isSuccess,
    salesPaused: isPaused,
    salesError: isError,
    removeSales: remove,
  };
};

export default useGetSales;
