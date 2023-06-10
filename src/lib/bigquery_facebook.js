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
    SELECT SUM(spend) AS Total_Spend_Last_7_Days
    FROM \`dashboard-389220.facebook_ads.basic_ad\`
    WHERE DATE(date) >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY);
  `;

  const options1 = {
    query: query1,
    location: 'EU',
  };

  const [rows1] = await bigqueryClient.query(options1);

  const query2 = `
    SELECT SUM(_1_d_view + _7_d_click) AS Total_Conversion_Value
    FROM \`dashboard-389220.facebook_ads.action_reactions_action_values\`
    WHERE action_type IN ('omni_purchase')  
    AND DATE(date) >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY);
  `;

  const options2 = {
    query: query2,
    location: 'EU',
  };

  const [rows2] = await bigqueryClient.query(options2);

  const query3 = `
  SELECT SUM(_1_d_view + _7_d_click) AS Total_Conversions
  FROM \`dashboard-389220.facebook_ads.action_reactions_actions\`
  WHERE action_type IN ('omni_purchase') 
  AND DATE(date) >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY);
  `;

  const options3 = {
    query: query3,
    location: 'EU',
  };

  const [rows3] = await bigqueryClient.query(options3);

  const totalSpend = rows1[0].Total_Spend_Last_7_Days;
  const totalConversionValue = rows2[0].Total_Conversion_Value;
  const totalConversions = rows3[0].Total_Conversions;

  const ROAS = totalConversionValue / totalSpend;

  const spend = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalSpend);
  const conversionValue = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalConversionValue);
  const roas = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(ROAS);

  console.log(`Total Spend and Conversion Value: ${spend}`);
  console.log(`Total Conversions: ${totalConversions}`);
  console.log(`ROAS: ${roas}x`);
}

query();
