"use client";

import { useTermsAndConditionQuery } from "@/redux/features/subscribeApi/subscribeApi";
import { Spin } from "antd";
import React from "react";

const TermsCondition = () => {
  const { data: termsData, isLoading: termsLoading } =
    useTermsAndConditionQuery(undefined);
  return (
    <div className="container mx-auto md:px-10 md:h-[60vh] my-20">
      {termsLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Terms & Conditions</h2>
          <div
            className="text-gray-700 leading-relaxed max-h-[400px] overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: termsData?.data?.content || "No information found.",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TermsCondition;
