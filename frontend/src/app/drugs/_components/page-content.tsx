"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// components
import Loader from "@/components/common/Loader";
import { useQuery } from "@tanstack/react-query";
import DrugCard from "@/components/card/DrugCard";
import { server_getDrugs } from "@/actions/getDrugs";
import { drugType, PaginatedResponseType } from "@/lib/types";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { ChevronLeft, ChevronRight, TicketMinus } from "lucide-react";

const DrugsPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchParam = searchParams.get("search_query") ?? null;
  const pageParam = searchParams.get("page") ?? null;

  const [results, setResults] = useState<PaginatedResponseType<drugType>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["drugs", searchParam, pageParam],
    queryFn: () => server_getDrugs(searchParam, pageParam),
  });

  useEffect(() => {
    if (data) setResults(data);
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageParam]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{"error"}</div>;
  }

  if (!results.count) {
    <div className="py-10 flex flex-col items-center gap-2 justify-center text-center h-[65vh]">
      <TicketMinus className="size-7" />
      <p>No Drugs at the moment</p>
    </div>;
  }

  return (
    <Suspense fallback={<></>}>
      <MaxWidthWrapper className="pb-20">
        {searchParam && (
          <div className="text-lg pb-8 flex items-center gap-2">
            <b className="font-bold">SEARCH:</b>
            <p>{searchParam}</p>
          </div>
        )}

        {results.count && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-10 mb-20">
              {results?.results.map((drug, idx) => (
                <DrugCard {...drug} key={idx} />
              ))}
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-4">
              <div className="w-fit  flex items-center justify-start gap-8 text-black/90 mx-auto">
                {results.previous && (
                  <button
                    onClick={() => {
                      if (!results.previous) return;

                      try {
                        const prevPage = new URL(
                          results.previous
                        ).searchParams.get("page");

                        const currentParams = new URLSearchParams(
                          searchParams.toString()
                        );

                        currentParams.set("page", prevPage ?? "1");

                        // Push merged query params to URL
                        router.push(`?${currentParams.toString()}`);
                      } catch (error) {
                        console.error("Invalid previous URL:", error);
                      }
                    }}
                    className="font-lg px-4 py-2 flex items-center gap-4"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <p className="text-current">Previous</p>
                  </button>
                )}

                {results.next && (
                  <>
                    <div className="h-8 w-[1px] bg-black/70"></div>
                    <button
                      onClick={() => {
                        if (!results.next) return;

                        // Get next page number from backend URL
                        const nextPage = new URL(results.next).searchParams.get(
                          "page"
                        );

                        const currentParams = new URLSearchParams(
                          searchParams.toString()
                        );
                        // Update or add the `page` param
                        currentParams.set("page", nextPage ?? "1");
                        router.push(`?${currentParams.toString()}`);
                      }}
                      className="font-lg px-4 py-2 flex items-center gap-4"
                    >
                      <p className="text-current">Next</p>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>

              <div className="text-sm text-gray-600 w-fit mx-auto">
                Page {pageParam ?? 1} of {Math.ceil(results.count / 10)}
              </div>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </Suspense>
  );
};

export default DrugsPageContent;
