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

const keyExtractor = (item: Restaurant, index: number) => {
  return item?.id || index.toString();
};

const { width } = Dimensions.get('screen');

const defaultMargins = 0;

const towColItemWidth = (width * 49) / 100 - defaultMargins;

const RESTAURANT_HEIGHT = 100;

interface Props {
  data: Restaurant[];
  numColumns?: 1 | 2;
  onEndReached?: () => void;
  ListFooterComponent?: JSX.Element;
  ListHeaderComponent?: JSX.Element;
  contentContainerStyle?: StyleProp<ViewStyle>;
  listRef?: React.LegacyRef<FlatList<Restaurant>>;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  ListEmptyComponent?: JSX.Element;
}

export const RestaurantsList: FC<Props> = ({
  data,
  numColumns = 2,
  onEndReached = () => null,
  ListFooterComponent,
  ListHeaderComponent,
  contentContainerStyle,
  listRef,
  onScroll,
  ListEmptyComponent,
}) => {
  const isOneCol = numColumns === 1;

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

  const Item = memo(({ item }: { item: Restaurant }) => (
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
  ));

  const renderItem: ListRenderItem<Restaurant> = useCallback(
    props => <Item {...props} />,
    [numColumns],
  );

  return (
    <FlatList
      ref={listRef}
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
      onEndReached={onEndReached}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent || DefaultListEmptyComponent}
      contentContainerStyle={[styles.listContainer, contentContainerStyle]}
      onScroll={onScroll}
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
