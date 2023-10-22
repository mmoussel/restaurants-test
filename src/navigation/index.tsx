import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens/home.screen';
import { RestaurantScreen } from '../screens/restaurant.screen';
import { RootStackParamList } from '../types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
        keyboardVerticalOffset={Platform.OS === 'ios' ? undefined : NaN} // to handle react navigation error on android, weird!
        style={styles.keyboardAvoidingView}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, orientation: 'portrait' }}
          initialRouteName={'Home'}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});
