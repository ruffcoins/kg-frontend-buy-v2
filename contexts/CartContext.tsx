"use client";

import React, {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearCartCookies,
  getCartFromCookies,
  ICacheCart,
  removeItemFromCartByIndex,
  saveCartToCookies,
} from "@/lib/cookieUtils";
import { calculateSubTotal } from "@/lib/cartUtils";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import { convertCartItemToICacheCart } from "@/lib/utils";
import useRemoveItemFromCart from "@/hooks/mutation/cart/removeItemFromCart";
import useUpdateItemQuantity from "@/hooks/mutation/cart/updateItemQuantity";
import { useQueryClient } from "@tanstack/react-query";
import useAddItemToCart from "@/hooks/mutation/cart/addItemToCart";
import useAddMultipleItemsToCart from "@/hooks/mutation/cart/addMultipleItemsToCart";
import { sendGTMEvent } from "@next/third-parties/google";
interface CartContextType {
  cart: ICacheCart[];
  setCart: Dispatch<React.SetStateAction<ICacheCart[]>>;
  incrementItemQuantity: (index: number) => void;
  decrementItemQuantity: (index: number) => void;
  checkedItems: Record<string, boolean>;
  toggleItemCheck: (productId: string, index: number, checked: boolean) => void;
  subTotal: number;
  removeItem: (index: number) => void;
  removeCheckedItems: () => Promise<void>;
  handleMergeCarts: () => void;
  getCheckedItems: () => ICacheCart[];
  checkoutItems: ICacheCart[];
  setCheckoutItems: (items: ICacheCart[]) => void;
  getCheckoutTotal: () => number;
  mergingCarts: boolean;
  setMergingCarts: Dispatch<React.SetStateAction<boolean>>;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const [cart, setCart] = useState<ICacheCart[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [checkoutItems, setCheckoutItems] = useState<ICacheCart[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [mergingCarts, setMergingCarts] = useState(false);
  const { user } = useFetchUserProfile();
  const { removeItemFromCart, removeItemFromCartAsync } =
    useRemoveItemFromCart();
  const { updateItemQuantity } = useUpdateItemQuantity();
  const { addItemToCartAsync } = useAddItemToCart();
  const { addMultipleItemsToCartAsync } = useAddMultipleItemsToCart();

  useEffect(() => {
    let cartToUse: ICacheCart[] = [];

    if (user && Array.isArray(user.cart)) {
      cartToUse = user.cart.map((item) =>
        convertCartItemToICacheCart(item, user.id),
      );
    } else {
      cartToUse = getCartFromCookies();
    }

    setCart(cartToUse);

    // Initialize all items as checked
    const initialCheckedItems: Record<string, boolean> = {};
    cartToUse.forEach((item, index) => {
      initialCheckedItems[`${item.productId}-${index}`] = true;
    });
    setCheckedItems(initialCheckedItems);
  }, [user]);

  // Update the cart state every second to reflect any changes made to the cart
  useEffect(() => {
    const showCart = setInterval(() => {
      let cartToUse: ICacheCart[];

      if (user && user.cart) {
        cartToUse = user.cart.map((item) =>
          convertCartItemToICacheCart(item, user.id),
        );
      } else {
        cartToUse = getCartFromCookies();
      }

      setCart(cartToUse);
    }, 1000);
    return () => clearInterval(showCart);
  }, [cart]);

  // Ensure that new items are also checked by default
  useEffect(() => {
    // Merge new items into the checkedItems state without overwriting existing states
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };
      cart.forEach((item, index) => {
        const key = `${item.productId}-${index}`;
        if (!(key in updatedCheckedItems)) {
          updatedCheckedItems[key] = true;
        }
      });
      return updatedCheckedItems;
    });
  }, [cart]);

  useEffect(() => {
    const total = calculateSubTotal(cart, checkedItems);
    setSubTotal(total);
  }, [cart, checkedItems]);

  const incrementItemQuantity = (index: number) => {
    if (cart[index]) {
      const newQuantity = parseInt(cart[index].quantity) + 1;
      const maxQuantity = parseInt(cart[index].maxQuantity);

      if (newQuantity <= maxQuantity) {
        const updatedCart = [...cart];
        updatedCart[index].quantity = newQuantity.toString();

        if (user) {
          updateItemQuantity({
            cartId: cart[index].id as string,
            quantity: newQuantity,
          });
        } else {
          saveCartToCookies(updatedCart);
        }

        setCart(updatedCart);
      }
    }
  };

  const decrementItemQuantity = (index: number) => {
    const newQuantity = parseInt(cart[index].quantity) - 1;

    if (newQuantity > 0) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity.toString();

      if (user) {
        updateItemQuantity({
          cartId: cart[index].id as string,
          quantity: newQuantity,
        });
      } else {
        saveCartToCookies(updatedCart);
      }

      setCart(updatedCart);
    }
  };

  // This is used on the side sheet to remove an item from the cart
  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);

    if (user) {
      removeItemFromCart(cart[index].id as string);
    } else {
      removeItemFromCartByIndex(index);
    }
    setCart(updatedCart);
  };

  const toggleItemCheck = (productId: string, index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [`${productId}-${index}`]: !prev[`${productId}-${index}`] || false,
    }));
  };

  const removeCheckedItems = async () => {
    const checkedItemsToRemove = cart.filter(
      (item, index) => checkedItems[`${item.productId}-${index}`],
    );

    if (user) {
      try {
        for (const item of checkedItemsToRemove) {
          await removeItemFromCartAsync(item.id as string);
        }

        // After all items are removed, refetch the cart
        await queryClient.refetchQueries(["user"]);

        // Reset checked items
        const newCheckedItems: Record<string, boolean> = {};
        setCheckedItems(newCheckedItems);
      } catch (error) {
        console.error("Error removing items from cart:", error);
        // Handle the error appropriately
      }
    } else {
      const newCart = cart.filter(
        (item, index) => !checkedItems[`${item.productId}-${index}`],
      );
      saveCartToCookies(newCart);
      setCart(newCart);

      // Reset checked items
      const newCheckedItems: Record<string, boolean> = {};
      setCheckedItems(newCheckedItems);
    }

    let totalValue = 0;

    checkedItemsToRemove.forEach((item) => {
      totalValue += item.price * parseInt(item.quantity);
    });

    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_KAIGLO_ENV === "prod"
    ) {
      sendGTMEvent({ ecommerce: null });

      sendGTMEvent({
        event: "remove_from_cart",
        ecommerce: {
          currency: "NGN",
          value: totalValue,
          items: checkedItemsToRemove.map((item, index) => ({
            item_id: item.productId,
            item_name: item.productName,
            index,
            price: item.price,
            quantity: item.quantity,
            affiliation: item.storeName || "",
            item_category: item.category || "",
            item_category2: item.subCategory || "",
            item_category3: item.secondSubCategory || "",
            item_variant: item.variant || "",
          })),
        },
        kaigloEnv: process.env.NEXT_PUBLIC_KAIGLO_ENV,
      });
    }
  };

  const handleMergeCarts = useCallback(async () => {
    const tempCart = getCartFromCookies();

    if (user && tempCart.length > 0) {
      try {
        const cartItems: ICacheCart[] = tempCart.map((item) => {
          return {
            color: item.color,
            platform: "WEB",
            price: item.price,
            productId: item.productId,
            productUrl: item.productUrl,
            quantity: item.quantity.toString(),
            ramSize: item.ramSize,
            size: item.size,
            storage: item.storage,
            userId: user.id,
            productName: item.productName,
            maxQuantity: item.maxQuantity.toString(),
            storeId: item.storeId,
          };
        });

        await addMultipleItemsToCartAsync(cartItems);

        clearCartCookies();

        await queryClient.refetchQueries(["user"]);
      } catch (error) {
        console.error("Error synching carts:", error);
      }
    }
  }, [user]);

  const getCheckedItems = useCallback(() => {
    return cart.filter(
      (item, index) => checkedItems[`${item.productId}-${index}`],
    );
  }, [cart, checkedItems]);

  const getCheckoutTotal = useCallback(() => {
    return checkoutItems.reduce((total, item) => {
      return (
        total + parseInt(item.quantity) * parseFloat(item.price.toString())
      );
    }, 0);
  }, [checkoutItems]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        incrementItemQuantity,
        decrementItemQuantity,
        checkedItems,
        toggleItemCheck,
        subTotal,
        removeItem,
        removeCheckedItems,
        handleMergeCarts,
        getCheckedItems,
        checkoutItems,
        setCheckoutItems,
        getCheckoutTotal,
        mergingCarts,
        setMergingCarts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCartContext };
