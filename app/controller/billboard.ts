import { Billboard, initialBillboards } from "../types/billboard";
import { ownerStoreid } from "./owner";

function convertToBillboardType(initialBillboards: initialBillboards[]): Billboard[] {
    console.log(initialBillboards)
  return initialBillboards.map((initial) => ({
    id: initial.id,
    image: initial.imageUrl, // Map `imageUrl` to `image`
    title: initial.label, // Map `label` to `title`
    subtitle: initial.subtitle, // Keep `subtitle` as is
    cta: initial.cta, // Keep `cta` as is
    category: initial.category?.name, // Extract `category` name
  }));
}
// Singleton cache for billboards
// let billboardsCache: Billboard[] | null = null;

// Flag to indicate if a fetch is in progress
// let fetchBillboardsInProgress: boolean = false;

// Define the API host
const adminhost=process.env.NODE_ENV =="production"? "https://iceadmin.vercel.app/api/"+ownerStoreid:"http://localhost:3001/api/"+ownerStoreid

// Function to fetch billboards from the API
async function fetchBillboards(): Promise<Billboard[]> {
  try {
    console.log("Fetching billboards...");
    const response = await fetch(`${adminhost}/billboards`); // Adjust API endpoint if necessary
    if (!response.ok) {
      throw new Error(`Failed to fetch billboards: ${response.statusText}`);
    }

    const data: Billboard[] =convertToBillboardType(await response.json()); // Assume the response matches the Billboard type
    return data;
  } catch (error) {
    console.log("Error fetching billboards:", error);
    throw error;
  }
}

// Controller to get billboards with caching
export default async function getBillboards(): Promise<Billboard[]> {
  // If billboards are cached, return the cache
  // if (billboardsCache) {
  //   return billboardsCache;
  // }

  // // If a fetch is already in progress, wait for it to complete
  // if (fetchBillboardsInProgress) {
  //   return new Promise((resolve) => {
  //     const interval = setInterval(() => {
  //       if (!fetchBillboardsInProgress && billboardsCache) {
  //         clearInterval(interval);
  //         resolve(billboardsCache);
  //       }
  //     }, 100); // Poll every 100ms
  //   });
  // }

  // Fetch and cache the billboards
  // fetchBillboardsInProgress = true;
  try {
   const res = await fetchBillboards();
  return res;

} finally {
    // fetchBillboardsInProgress = false;
  }
}