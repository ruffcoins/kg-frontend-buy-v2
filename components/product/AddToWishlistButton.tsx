"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import EmptyHeart from "@/public/images/empty-heart.svg";
import FilledHeart from "@/public/images/filled-heart.svg";
import { cn } from "@/lib/utils";
import useAddToWishlist from "@/hooks/mutation/wishlist/addToWishlist";
import useRemoveFromWishlist from "@/hooks/mutation/wishlist/removeFromWishlist";
import useAuth from "@/hooks/useAuth";
import { AuthDialog } from "../auth/dialogs/AuthDialog";
import EnterOtp from "../auth/dialogs/EnterOtp";

const AddToWishlistButton = ({
    classNames,
    isOnMyWishList,
    id,
    name,
    price,
    imageUrl,
}: {
    classNames?: string;
    isOnMyWishList: boolean;
    setIsOnMyWishList: Dispatch<SetStateAction<boolean>>;
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}) => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { isLoggedIn } = useAuth();
    const { addProductToWishlist } = useAddToWishlist();
    const { removeItemFromWishlist } = useRemoveFromWishlist();

    const handleAddToWishlist = () => {
        if (!isLoggedIn) {
            setOpenAuthModal(true);
        } else {
            if (isOnMyWishList) {
                removeItemFromWishlist(id);
            } else {
                addProductToWishlist({
                    productId: id,
                    name,
                    price: price,
                    productImage: imageUrl,
                });
            }
        }
    };

    return (
        <>
            <div
                className={cn(
                    "w-10 h-10 flex justify-center items-center rounded-full bg-white/80 border-[0.5px] border-white cursor-pointer",
                    classNames
                )}
                onClick={handleAddToWishlist}
            >
                <Image
                    src={isOnMyWishList ? FilledHeart : EmptyHeart}
                    alt="empty heart image"
                    className="relative w-6 h-6 left-50"
                    width={24}
                    height={24}
                />
            </div>

            {openAuthModal && (
                <AuthDialog
                    openAuthModal={openAuthModal}
                    setOpenAuthModal={setOpenAuthModal}
                    setShowOtpModal={setShowOtpModal}
                    setEmail={setEmail}
                    setPhone={setPhone}
                />
            )}
            {showOtpModal && (
                <EnterOtp open={showOtpModal} setOpen={setShowOtpModal} email={email} phone={phone} />
            )}
        </>
    );
};

export default AddToWishlistButton;
