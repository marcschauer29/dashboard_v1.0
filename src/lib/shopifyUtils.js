import { getDocs, collection } from 'firebase/firestore';
import db from './firebaseConfig';

export async function fetchShopifyData() {
  try {
    // Fetch data from Firebase
    const ordersSnapshot = await getDocs(collection(db, 'orders'));
    const productsSnapshot = await getDocs(collection(db, 'products'));

    // Convert snapshots to arrays
    const orders = ordersSnapshot.docs.map((doc) => doc.data());
    const products = productsSnapshot.docs.map((doc) => doc.data());

    // Process the orders
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
    const totalOrders = orders.length;
    const totalProductsSold = orders.reduce((sum, order) => sum + order.line_items.length, 0);
    const averageOrderValue = totalRevenue / totalOrders;
    const inventoryValue = products.reduce(
      (sum, product) =>
        sum +
        product.variants.reduce((sum, variant) => sum + variant.inventory_quantity * variant.price, 0),
      0
    );

    // Return the processed data
    return {
      totalRevenue,
      totalOrders,
      totalProductsSold,
      averageOrderValue,
      inventoryValue,
    };
  } catch (error) {
    console.error('Failed to fetch data from Firebase:', error);
    throw error;
  }
}
