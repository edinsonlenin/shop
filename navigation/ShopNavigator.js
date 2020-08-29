import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, AsyncStorage, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreens from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import LoadingScreen from "../screens/user/LoadingScreen";
import * as authActions from "../store/actions/auth";

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
    <Stack.Screen
      options={{ title: "Edit Product" }}
      name="EditProduct"
      component={EditProductScreen}
    />
  </Stack.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ title: "Authorization" }}
      name="Auth"
      component={AuthScreen}
    />
  </Stack.Navigator>
);

const LoadingNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ title: "Shop" }}
      name="Loading"
      component={LoadingScreen}
    />
  </Stack.Navigator>
);

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: Colors.primary }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerLabel: "All Products",
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
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
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerLabel: "Admin",
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const ShopNavigator = ({ auth, login }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInfo = async () => {
      const auth = await AsyncStorage.getItem("auth");
      console.log(auth, "loadinfo");
      let token, userId, expirationDate, authorization;
      if (auth) {
        authorization = JSON.parse(auth);
        console.log(authorization);
        token = authorization.token;
        userId = authorization.userId;
        expirationDate = new Date(authorization.expirationDate);

        if (token && userId && expirationDate >= new Date()) {
          setToken(token);
          login(token, userId);
        }
      }
    };
    setIsLoading(true);
    loadInfo();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setToken(auth.token);
  }, [auth.token]);

  if (isLoading) {
    return LoadingScreen()
      // <NavigationContainer>
      //   { LoadingNavigator() }
      // </NavigationContainer>
  }

  return (
    <NavigationContainer>
      {!token ? AuthNavigator() : MyDrawer()}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token, userId) => dispatch(authActions.authenticate(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopNavigator);

//export default ShopNavigator;
