export interface SalesTemplate {
  response: Response;
  message: string;
}

export interface Response {
  salesObjectList: SalesObjectList[];
}

export interface SalesObjectList {
  imageUrl: string;
  name: string;
  description: any;
  banners: Banners;
  colors: Colors;
  startDate: string;
  endDate: string;
}

export interface Banners {
  mobileHome: string;
  mobileSalesPage: string;
  desktopHome: string;
  desktopHome2: string;
  desktopSalesPage: string;
  background: string;
}

export interface Colors {
  background: string;
  productCard: string;
  productName: string;
  priceContainer: string;
  priceText: string;
  slashedPriceText: string;
  itemCountBG: string;
  itemCountText: string;
}
