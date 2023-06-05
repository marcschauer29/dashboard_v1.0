require = require('esm')(module);

const { fetchShopifyData } = require('./shopifyUtils.js');

// Fetch and process the Shopify data
fetchShopifyData()
  .then((data) => {
    console.log('Shopify data:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
