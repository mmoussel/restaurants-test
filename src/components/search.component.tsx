import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

interface Props {
  value: string;
  onChangeText: (v: string) => void;
}

export const Search = ({ value, onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search .."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#848484'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    borderWidth: 1,
  },

  textInput: {
    color: '#000',
  },
});
