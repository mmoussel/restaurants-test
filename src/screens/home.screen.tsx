import React, { useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {
  ListDataItem,
  RestaurantsList,
} from 'src/components/restaurants-list.component';
import { Search } from 'src/components/search.component';
import { Spacer } from 'src/components/spacer.component';
import { useRestaurantsQuery } from 'src/services/restaurants.services';
import { Restaurant } from 'src/types/restaurant.types';

type Section = { title: string; data: (Restaurant & { type: 'item' })[] };
type DataBySection = {
  costEffective: Section;
  bitPricer: Section;
  biSpender: Section;
};

export const HomeScreen = () => {
  const [search, setSearch] = useState('');

  const { data } = useRestaurantsQuery();

  const sortedData: ListDataItem[] = useMemo(() => {
    if (!data) {
      return [];
    }

    const filteredData = data.businesses.filter(item =>
      item.name.toLowerCase().includes(search.toLocaleLowerCase()),
    );

    const dataBySection: DataBySection = {
      costEffective: {
        title: 'Cost Effective',
        data: [],
      },
      bitPricer: {
        title: 'Bit Pricer',
        data: [],
      },
      biSpender: {
        title: 'Bi Spender',
        data: [],
      },
    };

    filteredData.forEach(item => {
      switch (item.price) {
        case '$':
          dataBySection.costEffective.data.push({ ...item, type: 'item' });
          break;
        case '$$':
          dataBySection.bitPricer.data.push({ ...item, type: 'item' });
          break;

        default:
          dataBySection.biSpender.data.push({ ...item, type: 'item' });
          break;
      }
    });

    const formattedData: any[] = Object.keys(dataBySection)
      .map(key => {
        const section = dataBySection[key as keyof DataBySection];
        if (section.data.length) {
          return [
            { type: 'sectionTitle', title: section.title },
            ...section.data,
          ];
        }

        return [];
      })
      .flat();

    return formattedData;
  }, [data, search]);

  if (!data) {
    return (
      <View
        style={{
          ...styles.container,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Restaurants</Text>
      <Spacer />

      <Search onChangeText={setSearch} value={search} />
      <Spacer />

      <RestaurantsList data={sortedData} numColumns={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
});
