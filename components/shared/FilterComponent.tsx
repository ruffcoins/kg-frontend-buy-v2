"use client";

import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import FilterIcon from "@/public/images/filter.svg";
import { Button } from "../ui/button";
import { Range, getTrackBackground } from "react-range";
import { Input } from "../ui/input";
import { FilterOptionResponse } from "@/interfaces/responses/filter.interface";
import { capitalizeFirstLetterOfEachWord, cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface FilterComponentProps {
  min: number;
  max: number;
  filterOptions: FilterOptionResponse | undefined;
  minPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  brands: string[];
  setBrands: Dispatch<SetStateAction<string[]>>;
  productColorNames: string[];
  setProductColorNames: Dispatch<SetStateAction<string[]>>;
  productSizes: string[];
  setProductSizes: Dispatch<SetStateAction<string[]>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  subCategory: string;
  setSubCategory: Dispatch<SetStateAction<string>>;
  secondSubCategory: string;
  setSecondSubCategory: Dispatch<SetStateAction<string>>;
  refetch: any;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  min,
  max,
  filterOptions,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  brands,
  setBrands,
  productColorNames,
  setProductColorNames,
  productSizes,
  setProductSizes,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  secondSubCategory,
  setSecondSubCategory,
  refetch,
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

  const handleResetFilter = (
    category: string,
    subCategory: string,
    secondSubCategory: string,
  ) => {
    setRange([min, max]);
    setMinPrice(min);
    setMaxPrice(max);
    setInputMin(min);
    setInputMax(max);
    setBrands([]);
    setProductColorNames([]);
    setProductSizes([]);
    setCategory(category);
    setSubCategory(subCategory);
    setSecondSubCategory(secondSubCategory || "");
    refetch();
  };

  useEffect(() => {
    setRange([inputMin, inputMax]);
  }, [inputMin, inputMax]);

  // useEffect(() => {
  //   console.log("filter options", filterOptions);
  //   console.log("category", category);
  //   console.log("sub category", subCategory);
  // }, [filterOptions]);

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
          onClick={() =>
            handleResetFilter(category, subCategory, secondSubCategory)
          }
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
          <div className="flex w-full items-center space-x-2">
            <Input
              type="number"
              value={inputMin}
              onChange={(e) => handleInputChange(e, "min")}
              className="px-2 py-1 border rounded text-sm"
              max={max}
              min={min}
            />
            <span>-</span>
            <Input
              type="number"
              value={inputMax}
              onChange={(e) => handleInputChange(e, "max")}
              className="min-w-1/2 px-2 py-1 border rounded text-sm"
              max={max}
              min={min}
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

      {secondSubCategory === "" && subCategory && (
        <FilterSection
          title="Sub Categories"
          classNames="flex flex-col space-y-3"
        >
          {filterOptions?.secondSubCategory?.map((item) => (
            <Link
              href={`/category/${category}/${subCategory}/${item}`}
              className="text-sm font-medium leading-none "
            >
              {capitalizeFirstLetterOfEachWord(item)}
            </Link>
          ))}
        </FilterSection>
      )}

      {filterOptions?.specification && filterOptions.specification.Brand && (
        <FilterSection title="Brand">
          {Object?.entries(filterOptions.specification.Brand) &&
            Object?.entries(filterOptions.specification.Brand).map(
              ([key, value]) => (
                <FilterItem
                  key={key}
                  id={key}
                  checked={brands.includes(value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setBrands((prev) => [...prev, value]);
                    } else {
                      setBrands((prev) =>
                        prev.filter((brand) => brand !== value),
                      );
                    }
                  }}
                >
                  {capitalizeFirstLetterOfEachWord(value)}
                </FilterItem>
              ),
            )}
        </FilterSection>
      )}

      {filterOptions?.filterDetailOption &&
        filterOptions.filterDetailOption.size && (
          <FilterSection title="Size">
            {Object?.entries(filterOptions.filterDetailOption.size) &&
              Object.entries(filterOptions.filterDetailOption.size).map(
                ([key, value]) => (
                  <FilterItem
                    key={key}
                    id={key}
                    checked={productSizes.includes(value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProductSizes((prev) => [...prev, value]);
                      } else {
                        setProductSizes((prev) =>
                          prev.filter((size) => size !== value),
                        );
                      }
                    }}
                  >
                    {capitalizeFirstLetterOfEachWord(value)}
                  </FilterItem>
                ),
              )}
          </FilterSection>
        )}

      {filterOptions?.color && (
        <FilterSection title="Color">
          {Object?.entries(filterOptions.color) &&
            Object?.entries(filterOptions.color).map(([key, value]) => (
              <FilterItem
                key={key}
                id={key}
                checked={productColorNames.includes(value.color)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setProductColorNames((prev) => [...prev, value.color]);
                  } else {
                    setProductColorNames((prev) =>
                      prev.filter((color) => color !== value.color),
                    );
                  }
                }}
              >
                {capitalizeFirstLetterOfEachWord(value.color)}
              </FilterItem>
            ))}
        </FilterSection>
      )}
    </div>
  );
};

export default FilterComponent;

export const FilterSection = memo(
  ({
    title,
    classNames,
    children,
  }: {
    title: string;
    children: React.ReactNode;
    classNames?: string;
  }) => {
    return (
      <Collapsible className="mb-4">
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-left">
          <span className="text-lg font-semibold">{title}</span>
          <ChevronDownIcon className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent
          className={cn("max-h-40 overflow-y-auto", classNames)}
        >
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  },
);

export const FilterItem = memo(
  ({
    id,
    checked,
    onCheckedChange,
    children,
  }: {
    id: string;
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void;
    children: React.ReactNode;
  }) => {
    return (
      <div className="flex items-center space-x-2 py-2">
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {children}
        </label>
      </div>
    );
  },
);
