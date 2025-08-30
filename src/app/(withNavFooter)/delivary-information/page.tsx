"use client";
import { useGetDelivaryInformationQuery } from "@/redux/features/subscribeApi/subscribeApi";
import { Spin } from "antd";
import React from "react";

const DelivaryInformation = () => {
  const { data: delivaryData, isLoading: deliveryLoading } =
    useGetDelivaryInformationQuery(undefined);
  return (
    <div className="container mx-auto my-20 md:h-[60vh] md:px-10">
      {deliveryLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Delivery Information</h2>
          <div className="text-gray-700 leading-relaxed space-y-2">
            <p>
              <strong>Address:</strong> {delivaryData?.data?.address}
            </p>
            <p>
              <strong>Email:</strong> {delivaryData?.data?.email}
            </p>
            <p>
              <strong>Phone:</strong> {delivaryData?.data?.phone}
            </p>
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                href={delivaryData?.data?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {delivaryData?.data?.instagram}
              </a>
            </p>
            <p>
              <strong>Telegram:</strong>{" "}
              <a
                href={delivaryData?.data?.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {delivaryData?.data?.telegram}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DelivaryInformation;
