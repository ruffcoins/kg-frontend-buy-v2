"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import FilterIcon from "@/public/images/filter.svg";
import { Button } from "../ui/button";
import { Range, getTrackBackground } from "react-range";
import { Input } from "../ui/input";
import { filterCategories } from "@/constants/categories";
import { IProduct } from "@/interfaces/product.interface";
import CategoryFilter from "../filters/CategoryFilter";
import BrandFilter from "../filters/BrandFilter";
import ColorFilter from "../filters/ColorFilter";
// import SizeFilter from "../filters/SizeFilter";
// import ShippingFilter from "../filters/ShippingFilter";
import SaleFilter from "../filters/SaleFilter";

export interface IFilter {
  name: string;
  category: string;
  sort: string;
  subCategory: string;
  secondSubCategory: string;
  brands: string[];
  productColorNames: string[];
  ramSizes: string[];
  storages: string[];
  productSizes: string[];
  productSales: string[];
  kaigloSale: string;
  maxPrice: number;
  minPrice: number;
  productShipping: string[];
}

interface FilterComponent0Props {
  products: IProduct[];
  min: number;
  max: number;
  category: string;
  brand: string;
  name: string;
  productColorName: string;
  productSize: string;
  productShipping: string;
  productSale: string;
  subCategory?: string;
  setCategory: Dispatch<SetStateAction<string>>;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  setBrands: Dispatch<SetStateAction<string[]>>;
  setProductColorNames: Dispatch<SetStateAction<string[]>>;
  setProductSizes: Dispatch<SetStateAction<string[]>>;
  setProductShipping: Dispatch<SetStateAction<string[]>>;
  setProductSales: Dispatch<SetStateAction<string[]>>;
  setKaigloSale: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  setSubCategory?: Dispatch<SetStateAction<string>>;
  // setSecondSubCategory: Dispatch<SetStateAction<string>>;
  // setRamSizes: Dispatch<SetStateAction<string[]>>;
  setSort: Dispatch<SetStateAction<string>>;
  // setStorages: Dispatch<SetStateAction<string[]>>;

  brands: string[];
  productColorNames: string[];
  productSizes: string[];
  productSales: string[];
}

const FilterComponent0: React.FC<FilterComponent0Props> = ({
  min,
  max,
  category,
  subCategory,
  brand,
  brands,
  name,
  productColorName,
  productColorNames,
  // productSizes,
  // productShipping,
  productSale,
  productSales,
  setCategory,
  setMinPrice,
  setMaxPrice,
  setBrands,
  setProductColorNames,
  setProductSizes,
  setProductShipping,
  setProductSales,
  setName,
  setSort,
  setKaigloSale,
  setSubCategory,
}) => {
  const [range, setRange] = useState([min, max]);
  const [inputMin, setInputMin] = useState(min);
  const [inputMax, setInputMax] = useState(max);

  const handleRangeChange = (newRange: number[]) => {
    setRange(newRange);
    setInputMin(newRange[0]);
    setInputMax(newRange[1]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max",
  ) => {
    const value = e.target.value;
    if (type === "min") {
      setInputMin(parseInt(value));
      if (Number(value) <= range[1]) {
        setRange([Number(value), range[1]]);
      }
    } else {
      setInputMax(parseInt(value));
      if (Number(value) >= range[0]) {
        setRange([range[0], Number(value)]);
      }
    }
  };

  const handleFilter = () => {
    setMinPrice(range[0]);
    setMaxPrice(range[1]);
  };

  const handleResetFilter = () => {
    setCategory(""),
      setMinPrice(1000),
      setMaxPrice(1000000),
      setBrands([]),
      setProductColorNames([]),
      setProductSizes([]),
      setProductShipping([]),
      setProductSales([]),
      setSubCategory?.("");
    setName(name);
    setSort("");
  };

  return (
    <div className="py-6 px-4 bg-white rounded-lg w-full divide-y">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <Image src={FilterIcon} alt="filter icon" width={24} height={24} />
          <h3 className="font-semibold">Filter</h3>
        </div>
        <Button
          variant="critical"
          className="text-sm px-3 py-1 font-medium"
          onClick={handleResetFilter}
        >
          Reset Filter
        </Button>
      </div>

      <div className="py-6 space-y-4">
        <h4 className="font-medium">Filter by Price (₦)</h4>

        <Range
          values={range}
          step={1}
          min={min}
          max={max}
          onChange={handleRangeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="w-full h-1 bg-gray-200 rounded-full"
              style={{
                background: getTrackBackground({
                  values: range,
                  colors: ["#ccc", "#007a49", "#ccc"],
                  min,
                  max,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="w-1 h-4 bg-kaiglo_brand-base rounded-full shadow cursor-pointer"
            />
          )}
        />

        <div className="flex flex-col space-y-4 justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={inputMin}
              onChange={(e) => handleInputChange(e, "min")}
              className="w-1/2 px-2 py-1 border rounded text-sm"
            />
            <span>-</span>
            <Input
              type="number"
              value={inputMax}
              onChange={(e) => handleInputChange(e, "max")}
              className="w-1/2 px-2 py-1 border rounded text-sm"
            />
          </div>

          <Button
            variant="secondary"
            onClick={handleFilter}
            className="w-full px-4 py-2 rounded bg-transparent border border-kaiglo_brand-base text-kaiglo_brand-base hover:bg-kaiglo_success-50 hover:border-0"
          >
            Filter
          </Button>
        </div>
      </div>

      <CategoryFilter
        categories={filterCategories}
        category={category}
        setCategory={setCategory}
        // isOpen={false}
        // setIsOpen={() => { }}
      />

      <BrandFilter brands={brands} brand={brand} setBrands={setBrands} />

      <ColorFilter
        colors={productColorNames}
        color={productColorName}
        setColor={setProductColorNames}
      />

      {/* <SizeFilter sizes={productSizes} size={productSize} setSize={setProductSizes} /> */}

      {/* <ShippingFilter
        shippings={shippings}
        shipping={productShipping}
        setShipping={setProductShipping}
      /> */}

      <SaleFilter
        sales={productSales}
        sale={productSale}
        setSale={setProductSales}
      />
    </div>
  );
};

export default FilterComponent0;
