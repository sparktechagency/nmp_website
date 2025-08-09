"use client";

import Accessories from "@/components/pages/Categories/Accessories";
import Liquids from "@/components/pages/Categories/Liquids";
import VapePen from "@/components/pages/Categories/VapePen";
import React, { useState } from "react";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Liquids");

  return (
    <div className="container mx-auto my-16">
      <div className="flex justify-end items-center gap-5">
        <button
          className={`${
            selectedCategory === "Liquids"
              ? "text-orange-400 border-b-2 border-b-orange-400"
              : "text-black"
          }`}
          onClick={() => setSelectedCategory("Liquids")}
        >
          Liquids
        </button>
        <button
          className={`${
            selectedCategory === "Vape Pens"
              ? "text-orange-300 border-b-2 border-b-orange-400"
              : "text-black"
          }`}
          onClick={() => setSelectedCategory("Vape Pens")}
        >
          Vape Pens
        </button>
        <button
          className={`${
            selectedCategory === "Accessories"
              ? "text-orange-300 border-b-2 border-b-orange-400"
              : "text-black"
          }`}
          onClick={() => setSelectedCategory("Accessories")}
        >
          Accessories
        </button>
      </div>
      <div>
        {selectedCategory === "Liquids" && <Liquids />}
        {selectedCategory === "Vape Pens" && <VapePen />}
        {selectedCategory === "Accessories" && <Accessories />}
      </div>
    </div>
  );
};

export default CategoryPage;
