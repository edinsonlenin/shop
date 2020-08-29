import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Platform, AsyncStorage, ActivityIndicator, View, Text } from "react-native";
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
      options={{ title: "Loading..." }}
      name="Loading"
      component={LoadingScreen}
    />
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem {...props}
        icon={({ focused, color, size }) => <Ionicons
        name={Platform.OS === "android" ? "md-exit" : "ios-exit"}
        size={30}
        color={Colors.primary}
      />}
        label={() => <Text style={{ fontFamily: 'open-sans-bold', fontSize: 18, color: Colors.primary }}>Logout</Text>}
        onPress={() => dispatch(authActions.logout())}
      />
    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: Colors.primary }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
      if (!auth) return;
      const authorization = JSON.parse(auth);
      const { token, userId, expirationDate } = authorization;
      if (token && userId && new Date(expirationDate) >= new Date()) {
        const expirationTime = new Date(expirationDate).getTime() - new Date().getTime();
        setToken(token);
        login(token, userId, expirationTime);
      }
    };
    setIsLoading(true);
    loadInfo();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setToken(auth.token);
  }, [auth.token]);

  // if (isLoading) {
  //   return LoadingScreen()
  // }

  if (isLoading) {
    return <NavigationContainer>{LoadingNavigator()}</NavigationContainer>;
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
    login: (token, userId, expirationTime) => dispatch(authActions.authenticate(token, userId, expirationTime)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopNavigator);

//export default ShopNavigator;
