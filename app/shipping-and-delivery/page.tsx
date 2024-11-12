import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import HomepageLayout from "@/components/layouts/Homepage/HomepageLayout";
import DeliveryMobile from "@/public/images/shipping_and_delivery/delivery-mobile.jpg";
import Delivery from "@/public/images/shipping_and_delivery/delivery-web.jpg";
import SpeedDesktop from "@/public/images/shipping_and_delivery/speed_delivery_desktop.png";
import SpeedMobile from "@/public/images/shipping_and_delivery/speed_delivery_mobile.png";
import OrderTrackingDesktop from "@/public/images/shipping_and_delivery/order_tracking_desktop.png";
import OrderTrackingMobile from "@/public/images/shipping_and_delivery/order_tracking_mobile.png";
import Card from "@/public/images/shipping_and_delivery/card.1 1.svg";
import SafeDelivery from "@/public/images/shipping_and_delivery/safe-delivery-01.svg";
import Money from "@/public/images/shipping_and_delivery/moneys.1 1.png";
import CloserMarketsMobile from "@/public/images/closer-markets-mobile.svg";
import CloserMarkets from "@/public/images/closer-markets.svg";
import { PageLinks } from "@/constants/links";
import FaqContent from "@/app/faqs/FaqContent";

const ShippingAndDelivery = () => {
  return (
    <HomepageLayout>
      <div className="-mt-2 bg-white">
        <div className="flex flex-col gap-5 md:gap-20">
          <div>
            <figure>
              <Image
                src={DeliveryMobile}
                alt="Shipping and delivery banner"
                objectFit="cover"
                className="md:hidden mt-8"
              />
              <Image
                src={Delivery}
                alt="Shipping and delivery banner"
                objectFit="cover"
                className="hidden md:block"
              />
            </figure>
            <h1 className="max-w-[300px] m-auto font-bold md:font-bold text-2xl md:text-3xl lg:text-4xl text-center mt-10 md:mt-20">
              Here's Why you can rely on us
            </h1>
          </div>

          <div className="p-4 grid gap-12 max-w-[1000px] m-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <figure>
                <Image
                  src={SpeedMobile}
                  alt="Speed and reliability image"
                  width={353}
                  height={250}
                  className="md:hidden w-full h-[250px] rounded-xl"
                />
                <Image
                  src={SpeedDesktop}
                  alt="Speed and reliability image"
                  width={500}
                  height={500}
                  className="hidden md:block md:row-span-2 rounded-xl"
                />
              </figure>
              <div className="grid md:items-start md:flex md:flex-col gap-6 md:gap-3">
                <h2 className="bg-kaiglo_success-100 font-medium px-6 md:px-3 py-4 md:py-2 rounded-full justify-self-start">
                  Speed and Reliability
                </h2>
                <h3 className="font-bold text-xl">
                  Power flexible on-demand or scheduled deliveries.
                </h3>
                <p className="text-kaiglo_grey-base">
                  Your trust in Kaiglo.com is highly valued. Thus, we have
                  implemented the best standards for secure transactions and
                  customer information privacy.
                </p>
                <Link
                  href={"/"}
                  className="text-kaiglo_brand-base flex items-center gap-2 font-medium lg:mt-10"
                >
                  Start Shopping
                  <ArrowRightIcon className="text-kaiglo_brand-base w-6 h-6 font-medium" />
                </Link>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* <div className="md:row-span-2 md:col-start-2 w-full h-[250px] bg-kaiglo_grey-disabled rounded-xl"></div> */}
              <figure className="md:col-start-2">
                <Image
                  src={OrderTrackingMobile}
                  alt="Speed and reliability image"
                  width={353}
                  height={250}
                  className="md:hidden w-full h-[250px] rounded-xl"
                />
                <Image
                  src={OrderTrackingDesktop}
                  alt="Speed and reliability image"
                  width={500}
                  height={500}
                  className="hidden md:block rounded-xl"
                />
              </figure>
              <div className="grid md:col-span-1 md:row-start-1  md:items-start md:flex md:flex-col gap-6 md:gap-3">
                <h2 className="bg-kaiglo_success-100 font-medium px-6 md:px-3 py-4 md:py-2 rounded-full justify-self-start">
                  Real-time Order Tracking
                </h2>
                <h3 className="font-bold text-xl">
                  Trusted local delivery platform.
                </h3>
                <p className="text-kaiglo_grey-base">
                  Your trust in Kaiglo.com is highly valued. Thus, we have
                  implemented the best standards for secure transactions and
                  customer information privacy.
                </p>
                <Link
                  href={"/"}
                  className="text-kaiglo_brand-base flex items-center gap-2 font-medium lg:mt-10"
                >
                  Track My Order
                  <ArrowRightIcon className="text-kaiglo_brand-base w-6 h-6 font-medium" />
                </Link>
              </div>
            </div>
          </div>

          <section className="p-4 bg-kaiglo_grey-50 py-10 md:py-20 ">
            <h2 className="font-medium text-2xl md:text-3xl md:text-center">
              Our flexible payment
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mt-6 lg:mx-8">
              <section className="flex flex-col gap-4 md:gap-2 border border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
                <figure className="bg-kaiglo_grey-50 font-bold flex items-center justify-center w-12 h-12 border border-kaiglo_grey-disabled rounded-lg">
                  <Image src={Card} alt="Card icon" width={32} height={32} />
                </figure>

                <h2 className="font-bold text-base">Payment with Card</h2>
                <p className="text-kaiglo_grey-base">
                  Quality products at the best affordable prices Multiple
                  varieties of each products Fast and convenient delivery
                </p>
              </section>
              <section className="flex flex-col gap-4 md:gap-2 border border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
                <figure className="bg-kaiglo_grey-50 font-bold flex items-center justify-center w-12 h-12 border border-kaiglo_grey-disabled rounded-lg">
                  <Image
                    src={SafeDelivery}
                    alt="Saft delivery icon"
                    width={32}
                    height={32}
                  />
                </figure>
                <h2 className="font-bold text-base">Payment on Delivery</h2>
                <p className="text-kaiglo_grey-base">
                  We promise to always provide our users with exceptional deals
                  at manufacturer's prices. Creating multiple channels where
                  manufacturers can have access to millions of Africans.
                </p>
              </section>
              <section className="flex flex-col gap-4 md:gap-2 border border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
                <figure className="bg-kaiglo_grey-50 font-bold flex items-center justify-center w-12 h-12 border border-kaiglo_grey-disabled rounded-lg">
                  <Image src={Money} alt="Money icon" width={32} height={32} />
                </figure>
                <h2 className="font-bold text-base">
                  Pay with Shopping Balance
                </h2>
                <p className="text-kaiglo_grey-base">
                  Continuous and never ending technological research and
                  development for exploring the ecommerce marketplace in
                  Nigeria, and Africa.
                </p>
              </section>
            </div>
          </section>

          {/* FAQs starts here */}
          <section className="p-4 max-w-[1200px] w-full m-auto">
            <h2 className="font-bold text-2xl mb-2 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-kaiglo_grey-base text-center">
              Our friendly team is always here to chat.
            </p>
            <div className="mt-6">
              <FaqContent />
            </div>
          </section>
          {/* FAQs ends here */}

          <figure className="relative w-full max-w-[1200px] m-auto rounded-md overflow-hidden mb-20">
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
      </div>
    </HomepageLayout>
  );
};

export default ShippingAndDelivery;
