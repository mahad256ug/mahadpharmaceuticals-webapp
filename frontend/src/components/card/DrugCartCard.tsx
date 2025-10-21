"use client";
import React, { useState } from "react";
import Image from "next/image";

// compoennts
import Link from "next/link";
import { X } from "lucide-react";
import { drugType } from "@/lib/types";
import { useStoreContext } from "@/store/context";
import { courrptImg, defaultImg } from "@/assets";

const DrugCartCard = (drug: drugType) => {
  const { removeDrugFromCart } = useStoreContext();

  const [imagePreview, setImagePreview] = useState<{
    preview: boolean;
    url: string;
  }>({
    preview: false,
    url: "",
  });

  return (
    <div className="p-4 md:p-6 bg-accent">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <button
          onClick={() => {
            if (drug.thumbnail) {
              setImagePreview({
                preview: true,
                url: drug.thumbnail,
              });
            }
          }}
          className="w-20 shrink-0 md:order-1"
        >
          <Image
            className="h-20 w-20 dark:hidden"
            src={drug.thumbnail ?? courrptImg ?? defaultImg}
            alt={drug.name}
            width={300}
            height={300}
          />
        </button>

        {imagePreview.preview && (
          <div className="fixed inset-0 w-screen h-screen flex items-center justify-center  z-60">
            <div
              className="bg-black/40 fixed inset-0"
              onClick={() => setImagePreview({ url: "", preview: false })}
            ></div>
            <div className="max-w-md w-full max-sm:max-w-[80%] relative">
              <Image
                src={imagePreview.url ?? drug.thumbnail}
                alt={drug.name}
                width={500}
                height={600}
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-m ">
          <h3 className="text-base font-medium text-gray-900 hover:underline mb-2">
            <Link href={`/drugs/${drug.slug}`}>{drug.name}</Link>
          </h3>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => removeDrugFromCart(drug)}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500 gap-1"
            >
              <X className="size-5" />
              <p className="text-current text-base">Remove</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugCartCard;
