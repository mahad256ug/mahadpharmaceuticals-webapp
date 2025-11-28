import React from "react";
import type { Metadata } from "next";

// compnents
import About from "./_components/About";
import Services from "./_components/Services";

export const metadata: Metadata = {
  title: "About Mahad Abortion Pharmaceuticals.",
  keywords: "",
  description:
    "Abortion pills contraceptives, men’s health, and general medicines near me contact +971522820802  in Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, RAK, and Umm Al Quwain sexual need.",
  alternates: {
    canonical: `/about-us`,
  },
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
