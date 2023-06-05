import React, { useEffect, useState } from 'react';
import { Box, Text, useColorModeValue, Flex, Badge } from '@chakra-ui/react';

// Adjust the path based on your project structure
import { fetchShopifyData } from '../../lib/shopifyUtils';

type Stat = {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
};

const StatsComponent: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopifyData = await fetchShopifyData();
        const formattedShopifyData = {
          totalRevenue: shopifyData.totalRevenue.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }),
          totalOrders: shopifyData.totalOrders.toLocaleString(),
          totalProductsSold: shopifyData.totalProductsSold.toLocaleString(),
          averageOrderValue: shopifyData.averageOrderValue.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }),
        };
        const mappedStats: Stat[] = [
          { name: 'Bruttoumsatz', value: formattedShopifyData.totalRevenue, change: '+4.75%', changeType: 'positive' },
          { name: 'Bestellungen', value: formattedShopifyData.totalOrders, change: '+54.02%', changeType: 'negative' },
          { name: 'Verkaufte Produkte', value: formattedShopifyData.totalProductsSold, change: '-1.39%', changeType: 'positive' },
          { name: 'AOV', value: formattedShopifyData.averageOrderValue, change: '+10.18%', changeType: 'negative' },
        ];
        setStats(mappedStats);
      } catch (error) {
        console.error('Failed to fetch Shopify data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      p={5}
      backgroundColor={bg}
      borderRadius="md"
      boxShadow="base"
      width="100%"
      maxWidth="800px"
      margin="0 auto"
    >
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        {stats.map((stat) => (
          <Box key={stat.name} flex="1 0 50%" mb={4}>
            <Text fontSize="sm" color="gray.500" mb={1}>
              {stat.name}
            </Text>
            <Flex alignItems="baseline" mb={2}>
              <Text fontSize="2xl" fontWeight="bold" color={textColor} mr={2}>
                {stat.value}
              </Text>
              <Badge
                borderRadius="full"
                px={2}
                py={1}
                colorScheme={stat.changeType === 'positive' ? 'green' : 'red'}
                alignSelf="center"
              >
                {stat.change}
              </Badge>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default StatsComponent;
