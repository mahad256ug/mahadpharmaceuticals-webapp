import React from "react";
import type { Metadata } from "next";

// compnents
import About from "./_components/About";
import Services from "./_components/Services";

export const metadata: Metadata = {
  title: "About Mahad Abortion Pharmaceuticals.",
  keywords: "",
  description:
    "Mahad Pharmaceuticals offers safe abortion pills, trusted contraceptives, and effective sexual desire supplements in the UAE. We provide discreet, reliable guidance and confidential support for all your reproductive and sexual health needs.",
};

const page = () => {
  return (
    <div>
      <About />
      <Services />
    </div>
  );
};

export default page;
