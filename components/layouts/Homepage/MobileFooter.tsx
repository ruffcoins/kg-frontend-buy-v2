"use client";

import { PageLinks } from "@/constants/links";
import { mobileFooter } from "@/constants/menu";
import Link from "next/link";
import BottomNav, { BottomNavProps } from "@/components/shared/BottomNav";
import { CaretUpIcon } from "@radix-ui/react-icons";

const MobileFooter = ({ allowCTA, productId }: BottomNavProps) => {
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  const footerItems = mobileFooter.map((item, index) => (
    <li
      key={index}
      className="text-sm lg:font-medium text-kaiglo_grey-base list-none text-center"
    >
      <Link href={item.link} className="text-xs">
        {item.title}
      </Link>
    </li>
  ));

  return (
    <>
      <footer className="block md:hidden lg:mb-0 mb-[4.5rem]">
        <div
          className="flex justify-center flex-col items-center space-y-2 p-2 bg-kaiglo_grey-50 cursor-pointer"
          onClick={scrollToTop}
        >
          <CaretUpIcon className="w-5 h-5" />
          <p className="font-medium text-sm">Back to Top</p>
        </div>
        <div className="grid grid-cols-3 text-[10px] gap-3 bg-white py-8 px-3">
          {footerItems}
        </div>
        <div className="flex items-center justify-center px-5 py-3 text-xs bg-kaiglo_grey-50 lg:font-medium lg:text-sm md:h-16">
          <p className="font-normal text-center text-kaiglo_grey-base lg:font-medium">
            Copyright © {new Date().getFullYear()} KAIGLO STORES LIMITED. All
            Rights Reserved. User Agreement
            <span className="font-medium text-kaiglo_info-base">
              <Link href={PageLinks.privacyPolicy}>, Privacy and Cookies</Link>
            </span>
          </p>
        </div>
      </footer>

      <BottomNav allowCTA={allowCTA} productId={productId} />
    </>
  );
};

export default MobileFooter;
