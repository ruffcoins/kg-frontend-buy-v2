"use client";

import React, { Dispatch, SetStateAction } from "react";
import { filterCategories } from "@/constants/categories";
import CategoryFilter from "../filters/CategoryFilter";

interface Under10KFilterComponentProps {
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
}

const Under10KFilterComponent: React.FC<Under10KFilterComponentProps> = ({ category, setCategory }) => {
    return (
        <div className="pt-6 px-4 bg-white rounded-lg w-full divide-y">
            <h3 className="font-medium bg-kaiglo_info-base text-white text-center px-2 py-3 rounded-xl">
                Under 10k deals
            </h3>

            <CategoryFilter categories={filterCategories} category={category} setCategory={setCategory} />
        </div>
    );
};

export default Under10KFilterComponent;
