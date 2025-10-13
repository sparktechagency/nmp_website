import Banner from "@/components/pages/HomePage/Banner";
import BestSellers from "@/components/pages/HomePage/BestSellers";
import FeatureProducts from "@/components/pages/HomePage/FeatureProducts";
import LimitedOffer from "@/components/pages/HomePage/LimitedOffer";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeatureProducts />
      <LimitedOffer />
      {/* <BestSellers /> */}
    </div>
  );
};

export default HomePage;
