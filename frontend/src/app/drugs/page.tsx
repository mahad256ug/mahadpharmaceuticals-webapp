import React from "react";

// components
import { Metadata } from "next";
import DrugsPageContent from "./_components/page-content";

export const metadata: Metadata = {
  title: "find and buy abortion pills near me, contraceptives ED in UAE",
  keywords:
    " genuine abortion pills and contraceptives in the UAE . Trusted medical abortion information, privacy-focused service, and access to essential reproductive health products.",
  description:
    "Find safe abortion pills in uae, contraceptives in uae, ED with discreet delivery cash on delivery and reliable support accross Dubai, Abu Dhabi, Sharjah and other emirates. Call +971522820802",
  alternates: {
    canonical: "/drugs",
  },
};

const page = () => {
  return <DrugsPageContent />;
};

export default page;
