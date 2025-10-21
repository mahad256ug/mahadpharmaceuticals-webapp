import React from "react";

// components
import { Metadata } from "next";
import DrugsPageContent from "./_components/page-content";

export const metadata: Metadata = {
  title: "Buy Medicines Online | Mahad Pharmaceuticals Drug Store UAE",
  keywords:
    "Mahad Pharmaceuticals, buy medicines online, pharmacy UAE, prescription drugs, over the counter medicines, health supplements, vitamins, personal care products, online pharmacy, affordable medicines, healthcare store, pharmacy delivery UAE, pharmaceutical products, drug store UAE, order medicine online, best pharmacy UAE, wellness products, medical supplies, trusted pharmacy, healthcare essentials",
  description:
    "Shop a wide range of trusted medicines and healthcare products at Mahad Pharmaceuticals — your reliable online pharmacy in the UAE. Discover prescription and over-the-counter drugs and supplements essentials. Enjoy safe, affordable, and fast online ordering with nationwide delivery and expert pharmaceutical support for all your health and wellness needs.",
};

const page = () => {
  return <DrugsPageContent />;
};

export default page;
