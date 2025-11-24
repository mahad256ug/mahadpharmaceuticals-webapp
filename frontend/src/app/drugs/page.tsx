import React from "react";

// components
import { Metadata } from "next";
import DrugsPageContent from "./_components/page-content";

export const metadata: Metadata = {
  title:
    "Find abortion pills in uae | contraceptives in uae | erectile dysfunction in UAE | medicine drugs",
  keywords:
    "Find safe, genuine abortion pills and contraceptives in the UAE with discreet delivery and reliable support. Trusted medical abortion information, privacy-focused service, and access to essential reproductive health products.",
  description:
    "UAE medical info source for abortion pills contraceptives, erectile dysfunction (ED) and men’s health near me in Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, RAK, and Umm Al Quwain contact +971522820802",
};

const page = () => {
  return <DrugsPageContent />;
};

export default page;
