"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
// components
import Loader from "@/components/common/Loader";
import FeaturedDrugCard from "@/components/card/FeaturedDrugCard";
import { server_getHomeFtDrugs } from "@/actions/getHomeFtDrugs";

const HomeFtDrugs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["home-ft-drugs"],
    queryFn: () => server_getHomeFtDrugs(),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 max-sm:gap-20">
      {data?.map((drug, idx) => (
        <FeaturedDrugCard {...drug} key={idx} />
      ))}
    </div>
  );
};

export default HomeFtDrugs;
