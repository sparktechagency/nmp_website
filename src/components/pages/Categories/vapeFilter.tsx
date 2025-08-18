/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetBrandDropDownQuery,
  useGetCatDropDownQuery,
} from "@/redux/features/categoryApi/categoryApi";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// const categories = [
//   "Disposable Vape",
//   "Pod System",
//   "Vape Mod",
//   "E-Liquid",
//   "Coil",
//   "Battery",
//   "Charger",
//   "Vape Accessories",
// ];

const brands = [
  "SMOK",
  "Voopoo",
  "GeekVape",
  "Lost Vape",
  "Aspire",
  "Uwell",
  "Vaporesso",
];

const flavours = [
  "Mint",
  "Strawberry",
  "Mango",
  "Watermelon",
  "Grape",
  "Blueberry Ice",
  "Lemon Tart",
];

const FilterSection: React.FC<{
  title: string;
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ title, options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  return (
    <div className="bg-gray-50 rounded-lg  shadow-sm border mb-4">
      <div
        className="flex justify-between items-center cursor-pointer mb-3 border-b px-4 py-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className=" text-gray-800 font-bold ">{title}</h2>
        {isOpen ? (
          <MdKeyboardArrowUp className="text-xl " />
        ) : (
          <MdKeyboardArrowDown className="text-xl" />
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 p-4">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={selected.includes(option)}
                onChange={() => handleChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const VapeFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([]);
  const { data: categoryDropdata } = useGetCatDropDownQuery(undefined);
  const { data: brandData } = useGetBrandDropDownQuery(undefined);

  const categories = categoryDropdata?.data;
  const brands = brandData?.data;
  return (
    <div className="container mx-auto my-10">
      <div className="w-full ">
        <h1 className="text-lg font-semibold mb-2">Filter By</h1>

        <FilterSection
          title="Category"
          options={categories?.map((cat: any) => cat.name) ?? []}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />

        <FilterSection
          title="Brand"
          options={brands?.map((brand: any) => brand.name) ?? []}
          selected={selectedBrands}
          setSelected={setSelectedBrands}
        />

        <FilterSection
          title="Flavour"
          options={flavours}
          selected={selectedFlavours}
          setSelected={setSelectedFlavours}
        />
      </div>
    </div>
  );
};

export default VapeFilter;
