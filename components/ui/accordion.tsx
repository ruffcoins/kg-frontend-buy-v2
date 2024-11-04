import { FAQItem } from "@/interfaces/faq.interface";
import Image from "next/image";
import { useRef } from "react";

export const Accordion: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
      {children}
    </div>
  );
};

export const AccordionItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-kaiglo_grey-disabled w-full">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none"
        onClick={onToggle}
      >
        <span>{item.question}</span>
        {isOpen ? (
          <Image
            src={"/images/arrow-up.svg"}
            alt="arrow up"
            width={20}
            height={20}
          />
        ) : (
          <Image
            src={"/images/arrow-down.svg"}
            alt="arrow down"
            width={20}
            height={20}
          />
        )}
      </button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-max-height duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
        }}
      >
        <div className="px-6 pb-4">
          <p className="text-kaiglo_grey-base text-left">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};
