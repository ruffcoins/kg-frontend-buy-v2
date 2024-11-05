"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import useGetAllCategories from "@/hooks/queries/category/getAllCategories";
import { capitalizeFirstLetterOfEachWord } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Category, CategoryView } from "@/interfaces/responses/allCategory.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MenuSquare from "@/public/images/menu-square.svg";

const getSubCategories = (category: CategoryView) => {
    const subCategories = category?.category?.map((category) => category);
    return subCategories;
};

const getSubSubCategories = (subCategory: Category) => {
    let subSubCategories = subCategory.category.map((category: Category) => {
        return { parentUrl: subCategory.productUrl, ...category };
    });
    return subSubCategories;
};

const MegaMenu = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { allCategories } = useGetAllCategories();
    const memoizedCategories = useMemo(
        () => allCategories?.slice(0, window.innerWidth < 1280 ? 5 : 6) ?? [],
        [allCategories]
    );

    const initialTab = memoizedCategories?.[0]?.id || "";
    const [currentTab, setCurrentTab] = useState<string | undefined>(initialTab);

    const handleMouseEnter = useCallback((tab: CategoryView) => {
        setCurrentTab(tab.id);
        setCategory(tab);
    }, []);

    const [category, setCategory] = useState<CategoryView>({} as CategoryView);
    const [currentSubCategories, setCurrentSubCategories] = useState<Category[]>([] as Category[]);
    const [currentSubSubCategories, setCurrentSubSubCategories] = useState<{
        [key: string]: Category[];
    }>({});

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    useEffect(() => {
        const result = getSubCategories(category as CategoryView);
        setCurrentSubCategories(result);
    }, [category]);

    useEffect(() => {
        const subSubCategoriesMap: { [key: string]: Category[] } = {};

        currentSubCategories?.forEach((subCategory) => {
            const subSubCategories = getSubSubCategories(subCategory);
            if (subSubCategories.length > 0) {
                // Check if there are sub-subcategories
                subSubCategoriesMap[subCategory.name] = subSubCategories;
            }
        });

        setCurrentSubSubCategories(subSubCategoriesMap);
    }, [currentSubCategories]);

    return (
        <div ref={menuRef} className="">
            {memoizedCategories?.map((item) => (
                <span
                    key={item.id}
                    className="py-2.5 px-2.5 2xl:px-4 cursor-pointer hover:bg-kaiglo_grey-100 transition-colors duration-300 rounded-full text-sm font-normal normal-case"
                    onMouseEnter={() => handleMouseEnter(item)}
                    onClick={() => {
                        setIsOpen((prev) => !prev);
                        handleMouseEnter(item);
                    }}
                >
                    {capitalizeFirstLetterOfEachWord(item.name)}
                </span>
            ))}

            {isOpen && (
                <div className="lg:px-8 absolute top-14 left-0 w-full bg-white shadow-lg z-10 flex">
                    {/* First Section */}
                    <div className="w-1/5 py-4 h-[432px] overflow-auto ">
                        <div className="h-[300px]">
                            {memoizedCategories.map((tab) => (
                                <ul className="text-kaiglo_grey-700" key={tab.id}>
                                    <li
                                        key={tab.id}
                                        className={`${currentTab === tab.id ? "bg-kaiglo_grey-100" : ""} flex items-center justify-between p-3 text-base font-medium hover:bg-kaiglo_grey-100 cursor-pointer rounded-lg transition-all duration-200 ease-in-out`}
                                        onMouseEnter={() => {
                                            handleMouseEnter(tab);
                                        }}
                                        onClick={() => router.push(`/category/${tab.name}/`)}
                                    >
                                        <span>{capitalizeFirstLetterOfEachWord(tab.name)}</span>
                                        <span>
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </span>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>

                    {/* Second Section */}
                    <div className="w-2/5 py-4 grid grid-cols-4 gap-4 border-r h-[432px] overflow-auto ">
                        {currentSubCategories
                            ?.filter((category) => category.category.length !== 0)
                            ?.map((category) => (
                                <div
                                    className="flex flex-col items-center mb-4 cursor-pointer"
                                    key={category.name}
                                >
                                    <Image
                                        src={category?.productUrl as string}
                                        alt={category?.name}
                                        width={72}
                                        height={72}
                                        className="rounded-full object-cover w-[72px] h-[72px] bg-kaiglo_grey-100"
                                    />
                                    <p className="text-sm text-center text-kaiglo_grey-700 mt-1">
                                        {capitalizeFirstLetterOfEachWord(category?.name)}
                                    </p>
                                </div>
                            ))}
                    </div>

                    {/* Third Section */}
                    <div className="w-2/5 py-4 flex flex-col space-y-4 h-[432px] overflow-auto ">
                        {Object.entries(currentSubSubCategories).map(
                            ([subCategoryName, subSubCategories]) => (
                                <div key={subCategoryName} className="space-y-2">
                                    <h4 className="font-medium text-lg px-4">
                                        {capitalizeFirstLetterOfEachWord(subCategoryName)}
                                    </h4>
                                    <div className="grid grid-cols-5 gap-4">
                                        <div className="flex flex-col items-center space-y-1">
                                            <Link
                                                href={`/category/${category?.name}/${subCategoryName}`}
                                                className="min-w-[72px] min-h-[72px] flex items-center justify-center rounded-full bg-gray-100"
                                            >
                                                <Image
                                                    src={MenuSquare}
                                                    alt={"Category Menu"}
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8"
                                                />
                                            </Link>

                                            <p>View All</p>
                                        </div>

                                        {subSubCategories.slice(0, 4).map((subSubCategory) => (
                                            <Link
                                                href={`/category/${category?.name}/${subCategoryName}/${subSubCategory.name}`}
                                            >
                                                <div
                                                    className="col-span-1 flex flex-col items-center cursor-pointer"
                                                    key={subSubCategory.name}
                                                >
                                                    <Image
                                                        src={
                                                            (subSubCategory?.productUrl as string) ||
                                                            (subSubCategory?.parentUrl as string)
                                                        }
                                                        alt={subSubCategory?.name}
                                                        width={72}
                                                        height={72}
                                                        className="rounded-full object-cover w-[72px] h-[72px] bg-kaiglo_grey-100"
                                                    />
                                                    <p className="text-sm text-center text-kaiglo_grey-700 mt-1">
                                                        {capitalizeFirstLetterOfEachWord(
                                                            subSubCategory?.name
                                                        )}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div></div>
                </div>
            )}
        </div>
    );
};
export default MegaMenu;
