import { Product } from "../types/product";

// Singleton cache for products
let productsCache: Product[] | null = null;

// Flag to indicate if a fetch is in progress
let fetchInProgress: boolean = false;

// Function to fetch products from the API
async function fetchProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(baseUrl+"/api/products"); // Adjust API endpoint if necessary
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching products:", error);
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

// Utility function to get a single product by ID
export async function getProductById(productId: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.id === productId) || null;
}

// Utility function to search products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

// Utility function to clear the cache (for testing or refreshing data)
export function clearProductsCache(): void {
  productsCache = null;
}
