"use client";
import Link from "next/link";

// components
import HomeDrugs from "./home-drugs";
import HomeFtDrugs from "./home-ft-drugs";
import SectionHead from "@/components/Animations/SectionHead";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export default function HomeDrugsWrapper() {
  return (
    <MaxWidthWrapper>
      <SectionHead
        title="Our Drugs"
        subtitle="we offer safe, affordable, and high-quality medicines and healthcare drugs — from prescription drugs to everyday wellness essentials."
      />

      <div className="flex flex-col gap-10">
        <HomeFtDrugs />

        <HomeDrugs />
      </div>

      <div className="text-center mt-12">
        <Link
          href="/drugs"
          className="border border-green-500 py-3 px-5 text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out"
        >
          More Drugs
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
