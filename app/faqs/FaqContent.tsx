"use client";

import { useState } from "react";
import { FAQItem } from "@/interfaces/faq.interface";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

const FaqContent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleItemToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs: FAQItem[] = [
    {
      question: "What is the estimated time of delivery?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      question: "What is the estimated time of delivery?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      question: "What is the estimated time of delivery?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      question: "What is the estimated time of delivery?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      question: "What is the estimated time of delivery?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      question: "What is the estimated time of delivery?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      question: "What is the estimated time of delivery?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
  ];
  return (
    <div className="grid md:px-8 gap-y-6">
      <Accordion>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            item={faq}
            isOpen={openIndex === index}
            onToggle={() => handleItemToggle(index)}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default FaqContent;
