import { FC } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Restaurant } from 'src/types/restaurant.types';

interface Props {
  restaurant: Restaurant;
}

export const RestaurantCard: FC<Props> = ({ restaurant }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: restaurant.image_url }} />

      <View style={styles.overlay} />

      <View>
        <Text>{restaurant.name}</Text>
        <Text>{restaurant.rating}</Text>
        <Text>{restaurant.review_count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    resizeMode: 'cover',
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,.15)',
  },
});
