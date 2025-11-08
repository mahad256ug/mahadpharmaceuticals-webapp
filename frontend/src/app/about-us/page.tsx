import React from "react";
import type { Metadata } from "next";

// compnents
import About from "./_components/About";
import Services from "./_components/Services";

export const metadata: Metadata = {
  title: "About Us",
  keywords:
    "about Mahad Pharmaceuticals, online pharmacy UAE, buy abortion pills UAE, women's health UAE, family planning UAE, contraceptives, wellness supplements, healthcare drugs UAE, online consultation UAE, pharmacy cash on delivery UAE, Dubai pharmacy online, trusted pharmacy UAE about us who we are",
  description:
    "Mahad Pharmaceuticals is a trusted online pharmacy in the UAE, dedicated to making healthcare simple, safe, and accessible. We provide a wide range of genuine prescription and over-the-counter medicines, women’s health and family planning drugs, and wellness supplements. With fast, reliable delivery and convenient cash-on-delivery options, Mahad Pharmaceuticals ensures you receive high-quality healthcare drugs and professional support from the comfort of your home.",
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
