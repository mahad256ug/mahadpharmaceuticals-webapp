"use client";

import React from "react";
import Loader from "@/components/common/Loader";
import { useQuery } from "@tanstack/react-query";
import DrugCard from "@/components/card/DrugCard";
import { server_getHomeDrugs } from "@/actions/getHomeDrugs";
import ListAnimationContainer from "@/components/Animations/ListAnimationContainer";

const HomeDrugs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["home-drugs"],
    queryFn: () => server_getHomeDrugs(),
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
    <div>
      {data && data.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-24 mb-14">
          {data.map((item, idx) => (
            <ListAnimationContainer
              idx={idx}
              key={idx}
              className="max-sm:mb-12"
            >
              <DrugCard {...item} />
            </ListAnimationContainer>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeDrugs;
