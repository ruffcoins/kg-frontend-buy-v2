import {
  ApplyCouponDTO,
  ApplyCouponResponse,
} from "@/interfaces/responses/cart.interface";
import { postRequest } from "@/utils/apiCaller";
import { useMutation } from "@tanstack/react-query";

const useApplyCoupon = () => {
  const applyCouponMutation = (
    payload: ApplyCouponDTO,
  ): Promise<ApplyCouponResponse> => {
    return postRequest({
      url: `/coupons/apply`,
      payload,
    });
  };

  const { mutate, mutateAsync, isLoading, ...rest } = useMutation({
    mutationFn: applyCouponMutation,
  });

  return {
    applyCoupon: mutate,
    applyCouponAsync: mutateAsync,
    applyingCoupon: isLoading,
    ...rest,
  };
};

export default useApplyCoupon;
