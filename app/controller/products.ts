import { InputProduct, Product } from "../types/product";

// Utility function to calculate if a product is a new arrival
function isNewArrival(createdAt:string) {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const now = new Date();
  return new Date(createdAt) >= new Date(now.getTime() - oneWeekInMilliseconds);
}

// Function to convert the array of objects to the desired Product type
function convertToProductType(products:InputProduct[]) {
  return products.map((product) => {
    return {
      id: product.id,
      title: product.name,
      description: product.description || "", // Assuming category name as description placeholder
      price: product.price,
      discountPrice: product.discount || undefined,
      category: product.category?.name || "Unknown",
      brand: undefined, // Map to brand if available in the source data
      images: product.images.map((image) => image.url),
      stock: 0, // Assuming stock is not provided, set to 0 as default
      colors: product.colors || [],
      sizes: product.sizes || [],
      rating: product.ratings && product.ratings.length > 0 
        ? product.ratings.reduce((sum, r) => sum + r, 0) / product.ratings.length 
        : 0, // Calculate mean if ratings exist, otherwise default to 0
      reviewCount: product.ratings?.length || 0, // Number of ratings
      isFeatured: product.isFeatured || false,
      isNewArrival: isNewArrival(product.createdAt),
      creationAt: new Date(product.createdAt),
      updatedAt: product.updatedAt ? new Date(product.updatedAt) : undefined,
    };
    
  });
}

// Singleton cache for products
let productsCache: Product[] | null = null;

// Flag to indicate if a fetch is in progress
let fetchInProgress: boolean = false;
const adminhost="https://iceadmin.vercel.app/api/143cc3b9-0bfb-4034-859a-09a877623866"
// Function to fetch products from the API
async function fetchProducts(): Promise<Product[]> {
  try {
    console.log("fetching...")
    const response = await fetch(adminhost+"/products"); // Adjust API endpoint if necessary
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    // console.log(await response.json())
    const data: Product[] = convertToProductType(await response.json());
    return data;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
}
export async function uploadReview(productId: string, rating: number): Promise<void> {
  try {
    console.log("Uploading review...");
    console.log(productId)
    const response = await fetch(`${adminhost}/products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      throw new Error(`Failed to upload review: ${response.statusText}`);
    }

    console.log("Review uploaded successfully.");
  } catch (error) {
    console.log("Error uploading review:", error);
    throw error;
  }
}

// Controller to get products with caching
export default async function getProducts(): Promise<Product[]> {
  // If products are cached, return the cache
  if (productsCache) {
    return productsCache;
  }

  // If a fetch is already in progress, wait for it to complete
  if (fetchInProgress) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!fetchInProgress && productsCache) {
          clearInterval(interval);
          resolve(productsCache);
        }
      }, 100); // Poll every 100ms
    });
  }

  // Fetch and cache the products
  fetchInProgress = true;
  try {
    productsCache = await fetchProducts();
  } finally {
    fetchInProgress = false;
  }
  return productsCache;
}

// // Utility function to get a single product by ID
// export async function getProductById(productId: string): Promise<Product | null> {
//   const products = await getProducts();
//   return products.find((product) => product.id === productId) || null;
// }

// // Utility function to search products by category
// export async function getProductsByCategory(category: string): Promise<Product[]> {
//   const products = await getProducts();
//   return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
// }

// // Utility function to clear the cache (for testing or refreshing data)
// export function clearProductsCache(): void {
//   productsCache = null;
// }
