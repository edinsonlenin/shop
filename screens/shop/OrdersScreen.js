import React, { useLayoutEffect, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, FlatList, ActivityIndicator, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as actionOrders from '../../store/actions/orders';
import Colors from "../../constants/Colors";

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  
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

  const fetchOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(actionOrders.fetchOrders());
    setIsLoading(false);
  }

  useEffect(() => {
    fetchOrderHandler();
  }, [dispatch]);


  if(isLoading) {
    return (<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>)
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          items={item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
