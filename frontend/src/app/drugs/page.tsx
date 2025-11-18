import React from "react";

// components
import { Metadata } from "next";
import DrugsPageContent from "./_components/page-content";

export const metadata: Metadata = {
  title: "Abortion pills in UAE | Drugs",
  keywords:
    "Find safe, genuine abortion pills and contraceptives in the UAE with discreet delivery and reliable support. Trusted medical abortion information, privacy-focused service, and access to essential reproductive health products.",
  description:
    "Shop buy abortion pills and healthcare products in UAE at Mahad Pharmaceuticals — your reliable online pharmacy in the UAE. Enjoy safe, affordable, and fast online ordering with nationwide delivery and expert pharmaceutical support for all your health and wellness needs buy abortion pills uae,.",
};

const page = () => {
  return <DrugsPageContent />;
};

export default page;
