export interface FilterOptionResponse {
  category: string;
  color: {
    [key: string]: {
      color: string;
      colorCode: string;
    };
  };
  filterDetailOption: {
    [key: string]: string[];
  };
  id: string;
  sales: string[] | null;
  secondSubCategory: string[] | null;
  specification: {
    [key: string]: string[];
  };
  subCategory: string;
}
