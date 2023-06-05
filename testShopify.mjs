import { fetchShopifyData } from "./src/lib/shopifyUtils";

// Define the start and end dates for the filter
const startDate = new Date("2023-05-13T16:09:54-04:00");
const endDate = new Date("2023-05-14T16:09:54-04:00");

// Fetch and process the Shopify data within the specified date range
const data = await fetchShopifyData(startDate, endDate);

// Print the processed data
console.log("Shopify data:", data);
