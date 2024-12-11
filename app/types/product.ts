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
  