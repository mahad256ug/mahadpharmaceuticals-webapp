import React, { Suspense } from "react";
import type { Metadata } from "next";

// components
import PageContent from "./_components/page-content";

export const metadata: Metadata = {
  title: "My Drugs | Online Pharmacy Cart & Medicine Checkout",
  keywords:
    "my drugs, pharmacy cart, buy medicine online, order prescription drugs, healthcare products, over the counter medicines, wellness supplements, online pharmacy UAE, affordable medicines, drug delivery, pharmacy checkout, pharmaceutical store, medical supplies, health and wellness, secure online pharmacy, pharmacy near me, medicine shopping cart, healthcare delivery UAE, online prescription refill, pharmacy offers",
  description:
    "Easily manage your medicine orders with My Drugs — your secure online pharmacy cart and checkout platform. Review, edit, and finalize your prescription or over-the-counter drug purchases anytime. Enjoy fast medicine delivery across the UAE, safe payment options including Cash on Delivery, and reliable access to affordable healthcare products, supplements, and wellness essentials. Simplify your pharmacy experience with a trusted online drug store built for your health and convenience.",
};

const page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <PageContent />
    </Suspense>
  );
};

export default page;
