import React, { FC, memo, useCallback } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Dimensions,
  ListRenderItem,
  Text,
} from 'react-native';

import { Restaurant } from 'src/types/restaurant.types';
import { RestaurantCard } from './restaurant-card.component';

const keyExtractor = (item: ListDataItem, index: number) => {
  return item.type === 'item' ? item?.id : index.toString();
};

const { width } = Dimensions.get('screen');

const defaultMargins = 0;

const towColItemWidth = (width * 49) / 100 - defaultMargins;

const RESTAURANT_HEIGHT = 100;

export type ListDataItem =
  | (Restaurant & { type: 'item' })
  | { type: 'sectionTitle'; title: string };

interface Props {
  data: ListDataItem[];
  numColumns?: 1 | 2;
  contentContainerStyle?: StyleProp<ViewStyle>;
  ListEmptyComponent?: JSX.Element;
}

export const RestaurantsList: FC<Props> = ({
  data,
  numColumns = 2,
  contentContainerStyle,
  ListEmptyComponent,
}) => {
  const DefaultListEmptyComponent = (
    <View style={styles.emptyList}>
      <Text>No Restaurants found</Text>
    </View>
  );

  const getItemLayout = (_: unknown, index: number) => ({
    length: RESTAURANT_HEIGHT,
    offset: RESTAURANT_HEIGHT * index,
    index,
  });

  const Item = memo(({ item }: { item: ListDataItem }) => {
    return item.type === 'item' ? (
      <View
        style={[
          styles.restaurantContainer,
          { height: RESTAURANT_HEIGHT },
          numColumns && numColumns > 1
            ? styles.twoColumnsRestaurantContainer
            : null,
        ]}>
        <RestaurantCard restaurant={item} />
      </View>
    ) : (
      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 24, color: '#000' }}>{item.title}</Text>
      </View>
    );
  });

  const renderItem: ListRenderItem<ListDataItem> = useCallback(
    props => <Item {...props} />,
    [numColumns],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      keyExtractor={keyExtractor}
      key={numColumns?.toString()}
      numColumns={numColumns}
      ItemSeparatorComponent={() => <View style={{ marginVertical: 16 }} />}
      columnWrapperStyle={
        numColumns && numColumns > 1 ? styles.columnWrapperStyle : null
      }
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.9}
      ListEmptyComponent={ListEmptyComponent || DefaultListEmptyComponent}
      contentContainerStyle={[styles.listContainer, contentContainerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: { flexGrow: 1 },
  restaurantContainer: {
    flex: 1,
  },
  twoColumnsRestaurantContainer: {
    maxWidth: towColItemWidth,
    flex: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  emptyList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
