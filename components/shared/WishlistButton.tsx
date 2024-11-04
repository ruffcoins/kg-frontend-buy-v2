"use client";

import Image from "next/image";
import Wishlist from "@/public/images/empty-heart.svg";
import Link from "next/link";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import { useState } from "react";
import { AuthDialog } from "../auth/dialogs/AuthDialog";
import EnterOtp from "../auth/dialogs/EnterOtp";

const WishlistButton = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { user } = useFetchUserProfile();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      setOpenAuthModal(true);
    }
  };

  return (
    <>
      <Link
        href="/app/wishlist"
        onClick={handleClick}
        className="relative w-12 h-12 p-3 rounded-full cursor-pointer bg-kaiglo_grey-100"
      >
        <Image
          src={Wishlist}
          alt="wishlist icon"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <span className="absolute -top-1 -right-1 font-medium rounded-full border border-kaiglo_grey-500 w-5 h-5 flex justify-center items-center text-[10px] bg-white">
          {user?.wishListItems.length || 0}
        </span>
      </Link>

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
        <EnterOtp
          open={showOtpModal}
          setOpen={setShowOtpModal}
          email={email}
          phone={phone}
        />
      )}
    </>
  );
};

export default WishlistButton;
