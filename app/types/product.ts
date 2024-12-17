export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPrice?: number;
    category: string;
    brand?: string;
    images: string[];
    stock: number;
    colors: string[];
    sizes?: string[];
    rating: number;
    reviewCount: number;
    isFeatured?: boolean;
    isNewArrival?: boolean;
    creationAt:Date;
    updatedAt?:Date;
    
  };
  // Input types
export type Image = {
  id: string;
  productId: string;
  createdAt: string;
  url: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  storeId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type InputProduct = {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  discount: number | null;
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  ratings:number[];
  category?: Category; // Optional to handle cases where it's missing
};
