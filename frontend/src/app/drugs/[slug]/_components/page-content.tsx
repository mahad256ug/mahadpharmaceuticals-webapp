"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// components
import { courrptImg } from "@/assets";
import { Bookmark } from "lucide-react";
import { PHONE_NO } from "@/lib/constants";
import Loader from "@/components/common/Loader";
import { useQuery } from "@tanstack/react-query";
import { useStoreContext } from "@/store/context";
import { server_getDrug } from "@/actions/getDrug";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

interface Props {
  slug: string;
}

const PageContent = ({ slug }: Props) => {
  const { productsCart, addDrugToCart, removeDrugFromCart } = useStoreContext();

  const { data } = useQuery({
    queryKey: ["drugs-details"],
    queryFn: () => server_getDrug(slug),
  });

  const drug = data;

  const exists = productsCart.some((p) => p.id === drug?.id);

  const message = encodeURIComponent(
    `Hello Maha Pharmaceuticals, I want to buy: ${drug?.name}`
  );
  const whatsappLink = `https://wa.me/${PHONE_NO}?text=${message}`;

  if (!drug) {
    return (
      <div className="flex items-center h-[65vh] py-8 justify-center">
        <div className="text-center flex flex-col gap-2">
          <h3 className="text-4xl mb-6">404</h3>
          <div className="max-w-md sm:max-w-xs mx-auto p-10">
            <h5 className="text-xl mb-6 uppercase">drug Not Found</h5>
            <p>The drug was not found, or you have an invalid URL.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-5 max-w-3xl ">
        <div className="px-4">
          <div className="flex items-start gap-4 justify-between flex-wrap relative mb-5">
            <h3 className="text-3xl uppercase">{drug.name}</h3>
            <div className="flex items-center gap-2 w-fit">
              {exists ? (
                <button
                  type="button"
                  onClick={() => drug && removeDrugFromCart(drug)}
                  className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border text-black/60"
                >
                  <Bookmark className="fill-current stroke-black/10" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => drug && addDrugToCart(drug)}
                  className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border"
                >
                  <Bookmark className="stroke-1" />
                </button>
              )}
            </div>
          </div>
          <p>{drug.description}</p>

          {drug.view_price && (
            <p className="my-4 font-bold text-xl">AED {drug.price}</p>
          )}
        </div>

        <div className="mt-5 p-4 w-full max-w-72">
          <Image
            src={drug.thumbnail ?? courrptImg}
            width={500}
            height={500}
            alt={drug.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center mt-10 w-full max-md:mx-auto">
          <Link
            href={whatsappLink}
            target="_blank"
            className="h-12 w-full border flex items-center justify-center border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-400 transition-all"
          >
            <p className="text-current">Place Order On Cash on Deliverly</p>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PageContent;
