import Image from "next/image";
import CloserMarkets from "@/public/images/closer-markets.svg";
import HomepageLayout from "@/components/layouts/Homepage/HomepageLayout";
import Link from "next/link";
import { PageLinks } from "@/constants/links";
const About = () => {
  return (
    <HomepageLayout>
      <article className="p-4 lg:p-8 bg-white space-y-16 -mt-2 pb-4">
        <div className="space-y-4 md:max-w-[700px] lg:max-w-[800px] m-auto text-center">
          <h1 className="mt-8 text-2xl lg:text-6xl font-black">About us</h1>
          <p className="text-kaiglo_grey-base text-base lg:text-lg font-medium">
            At Kaiglo, our goal is to create channels for online users to
            acquire and provide goods that are not only affordable but also
            available in multiple variations and of the highest quality. We aim
            to ensure that these goods reach different locations with prompt
            delivery, making online shopping a seamless experience for everyone.
            By offering a wide range of products, excellent service, and
            convenient delivery options, we aim to set new standards in the
            world of online shopping in Nigeria and Africa.
          </p>
        </div>
        {/* Our Mission starts here */}
        <section className="space-y-6 md:grid grid-cols-2 md:gap-10 max-w-[1200px] m-auto">
          <Image
            src={"/images/about/image_1_mobile.png"}
            alt="person reading on laptop"
            width={400}
            height={400}
            className="rounded-xl md:hidden w-full"
            objectFit="contain"
          />
          <Image
            src={"/images/about/image_1_desktop.png"}
            alt="person reading on laptop"
            width={700}
            height={700}
            className="rounded-xl hidden md:block"
            objectFit="cover"
          />
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm md:text-lg font-medium text-kaiglo_grey-placeholder uppercase">
                Our Mission
              </h2>
              <h3 className="font-medium text-xl md:text-3xl">
                To become the premier e-commerce platform for online shoppers in
                Nigeria and throughout Africa.
              </h3>
              <p className="text-kaiglo_grey-base md:text-lg">
                Kaiglo is a product of extensive international researches,
                inter-continental adventure, and the will to pioneer a better
                approach to e-commerce in Nigeria. We discovered a problem, and
                we are out to solve it. There's an absence of “shared value” in
                the tech sector in Africa. We are here to bring in that “shared
                value” into the tech biosphere.
              </p>
            </div>
            {/* Our Mission Ends Here */}
            {/* What we want to Achieve starts here */}

            <div className="space-y-4">
              <h4 className="font-medium text-kaiglo_grey-base md:text-xl uppercase">
                What We want to achieve
              </h4>
              <p className="text-kaiglo_grey-base md:text-lg">
                To create channels for online users to acquire and provide goods
                that are affordable, available in multiple variations, and of
                high quality, to different locations with prompt delivery.
              </p>
            </div>
          </div>
          {/* What we want to Achieve ends here */}
        </section>
        {/* Stats starts here*/}
        <div className="rounded-2xl bg-kaiglo_grey-50 py-12 md:py-16 md:px-16 md:mt-20 flex flex-col md:flex-row items-center md:justify-between text-center gap-y-10 max-w-[1200px] m-auto">
          <section className="space-y-2">
            <h2 className="text-kaiglo_brand-base font-bold text-3xl">
              50,000+
            </h2>
            <p className="text-kaiglo_grey-placeholder text-sm font-medium">
              Online audience
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-kaiglo_brand-base font-bold text-3xl">500+</h2>
            <p className="text-kaiglo_grey-placeholder text-sm font-medium">
              Vendors
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-kaiglo_brand-base font-bold text-3xl">80%</h2>
            <p className="text-kaiglo_grey-placeholder text-sm font-medium">
              Purchase Rate
            </p>
          </section>
        </div>
        {/* Stats ends here*/}
        <div className="space-y-6 md:space-y-0 pt-6 max-w-[1200px] m-auto md:grid md:grid-cols-3 md:items-start">
          <section className="space-y-4 border md:border-none border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
            <div className="w-12 h-12 border border-kaiglo_grey-disabled rounded-lg"></div>
            <h2 className="font-bold text-base uppercase">What we offer</h2>
            <p className="text-kaiglo_grey-base">
              Quality products at the best affordable prices Multiple varieties
              of each products Fast and convenient delivery.
            </p>
          </section>
          <section className="space-y-4 border md:border-none border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
            <div className="w-12 h-12 border border-kaiglo_grey-disabled rounded-lg"></div>
            <h2 className="font-bold text-base uppercase">Our Brand Promise</h2>
            <p className="text-kaiglo_grey-base">
              We promise to always provide our users with exceptional deals at
              manufacturer's prices. Creating multiple channels where
              manufacturers can have access to millions of Africans.
            </p>
          </section>
          <section className="space-y-4 border md:border-none border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
            <div className="w-12 h-12 border border-kaiglo_grey-disabled rounded-lg"></div>
            <h2 className="font-bold text-base uppercase">
              Flexible Return Policy
            </h2>
            <p className="text-kaiglo_grey-base">
              Continuous and never ending technological research and development
              for exploring the ecommerce marketplace in Nigeria, and Africa.
            </p>
          </section>
        </div>
        <figure className="relative hidden md:block w-full max-w-[1200px] m-auto rounded-md overflow-hidden">
          <Image
            src={CloserMarkets}
            alt="No 1 E-commerce platform banner"
            sizes="100%"
            className="object-cover"
          />

          <div className="absolute bottom-10 h-16 right-0 left-0 flex items-center justify-center space-x-4">
            <Link href={PageLinks.playstore} className="w-40 h-14"></Link>
            <Link href={PageLinks.appstore} className="w-40 h-14"></Link>
          </div>
        </figure>
      </article>
    </HomepageLayout>
  );
};

export default About;
