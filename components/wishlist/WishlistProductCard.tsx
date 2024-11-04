import Cart from "@/public/images/cart.svg";
import { cn, createSlug, truncate } from "@/lib/utils";
import Link from "next/link";
import RemoveFromWishlistButton from "../shared/RemoveFromWishlistButton";
import { Card } from "../ui/card";
import Image from "next/image";
import { WishListItem } from "@/interfaces/responses/user.interface";
import useProductDetail from "@/hooks/useProductDetail";
import CartSideSheet from "../cart/CartSideSheet";
import ProductSelectionDialog from "../product/ProductSelectionDialog";
import { useState } from "react";

const WishlistProductCard = ({ product }: { product: WishListItem }) => {
  const {
    data,
    colors,
    toggleProductSelectionDialog,
    openProductSelectionDialog,
    setOpenProductSelectionDialog,
  } = useProductDetail(product.productId);

  const [openSideCart, setOpenSideCart] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <>
      <Card className="min-h-full p-2 lg:p-4 space-y-1.5 flex flex-col justify-between cursor-pointer border">
        <div>
          <div className="relative">
            <Link
              href={`/product/${createSlug(product.name)}/${product.productId}`}
            >
              <Image
                src={product.productImage}
                alt="product image"
                className="w-full h-[154px] lg:h-[220px] rounded-lg"
                width={150}
                height={220}
              />
            </Link>
            <div className="absolute top-2 right-2">
              <RemoveFromWishlistButton id={product.productId} />
            </div>
          </div>

          <div className="mt-1.5 space-y-0.5">
            <p className={cn("hidden lg:block text-sm mt-1 capitalize")}>
              {truncate(product.name.toLowerCase(), 20)}
            </p>
            <p className={cn("lg:hidden block text-sm mt-1 capitalize")}>
              {truncate(product.name.toLowerCase(), 16)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="font-bold">
              ₦{parseFloat(product.price as string).toLocaleString()}
            </p>
          </div>

          <div
            className={cn(
              "w-10 h-10 flex justify-center items-center rounded-lg bg-kaiglo_grey-100",
            )}
          >
            <Image
              src={Cart}
              alt="cart icon"
              onClick={toggleProductSelectionDialog}
            />
          </div>
        </div>
      </Card>

      {openProductSelectionDialog && (
        <ProductSelectionDialog
          colors={colors}
          productUrl={data?.response.productUrl as string}
          productId={data?.response.id as string}
          productName={data?.response.name as string}
          open={openProductSelectionDialog}
          setOpen={setOpenProductSelectionDialog}
          setOpenAuthModal={setOpenAuthModal}
          setOpenSideCart={setOpenSideCart}
        />
      )}

      {openSideCart && (
        <CartSideSheet
          open={openSideCart}
          setOpen={setOpenSideCart}
          setOpenProductSelectionDialog={setOpenProductSelectionDialog}
        />
      )}
    </>
  );
};
export default WishlistProductCard;
