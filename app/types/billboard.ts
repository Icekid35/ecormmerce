import { Category } from "./product";

export type Billboard = {
    id: string,
    image: string,
    title: string,
    subtitle: string,
    cta:string,
    category:string
  };
  
 export type initialBillboards={
    label: string;
    imageUrl: string;
    subtitle: string;
    cta: string;
    category: Category;
    id: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}