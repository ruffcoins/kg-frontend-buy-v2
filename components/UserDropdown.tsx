import React, { useState } from "react";
import Dropdown from "@/components/shared/Dropdown";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import Avatar from "boring-avatars";
import Image from "next/image";
import LogoutDialog from "@/components/auth/dialogs/LogoutDialog";
import LogoutIcon from "@/public/images/logout.svg";

const UserDropdown: React.FC = () => {
  const { user } = useFetchUserProfile();
  const [open, setOpen] = useState<boolean>(false);

  const handleLogout = () => {
    setOpen(true);
  };

  const userDropdownItems = [
    {
      label: "Dashboard",
      path: "/app/dashboard",
      onClick: () => console.log("Dashboard clicked"),
    },
    {
      label: "My Orders",
      path: "/app/orders",
      onClick: () => console.log("My Orders clicked"),
    },
    {
      label: "Shipping Address",
      path: "/app/addresses",
      onClick: () => console.log("Shipping Address clicked"),
    },
    {
      label: "Account Settings",
      path: "/app/settings",
      onClick: () => console.log("Account Settings clicked"),
    },
    {
      label: "Wishlist",
      path: "/app/wishlist",
      onClick: () => console.log("Wishlist clicked"),
    },
    { label: "Logout", onClick: handleLogout, icon: LogoutIcon },
  ];

  // if (fetchingUser) {
  //   return <div>Loading...</div>;
  // }

  const triggerElement = (
    <div className="flex items-center p-1 space-x-2 cursor-pointer">
      {user?.pictureUrl ? (
        <Image
          src={user?.pictureUrl}
          alt="avatar icon"
          width={48}
          height={48}
          className="w-12 h-12 border-2 rounded-full"
        />
      ) : (
        <div className="-mt-1 flex items-center justify-center w-12 h-12 border border-kaiglo_success-200 rounded-full bg-kaiglo_success-50">
          <p className="font-medium text-kaiglo_grey-700">
            {user?.firstName?.[0] || ""}
            {user?.lastName?.[0] || ""}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Dropdown trigger={triggerElement} items={userDropdownItems} />
      <LogoutDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default UserDropdown;
