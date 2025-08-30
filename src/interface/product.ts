// types/product.ts
export type Category = {
  _id: string;
  name: string;
};

export type SubCategory = {
  category: Category;
};

export type Product = {
  _id: string;
  title: string;
  price: number;
  discountPrice?: number;
  image: string;
  subCategory?: SubCategory;
  isPopular?: boolean;
  stockOut?: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};
