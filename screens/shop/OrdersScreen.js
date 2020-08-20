import React, { useLayoutEffect } from "react";
import { Platform, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const orders = useSelector((state) => state.orders.orders);
  console.log(orders, "ordersscreen");
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <OrderItem amount={item.totalAmount} date={item.readableDate} items={item.items}/>}
    />
  );
};

export default OrdersScreen;
