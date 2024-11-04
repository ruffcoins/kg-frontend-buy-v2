import HomepageLayout from "@/components/layouts/Homepage/HomepageLayout";

const ReturnPolicy = () => {
  return (
    <HomepageLayout>
      <div className="-mt-2 bg-white">
        <div className="px-4 py-12 flex flex-col gap-y-12  max-w-[1200px] m-auto">
          {/* Kaiglo return policy starts here */}
          <section className="max-w-[900px]">
            <h1 className="font-bold md:font-bold text-2xl md:text-3xl mb-2">
              Kaiglo Return Policy
            </h1>
            <p className="text-kaiglo_grey-base">
              Thank you for shopping with Kaiglo Stores Limited. We strive to
              provide you with a seamless and enjoyable shopping experience.
              Please note that all items delivered by Kaiglo has gone through
              quality check and undergone all dues diligence. However, If for
              any reason, you are not satisfied with your purchase, we are here
              to help. Please review our return policy below.
            </p>
          </section>
          {/* Kaiglo return policy ends here */}
          {/* General return guidelines starts here */}
          <section>
            <h2 className="font-bold text-2xl mb-2">
              General Return Guildlines
            </h2>
            <p className="text-kaiglo_grey-base mb-4">
              Please note that all these criteria must be met before an item is
              eligible for return or exchange.
            </p>
            <ul className="list-disc font-medium text-kaiglo_grey-base px-4 space-y-4">
              <li>
                You may return items within 7 days of the delivery date for a
                refund or exchange.
              </li>
              <li>
                You may return items within 7 days of the delivery date for a
                refund or exchange.
              </li>
              <li>
                You may return items within 7 days of the delivery date for a
                refund or exchange.
              </li>
              <li>
                You may return items within 7 days of the delivery date for a
                refund or exchange.
              </li>
              <li>
                You may return items within 7 days of the delivery date for a
                refund or exchange.
              </li>
            </ul>
          </section>
          {/* General return guidelines ends here */}
          {/*Return exemptions starts here */}
          <section className="">
            <h2 className="font-bold text-2xl mb-2">Return Exemptions</h2>
            <div className="overflow-x-auto">
              <table className="w-[1200px] md:w-full text-left mb-4">
                <thead className="font-medium">
                  <tr className="">
                    <th className="bg-kaiglo_grey-disabled p-3 font-medium rounded-tl-lg">
                      Product item
                    </th>
                    <th className="bg-kaiglo_grey-disabled p-3 font-medium rounded-tr-lg">
                      Reason for return
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="">
                    <th
                      scope="row"
                      className="p-4 font-medium border border-kaiglo_grey-disabled"
                    >
                      Fashion
                    </th>
                    <td className="p-4 border border-kaiglo_grey-disabled">
                      Items such as Jewellery, inner-wear, swimwear, lingerie
                      and socks are exempted from return.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="p-4 font-medium border border-kaiglo_grey-disabled"
                    >
                      Home & Garden
                    </th>
                    <td className="p-4 border border-kaiglo_grey-disabled">
                      Bedding, towels, self assembled furniture, breakable
                      decors, glass-wares appliances with breakable parts cannot
                      be returned.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="p-4 font-medium border border-kaiglo_grey-disabled"
                    >
                      Electronics, Phones & Gadget
                    </th>
                    <td className="p-4 border border-kaiglo_grey-disabled">
                      Product with tampered or missing serial Universal Product
                      Code/IMEI numbers or products damaged due to misuse such
                      as burnt chargers and broken screens are not returnable.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="p-4 font-medium border border-kaiglo_grey-disabled"
                    >
                      Kids & Toys
                    </th>
                    <td className="p-4 border border-kaiglo_grey-disabled">
                      Assembled toys and gears, underwear, washcloths & towels,
                      bibs & burp cloths cannot be returned.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="p-4 font-medium border border-kaiglo_grey-disabled"
                    >
                      Beauty & Health
                    </th>
                    <td className="p-4 border border-kaiglo_grey-disabled">
                      Cosmetics, personal care, supplements, sex toys &
                      contraceptives are exempted from return.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="p-4 font-medium border border-kaiglo_grey-disabled"
                    >
                      Office & School
                    </th>
                    <td className="p-4 border border-kaiglo_grey-disabled">
                      Books, CDs and self assembled office furniture are not
                      returnable.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="p-4 font-medium border border-kaiglo_grey-disabled"
                    >
                      Groceries
                    </th>
                    <td className="p-4 border border-kaiglo_grey-disabled">
                      Perishable goods, can drinks, beverages with bent
                      containers and food items packaged in sacks such as rice
                      cannot be returned.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="p-4 font-medium border border-kaiglo_grey-disabled"
                    >
                      Others
                    </th>
                    <td className="p-4 border border-kaiglo_grey-disabled">
                      Products delivered more than 7 days, Near expiry products,
                      items bought on sales and products with the non-returnable
                      tags on the product page are exempted from return.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          {/* Return exemptions ends here */}
          {/* Return process starts here */}
          <section className="max-w-[900px]">
            <h2 className="font-bold text-2xl mb-2">Return Processes</h2>
            <p className="text-kaiglo_grey-base">
              Please note that all these criteria must be met before an item is
              eligible for return or exchange
            </p>
            <div className="grid gap-2 mt-6">
              <section className="grid md:grid-cols-[1fr_11fr] gap-4 md:gap-0 border border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
                <div className="bg-kaiglo_grey-disabled font-bold flex items-center justify-center w-12 h-12 border border-kaiglo_grey-disabled rounded-lg">
                  1
                </div>
                <div>
                  <h2 className="font-bold text-base uppercase">
                    Initiate Return
                  </h2>
                  <p className="text-kaiglo_grey-base">
                    Log in to your account on our website and go to the "Order
                    History" section. Select the order containing the item(s)
                    you want to return, click to open order, scroll to the
                    specific item you would like to return and click return.
                  </p>
                </div>
              </section>
              <section className="grid md:grid-cols-[1fr_11fr] gap-4 md:gap-0 border border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
                <div className="bg-kaiglo_grey-disabled font-bold flex items-center justify-center w-12 h-12 border border-kaiglo_grey-disabled rounded-lg">
                  2
                </div>
                <div>
                  <h2 className="font-bold text-base uppercase">
                    Give details
                  </h2>
                  <p className="text-kaiglo_grey-base">
                    Enter reasons for return. You will be prompted to attach
                    pictures and/or videos for defective items. Indicate if you
                    would like a refund or an exchange and mode of return (Pick
                    up or Drop off).
                  </p>
                </div>
              </section>
              <section className="grid md:grid-cols-[1fr_11fr] gap-4 md:gap-0 border border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
                <div className="bg-kaiglo_grey-disabled font-bold flex items-center justify-center w-12 h-12 border border-kaiglo_grey-disabled rounded-lg">
                  3
                </div>
                <div>
                  <h2 className="font-bold text-base uppercase">
                    Return Authorization
                  </h2>
                  <p className="text-kaiglo_grey-base">
                    Await approval and instructions for return shipping. Do not
                    send items back without prior authorization.
                  </p>
                </div>
              </section>
              <section className="grid md:grid-cols-[1fr_11fr] gap-4 md:gap-0 border border-kaiglo_grey-disabled bg-kaiglo_grey-50 md:bg-white py-5 px-4 rounded-lg">
                <div className="bg-kaiglo_grey-disabled font-bold flex items-center justify-center w-12 h-12 border border-kaiglo_grey-disabled rounded-lg">
                  4
                </div>
                <div>
                  <h2 className="font-bold text-base uppercase">
                    Return Shipping
                  </h2>
                  <p className="text-kaiglo_grey-base">
                    You are responsible for the cost of return shipping unless
                    the return is due to a mistake on our part. <br />
                    Once we receive the returned item(s), we will inspect them
                    and process your refund or exchange accordingly.
                  </p>
                </div>
              </section>
            </div>
          </section>
          {/* Return process ends here */}
          {/* Timeline starts here */}
          <section className="grid gap-4 max-w-[900px]">
            <h2 className="font-bold text-2xl mb-2">Timeline</h2>
            <div className="mb-2">
              <h3 className="font-bold text-base mb-2">Pickup & Drop Off</h3>
              <p className="text-kaiglo_grey-base">
                Enter reasons for return. You will be prompted to attach
                pictures and/or videos for defective items. Indicate if you
                would like a refund or an exchange and mode of return (Pick up
                or Drop off).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-2">Refund & Exchange</h3>
              <p className="text-kaiglo_grey-base">
                Kindly note that this delivery timeline would apply in the case
                of an exchange and refund would take between 5 - 7 days for
                payment int bank account while wallet refund would be effected
                immediately. <br />
                The refund time starts from the day the item you returned gets
                into our custody . You can track your returned item with the
                link below *******.(Order tracking code)
              </p>
            </div>
          </section>
          {/* Timeline ends here */}
        </div>
      </div>
    </HomepageLayout>
  );
};

export default ReturnPolicy;
