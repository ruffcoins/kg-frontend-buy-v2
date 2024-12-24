import { postRequest } from "@/utils/apiCaller";
import { useMutation } from "@tanstack/react-query";
import { KlumpTransactionDTO } from "@/interfaces/dtos/klump.dto.interface";

const useCreateKlumpTransaction = () => {
  const createKlumpTransactionMutation = (payload: KlumpTransactionDTO) => {
    return postRequest({
      url: `/klump/create`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: createKlumpTransactionMutation,
  });

  return {
    createKlumpTransaction: mutate,
    createKlumpTransactionAsync: mutateAsync,
    creatingKlumpTransaction: isLoading,
    ...rest,
  };
};

export default useCreateKlumpTransaction;
