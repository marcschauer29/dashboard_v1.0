const {BigQuery} = require('@google-cloud/bigquery');
const path = require('path');
const credentials = require(path.join(__dirname, 'bigqueryCredentials.json'));

async function query() {
  const bigqueryClient = new BigQuery({
    projectId: credentials.project_id,
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/g, '\n'),
    },
  });

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 90);

  console.log(`Date Range: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);

  const query1 = `
    SELECT SUM(total_price) AS Total_Sales_Revenue, COUNT(*) AS Total_Orders
    FROM \`dashboard-389220.shopify.order\`
    WHERE DATE(created_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY);
  `;

  const options1 = {
    query: query1,
    location: 'EU',
  };

  const [rows1] = await bigqueryClient.query(options1);

  const totalSalesRevenue = rows1[0].Total_Sales_Revenue;
  const totalOrders = rows1[0].Total_Orders;

  const AOV = totalSalesRevenue / totalOrders;

  const revenue = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalSalesRevenue);
  const orders = new Intl.NumberFormat('de-DE').format(totalOrders);
  const aov = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(AOV);

  console.log(`Total Sales Revenue: ${revenue}`);
  console.log(`Total Orders: ${orders}`);
  console.log(`Average Order Value: ${aov}`);
}

query();
