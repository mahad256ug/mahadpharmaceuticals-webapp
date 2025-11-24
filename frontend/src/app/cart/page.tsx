import React, { Suspense } from "react";
import type { Metadata } from "next";

// components
import PageContent from "./_components/page-content";

export const metadata: Metadata = {
  title:
    "My Drugs abortion pill, contraceptives, erectile dysfunction Online Pharmacy Cart & Medicine Checkout",
  keywords:
    "My drugs, pharmacy cart, buy pills online, order prescription drugs, healthcare products, over the counter medicines, wellness supplements, online pharmacy UAE, affordable medicines, drug delivery, pharmacy checkout, pharmaceutical store, medical supplies, health and wellness, secure online pharmacy, pharmacy near me, medicine shopping cart, healthcare delivery UAE, online prescription refill, pharmacy offers",
  description:
    "abortion pill, contraceptives, erectile dysfunction (ED) uae after whatsapp or contact +971522820802 cart.",
};

const page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <PageContent />
    </Suspense>
  );
};

export default page;
