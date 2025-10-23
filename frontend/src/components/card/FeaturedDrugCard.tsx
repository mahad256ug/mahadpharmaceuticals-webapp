"use client";

import React from "react";
import Link from "next/link";

// thirdpatry
import { motion } from "framer-motion";
import { drugType } from "@/lib/types";

// component
const FeaturedDrugCard = ({ ...drug }: drugType) => {
  return (
    <div
      style={{ backgroundImage: `url(${drug.thumbnail ?? "/default.jpg"})` }}
      className="w-full h-full aspect-video bg-no-repeat bg-center bg-cover overflow-visible m-4 p-4"
    >
      <div className="h-full w-full bg-gradient-to-t from-black/50 via-black/20 to-transparent flex flex-col px-5 sm:px-10 justify-end text-white relative">
        {drug.status == "draft" && (
          <div className="absolute top-0 w-full bg-green-500 p-2 px-6 tex-center left-0">
            <p className="text-current text-sm font-semibold">
              Not yet Published
            </p>
          </div>
        )}

        <Link
          href={`/drugs/${drug.slug}`}
          className="block bg-white p-5 border-b -mb-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-2xl text-green-500 line-clamp-1 capitalize"
          >
            {drug.name}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className=" line-clamp-2 sm:line-clamp-3 pt-2"
          >
            {drug.description}
          </motion.p>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedDrugCard;
