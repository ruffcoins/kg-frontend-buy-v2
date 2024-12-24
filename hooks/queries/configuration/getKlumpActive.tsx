import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { IsKlumpActiveResponse } from "@/interfaces/responses/klump.interface";

export const useGetKlumpActive = (settingName: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["is-klump-active"],
      () =>
        getRequestParams<{ "setting-name": string }, IsKlumpActiveResponse>({
          url: "configurations",
          params: { "setting-name": settingName },
        }),
      {
        enabled: !!settingName,
      },
    );

  return {
    klumpIsActive: data?.enabled,
    klumpThresholdAmount: data?.value,
    fetchingKlumpIsActive: isFetching,
    refetchKlumpIsActive: refetch,
    klumpIsActiveSuccess: isSuccess,
    klumpIsActivePaused: isPaused,
    klumpIsActiveError: isError,
    removeKlumpIsActive: remove,
  };
};

export default useGetKlumpActive;
