import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Search } from 'src/components/search.component';

export const HomeScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <Search onChangeText={setSearch} value={search} />
    </View>
  );
};
