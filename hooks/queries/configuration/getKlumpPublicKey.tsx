import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";
import { KlumpPublicKeyResponse } from "@/interfaces/responses/klump.interface";

export const useKlumpPublicKey = (settingName: string) => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["klump-public-key"],
      () =>
        getRequestParams<{ "setting-name": string }, KlumpPublicKeyResponse>({
          url: "configurations",
          params: { "setting-name": settingName },
        }),
      { enabled: !!settingName },
    );

  return {
    klumpIsActive: data?.enabled,
    klumpPublicKey: data?.value,
    fetchingKlumpPublicKey: isFetching,
    refetchKlumpPublicKey: refetch,
    klumpPublicKeySuccess: isSuccess,
    klumpPublicKeyPaused: isPaused,
    klumpPublicKeyError: isError,
    removeKlumpPublicKey: remove,
  };
};

export default useKlumpPublicKey;
