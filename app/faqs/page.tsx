"use client";
import Image from "next/image";
import Link from "next/link";
import HomepageLayout from "@/components/layouts/Homepage/HomepageLayout";
import CloserMarketsMobile from "@/public/images/closer-markets-mobile.svg";
import CloserMarkets from "@/public/images/closer-markets.svg";
import { PageLinks } from "@/constants/links";
import FaqContent from "@/app/faqs/FaqContent";
const Faqs = () => {
  return (
    <HomepageLayout>
      <div className="py-12 text-center flex flex-col space-y-12 -mt-2 bg-white">
        <div className="flex flex-col gap-y-1 px-4">
          <h1 className="text-xl md:text-2xl text-kaiglo_brand-base font-bold ">
            FAQ
          </h1>
          <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
            Everything you need to know.
          </h2>
          <p className="text-xl text-kaiglo_grey-base">
            Our friendly team is always here to chat.
          </p>
        </div>
        <div className="max-w-[1000px] w-full m-auto">
          <FaqContent />
        </div>

        <section className="flex flex-col gap-y-4 p-6 max-w-[1000px] w-full m-auto bg-kaiglo_grey-50 rounded-3xl">
          <div className="text-center">
            <h2 className="font-bold text-2xl mb-2">Still have questions?</h2>
            <p className="text-kaiglo_grey-placeholder">
              Can't find the answer you're looking for?
            </p>
            <p className="text-kaiglo_grey-placeholder mb-4">
              Please chat our friendly team.
            </p>
          </div>

          <Link
            href={"/contact"}
            className="rounded-full bg-kaiglo_brand-base px-8 py-4 text-white font-medium self-center "
          >
            Get in touch
          </Link>
        </section>

        <figure className="relative w-full max-w-[1200px] m-auto rounded-md overflow-hidden">
          <Image
            src={CloserMarketsMobile}
            alt="No 1 E-commerce platform banner"
            sizes="100%"
            className="object-cover md:hidden md:w-full md:h-[350px] p-4"
          />
          <Image
            src={CloserMarkets}
            alt="No 1 E-commerce platform banner"
            sizes="100%"
            className="object-cover hidden md:block m-auto"
          />
          <div className="hidden lg:flex absolute bottom-10 h-16 border-red right-0 left-0 items-center justify-center space-x-4">
            <Link href={PageLinks.playstore} className="w-40 h-14"></Link>
            <Link href={PageLinks.appstore} className="w-40 h-14"></Link>
          </div>

          <div className="lg:hidden flex absolute bottom-8 h-16 border-red right-0 left-0 items-center justify-center space-x-4">
            <Link href={PageLinks.playstore} className="w-32 h-14"></Link>
            <Link href={PageLinks.appstore} className="w-32 h-14"></Link>
          </div>
        </figure>
      </div>
    </HomepageLayout>
  );
};

export default Faqs;
