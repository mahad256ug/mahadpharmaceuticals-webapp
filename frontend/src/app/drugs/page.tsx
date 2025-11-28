import React from "react";

// components
import { Metadata } from "next";
import DrugsPageContent from "./_components/page-content";

export const metadata: Metadata = {
  title: "find and buy abortion, contraceptives ED in UAE",
  keywords:
    "Find safe, genuine abortion pills and contraceptives in the UAE with discreet delivery and reliable support. Trusted medical abortion information, privacy-focused service, and access to essential reproductive health products.",
  description:
    "For abortion pills, contraceptives, ED and sexual herbs in Dubai, Abu Dhabi, Sharjah and other emirates. Call +971522820802",
  alternates: {
    canonical: "/drugs",
  },
};

const page = () => {
  return <DrugsPageContent />;
};

export default page;
