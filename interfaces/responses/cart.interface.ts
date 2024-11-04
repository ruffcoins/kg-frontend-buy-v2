import { CartItem } from "./user.interface";

export interface UpdateCartItemResponse {
  response: CartItem;
  message: string;
}

export interface ShippingCost {
  name: string;
  price: string;
  paidOnDelivery: boolean;
}

export interface GetShippingCostResponse {
  response: ShippingCost;
  message: string;
}

export interface ApplyCouponDTO {
  coupon: string;
  price: number;
  productCoupons: ProductCoupon[];
  storeId: string;
}

interface ProductCoupon {
  price: number;
  productId: string;
}

export interface ApplyCouponResponse {
  response: ApplyCoupon | string;
  message: string;
}

export interface ApplyCoupon {
  price: number;
  newPrice: number;
}
