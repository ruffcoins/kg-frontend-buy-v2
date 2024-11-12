"use client";

import Loader from "../shared/Loader";
import ProductCard from "../product/ProductCard";
import { useEffect, useState } from "react";
import { useFilterProducts } from "@/hooks/queries/products/filterProducts";
import { useInView } from "react-intersection-observer";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import ErrorComponent from "../shared/ErrorComponent";
import Image from "next/image";
import OrderBox from "@/public/images/order-box.svg";
import { Button } from "../ui/button";
import ArrowLeft from "@/public/images/arrow-left.svg";
import Breadcrumb from "../shared/Breadcrumb";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn, sortOptions } from "@/lib/utils";
import { useProductCategoryDetail } from "@/hooks/queries/products/productCategoryDetail";
import Under10KFilterComponent from "../shared/FilterComponentUnder10K";

const Introduction = () => {
    const searchTerm = "";

    const { ref, inView } = useInView();

    const [openSortDropdown, setOpenSortDropdown] = useState(false);
    const [minPrice, setMinPrice] = useState(100);
    const [maxPrice, setMaxPrice] = useState(9999);
    const [category, setCategory] = useState("");
    const [name, setName] = useState(searchTerm);
    const [sort, setSort] = useState("Sort By");
    const [categoryToFilterBy, setCategoryToFilterBy] = useState("");

    const filters = {
        minPrice,
        maxPrice,
        category,
        name,
        sort,
    };

    const {
        filterProducts,
        isFetchingNextPage,
        refetchFilterProducts,
        fetchNextPage,
        hasNextPage,
        status,
        isRefetching,
        totalProducts,
    } = useFilterProducts(filters, 15);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    useEffect(() => {
        refetchFilterProducts();
    }, [minPrice, maxPrice, category, name, sort, refetchFilterProducts]);

    if (status === "error") {
        return <ErrorComponent message="Failed to load products." action={refetchFilterProducts} />;
    }

    useEffect(() => {
        if (filterProducts.length > 0) {
            setCategoryToFilterBy(filterProducts[0].category);
        }
    }, [filterProducts]);

    const { productCategoryDetail } = useProductCategoryDetail(categoryToFilterBy);

    const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Below ₦10k" }];

    const router = useRouter();

    const getSortLabel = (value: string) => {
        return sortOptions.find((option) => option.value === value)?.label;
    };

    return (
        <div className="lg:mx-8 rounded-lg space-y-4 lg:mt-10 lg:mb-4 mt-16">
            <div className="h-[72px] bg-white rounded-lg lg:p-4 p-0 border flex mx-1 lg:mx-0  items-center justify-between">
                <div className="flex items-center lg:space-x-6">
                    <Image
                        src={ArrowLeft}
                        alt="arrow left"
                        className="w-6 h-6 cursor-pointer hidden lg:block"
                        onClick={() => router.push("/")}
                    />
                    <Breadcrumb items={breadcrumbItems} />
                </div>

                <div className="lg:flex items-center space-x-4 relative hidden">
                    <p className="text-sm text-kaiglo_grey-placeholder font-medium">
                        {totalProducts} products found
                    </p>

                    <>
                        <div
                            className="w-52 justify-between border rounded-lg h-10 flex items-center px-2 relative cursor-pointer"
                            onClick={() => setOpenSortDropdown((prev) => !prev)}
                        >
                            <p className="font-medium">{getSortLabel(sort) || "Sort By"}</p>
                            <ChevronDownIcon
                                className={cn(
                                    "w-6 h-6 text-kaiglo_grey-placeholder",
                                    openSortDropdown && "rotate-180"
                                )}
                            />
                        </div>

                        {openSortDropdown && (
                            <div className="absolute w-56 p-4 z-10 top-16 rounded-lg right-10 border bg-white">
                                {sortOptions.map((option) => (
                                    <p
                                        key={option.value}
                                        className="font-medium py-2 cursor-pointer hover:bg-kaiglo_grey-100"
                                        onClick={() => {
                                            setSort(option.value);
                                            setOpenSortDropdown(false);
                                        }}
                                    >
                                        {option.label}
                                    </p>
                                ))}
                            </div>
                        )}
                    </>
                </div>
            </div>
            <div className="grid lg:grid-cols-12 grid-cols-2 lg:gap-x-5">
                <div className="h-20 col-span-3 rounded-lg lg:block hidden">
                    <Under10KFilterComponent category={category} setCategory={setCategory} />
                </div>
                {status === "loading" || isRefetching ? (
                    <div className="col-span-9 grid grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : filterProducts.length > 0 ? (
                    <div className="col-span-9">
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                                {filterProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={
                                            product.productColors[0].productPriceDetails[0].newPrice
                                                ? product.productColors[0].productPriceDetails[0].newPrice
                                                : product.productColors[0].productPriceDetails[0].price
                                        }
                                        oldPrice={
                                            product.productColors[0].productPriceDetails[0].newPrice
                                                ? product.productColors[0].productPriceDetails[0].price
                                                : undefined
                                        }
                                        category={product.category}
                                        discount={product.productColors[0].productPriceDetails[0].discount}
                                        imageUrl={product.productUrl}
                                        kaigloSale={product.kaigloSale as string}
                                        sales={product.sales}
                                        sold={product.sold}
                                        featured={product.featured}
                                        productViews={product.productViews}
                                    />
                                ))}
                            </div>

                            {isFetchingNextPage && (
                                <div className="flex items-center justify-center h-40">
                                    <Loader />
                                </div>
                            )}
                            <div ref={ref}>
                                {/* This empty div acts as a sentinel for the IntersectionObserver */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-[calc(100vh-24rem)] col-span-9 flex flex-col items-center justify-center space-y-4">
                        <Image
                            src={OrderBox}
                            alt="order box"
                            className="w-14 h-14 opacity-50"
                            width={56}
                            height={56}
                        />
                        <p className="font-bold">No filter results</p>
                        <p>Try changing the brand, colour, size, or sort by</p>
                        <Button
                            variant="secondary"
                            className="w-48 font-medium rounded-lg"
                            onClick={() => {
                                setMinPrice(0);
                                setMaxPrice(0);
                                setCategory("");
                                setName(searchTerm);
                                refetchFilterProducts();
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Introduction;
