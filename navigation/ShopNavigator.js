import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import ProductsOverviewScreens from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Cart, { CartScreen } from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
          },
          headerTintColor: Platform.OS === 'android' ? "white" : Colors.primary,
        }}
      >
        <Stack.Screen options={{title: 'All Products'}}
          name="ProductsOverview"
          component={ProductsOverviewScreens}
        />
        <Stack.Screen options={{title: 'Product Detail'}}
          name="ProductDetail"
          component={ProductDetailScreen}
        />
        <Stack.Screen options={{title: 'Shop Cart'}}
          name="Cart"
          component={CartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
