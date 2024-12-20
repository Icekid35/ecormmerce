// Account.ts
export type Account = {
    id: string; // Unique account identifier
    name: string |null; // User's full name
    email: string; // User's email address
    phone?: string; // Optional phone number
    address: string; // List of saved addresses
    cart: CartItem[]; // Current items in the cart
    wishlist: string[]; // Items added to the wishlist
    orders: Order[]; // Orders placed by the user
    reviews: Review[]; // Reviews (pending and past)
    createdAt: string; // Account creation date
    isActive: boolean; // Is the account active?
    isgoogle?:boolean;
    password?:string;
    isLoaded?:boolean;
};
  

  
  export type CartItem = {
    id: string; // Associated product ID
    title: string; // Name of the product
    price: number; // Price per unit
    quantity: number; // Quantity in the cart
    image: string; // Product image URL
    sizes:string[];
    colors:string[];
  };
  
  export type WishlistItem = {
    id: string; // Associated product ID
    title: string; // Name of the product
    price: number; // Price of the product
    image: string; // Product image URL
    addedAt: Date|string; // Date and time the product was added to the wishlist
  };
  
  export type Order = {
    orderId: string; // Unique order ID
    id:string;
    productId: string; // Associated product ID
    image:string;
    discountPercentage?:number|null|undefined;
    sizes?:string[];
    colors?:string[];
    title: string; // Name of the product
    quantity: number; // Quantity ordered
    price: number; // Price per unit
    total: number; // Total price (price * quantity)
    status: string; // Order status
    isCancellable: boolean; // Can the order be cancelled?
    placedAt: Date; // Date and time the order was placed
  };
  

  export type Review = {
    id: string; // Associated product ID
    title: string; // Name of the product
    rating?: number|null| undefined; // Rating given by the user (1-5)
    image:string;
    productId: string

    reviewedAt?: Date|null; // Date the review was completed
  };
  