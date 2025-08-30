export type ProductForm = {
  title: string;
  description?: string;
  price: number;
  discountPrice?: number;
  image: string;
  subCategory: string;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleStart?: string;
  flashSaleEnd?: string;
};