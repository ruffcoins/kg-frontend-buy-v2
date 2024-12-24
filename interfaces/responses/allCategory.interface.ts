export interface Category {
  name: string;
  productUrl?: string;
  productCount: number;
  parent?: string;
  parentUrl?: string;
  category: Category[];
}

export interface CategoryView {
  id: string;
  name: string;
  productUrl?: string;
  productCount: number;
  parent: string;
  category: Category[];
}

export interface AllCategoryResponse {
  response: CategoryView[];
  message: string;
}
