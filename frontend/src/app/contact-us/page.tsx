import React from "react";

// components
import type { Metadata } from "next";
import PageContent from "./_components/page-content";

export const metadata: Metadata = {
  title: "Contact about contrapective, abortion pill and ED pills in uae.",
  description:
    "safe abortion pills and reliable contraceptives in the UAE. We offer confidential support, genuine products, and trusted reproductive health assistance. Reach out anytime for private help and fast responses.",
  keywords:
    "Mahad Pharmaceuticals contact, pharmacy customer support, online pharmacy UAE, buy medicine online, pharmaceutical assistance, medicine delivery, health advice, prescription help, pharmacy near me, Mahad Pharma support, drug store contact",
  alternates: {
    canonical: `/contact-us/`,
  },
};

const page = () => {
  return <PageContent />;
};

export default page;
