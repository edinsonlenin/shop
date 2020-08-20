import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreens from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ title: "All Products" }}
      name="ProductsOverview"
      component={ProductsOverviewScreens}
    />
    <Stack.Screen
      options={{ title: "Product Detail" }}
      name="ProductDetail"
      component={ProductDetailScreen}
    />
    <Stack.Screen
      options={{ title: "Shop Cart" }}
      name="Cart"
      component={CartScreen}
    />
  </Stack.Navigator>
);

const OrdersNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ title: "Your Orders" }}
      name="Orders"
      component={OrdersScreen}
    />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ title: "Your Products" }}
      name="UserProducts"
      component={UserProductsScreen}
    />
  </Stack.Navigator>
);

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: Colors.primary }}
    >
      <Drawer.Screen name="Products" component={ProductsNavigator} options={{
          drawerLabel: "All Products",
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}/>
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerLabel: "View Orders",
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <Drawer.Screen name="Admin" component={AdminNavigator} options={{
          drawerLabel: "Admin",
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}/>
    </Drawer.Navigator>
  );
};

const ShopNavigator = () => {
  return <NavigationContainer>{MyDrawer()}</NavigationContainer>;
};

export default ShopNavigator;
