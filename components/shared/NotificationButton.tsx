"use client";

import Image from "next/image";
import NotificationBell from "@/public/images/notification-bell.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AuthDialog } from "../auth/dialogs/AuthDialog";
import EnterOtp from "../auth/dialogs/EnterOtp";
import useAuth from "@/hooks/useAuth";

interface NotificationButtonProps {
    notificationCount?: number;
    classNames?: string;
    notificationCountClassNames?: string;
}

const NotificationButton = ({
    notificationCount = 0,
    classNames,
    notificationCountClassNames,
}: NotificationButtonProps) => {
    const { isLoggedIn } = useAuth();
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isLoggedIn) {
            e.preventDefault();
            setOpenAuthModal(true);
        }
    };

    return (
        <>
            <Link
                href="/app/notifications"
                onClick={handleClick}
                className={cn(
                    "relative flex justify-center items-center lg:rounded-full cursor-pointer lg:bg-kaiglo_grey-100",
                    classNames
                )}
            >
                <Image
                    src={NotificationBell}
                    alt="notification bell icon"
                    className="w-6 h-6"
                    width={24}
                    height={24}
                />
                <span
                    className={cn(
                        "flex justify-center items-center absolute font-medium rounded-full bg-kaiglo_critical-500 w-5 h-5 text-[10px] text-white",
                        notificationCountClassNames
                    )}
                >
                    {notificationCount}
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
                <EnterOtp open={showOtpModal} setOpen={setShowOtpModal} email={email} phone={phone} />
            )}
        </>
    );
};

export default NotificationButton;
