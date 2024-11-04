"use client";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import Image from "next/image";
import Phone from "@/public/images/phone.svg";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CallToOrderHoverCardProps {
  classNames?: string;
}

const CallToOrderHoverCard = ({ classNames }: CallToOrderHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "items-center justify-center rounded-full cursor-pointer flex lg:bg-kaiglo_grey-100",
            classNames,
          )}
        >
          <Image src={Phone} alt="phone icon" className="" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-40 p-2 bg-white opacity-100 z-50 shadow">
        <div className="flex-col">
          <p className="text-sm font-bold">Call to place order</p>
          <p className="text-sm text-kaiglo_attention-base">
            +234 915 449 1603
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const CallIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      className="relative flex items-center justify-center"
    >
      <div
        className={cn(
          "items-center justify-center rounded-full cursor-pointer flex lg:bg-kaiglo_grey-100",
        )}
      >
        <Image src={Phone} alt="phone icon" className="" />
      </div>
      {isHovered && (
        <div className="absolute z-10 top-10 bg-white border p-2 rounded shadow-lg w-40 left-0 -translate-x-1/3">
          <div className="flex-col">
            <p className="text-sm font-bold">Call to place order</p>
            <p className="text-sm text-kaiglo_attention-base">
              +234 915 449 1603
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export { CallToOrderHoverCard, CallIcon };
