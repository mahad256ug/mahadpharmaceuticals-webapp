"use client";

import React from "react";
import Link from "next/link";

// store

import { PHONE_NO } from "@/lib/constants";
import { useStoreContext } from "@/store/context";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import DrugCartCard from "@/components/card/DrugCartCard";

const PageContent = () => {
  const { productsCart, resetDrugCart } = useStoreContext();

  const message = encodeURIComponent(
    `Hello Maha Pharmaceuticals, I want to buy: ${productsCart
      .map((item) => item.name)
      .join(", ")}`
  );
  const whatsappLink = `https://wa.me/${PHONE_NO}?text=${message}`;

  return (
    <MaxWidthWrapper>
      {productsCart.length > 0 ? (
        <div className="mx-auto max-w-screen-xl">
          <h2 className="text-xl uppercase mb-3">My Drugs / Drugs</h2>
          <div>
            <p>Remember, it is cash on delivery.</p>
          </div>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {/* drug */}

                {productsCart.map((drug, idx) => (
                  <DrugCartCard {...drug} key={idx} />
                ))}
              </div>
            </div>
            {/* order summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4  p-4  sm:p-6">
                <p className="text-xl font-semibold uppercase">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4 mb-4 pb-4 border-b">
                      <dt className="text-base dark:text-gray-400 ">
                        <span className="text-lg uppercase">drug</span>
                      </dt>

                      <dd className="text-base">
                        <span className="text-lg uppercase">Price AED</span>
                      </dd>
                    </dl>

                    {productsCart.map((drug, idx) => (
                      <dl
                        key={idx}
                        className="flex items-center justify-between gap-4"
                      >
                        <dt className="text-base font-normal  dark:text-gray-400">
                          {drug.name}
                        </dt>

                        <dd className="text-base font-medium ">
                          {drug.view_price && ` AED ${drug.price}`}
                        </dd>
                      </dl>
                    ))}
                  </div>
                </div>

                <Link
                  href={whatsappLink}
                  target="_blank"
                  onClick={() =>
                    setTimeout(
                      () => {
                        resetDrugCart();
                        // 5 minutes
                      },
                      5 * 60 * 1000
                    )
                  }
                  rel="noopener noreferrer"
                  className="w-full py-3.5 mt-10 px-4 text-center flex items-center justify-center text-green-500 border border-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all"
                >
                  Place Your Order with cash on delivery.
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center flex items-center justify-center flex-col gap-2 h-[65vh]">
          <div className="max-sm:max-w-[70vw]">
            <h4 className="uppercase block mb-2">
              You have not item in the Cart.
            </h4>
            <p>Please Search for the drugs or drug you want.</p>
          </div>

          <Link
            href={"/drugs"}
            className="border py-2 border-green-500 text-green-500 px-5 mt-5 hover:bg-green-500 hover:text-white duration-300 transition-all hover:font-semibold"
          >
            <p className="text-current">Drugs</p>
          </Link>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default PageContent;
