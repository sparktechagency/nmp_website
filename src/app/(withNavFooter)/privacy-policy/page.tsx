"use client";

import { usePrivacyPolicyQuery } from "@/redux/features/subscribeApi/subscribeApi";
import { Spin } from "antd";
import React from "react";

const PrivacyPolicy = () => {
  const { data: privacyData, isLoading: privacyLoading } =
    usePrivacyPolicyQuery(undefined);
  return (
    <div className="container mx-auto my-20 px-2">
      {privacyLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h2>
          <div
            className="text-gray-700 "
            dangerouslySetInnerHTML={{
              __html: privacyData?.data?.content || "No information found.",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
