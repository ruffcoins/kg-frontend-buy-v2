export const gtmProductView = (props: { [key: string]: any }) => {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_KAIGLO_ENV === "prod"
  ) {
    window.dataLayer?.push({ ecommerce: null });

    const dataLayer = window.dataLayer?.push({
      event: "view_item",
      ecommerce: {
        currency: "NGN",
        value: props.price,
        items: [
          {
            item_id: props.id,
            item_name: props.name,
            price: props.price,
            affiliation: props.storeName,
            quantity: 1,
            item_category: props.category,
            item_category2: props.subCategory,
            item_category3: props.secondSubCategory,
          },
        ],
      },
      kaigloEnv: process.env.NEXT_PUBLIC_KAIGLO_ENV,
    });

    return dataLayer;
  }
};

export const gtmProductListView = (props: { [key: string]: any }) => {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_KAIGLO_ENV === "prod"
  ) {
    window.dataLayer?.push({ ecommerce: null });

    const dataLayer = window.dataLayer?.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: props.listId,
        item_list_name: props.listName,
        value: props.value,
        currency: "NGN",
        items: props.items.map((item: any, index: number) => ({
          item_id: item.id,
          item_name: item.name,
          affiliation: item.store.storeName,
          index,
          item_category: item.category,
          item_category2: item.subCategory,
          item_category3: item.secondSubCategory,
          price: item.productColors[0].productPriceDetails[0].price,
          quantity: parseInt(
            item.productColors[0].productPriceDetails[0].quantity,
          ),
          item_list_id: props.listId,
          item_list_name: props.listName,
        })),
      },
      kaigloEnv: process.env.NEXT_PUBLIC_KAIGLO_ENV,
    });

    return dataLayer;
  }
};

export const gtmViewCart = (props: { [key: string]: any }) => {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_KAIGLO_ENV === "prod"
  ) {
    window.dataLayer?.push({ ecommerce: null });

    const dataLayer = window.dataLayer?.push({
      event: "view_cart",
      ecommerce: {
        currency: "NGN",
        value: props.value,
        items: props.items.map((item: any, index: number) => ({
          item_id: item.id,
          item_name: item.name,
          index,
          price: item.price,
          quantity: item.quantity,
          affiliation: item.storeName,
          item_category: item.category,
          item_category2: item.subCategory,
          item_category3: item.secondSubCategory,
          item_variant: item.variant,
        })),
      },
      kaigloEnv: process.env.NEXT_PUBLIC_KAIGLO_ENV,
    });

    return dataLayer;
  }
};

export const gtmPurchase = (props: { [key: string]: any }) => {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_KAIGLO_ENV === "prod"
  ) {
    window.dataLayer?.push({ ecommerce: null });

    const dataLayer = window.dataLayer?.push({
      event: "purchase",
      customer: {
        name: props.name,
        address: props.address,
        phone: props.phone,
      },
      value: props.value,
      shipping: props.shipping,
      currency: "NGN",
      coupon: props.coupon,
      ecommerce: {
        items: props.items.map((item: any, index: number) => ({
          item_id: item.id,
          item_name: item.name,
          index,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      kaigloEnv: process.env.NEXT_PUBLIC_KAIGLO_ENV,
    });

    return dataLayer;
  }
};

export const gtmSearch = (props: { [key: string]: any }) => {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_KAIGLO_ENV === "prod"
  ) {
    window.dataLayer?.push({ ecommerce: null });

    const dataLayer = window.dataLayer?.push({
      event: "search",
      search_term: props.searchTerm,
      kaigloEnv: process.env.NEXT_PUBLIC_KAIGLO_ENV,
    });

    return dataLayer;
  }
};
