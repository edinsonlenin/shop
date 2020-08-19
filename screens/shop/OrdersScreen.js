import React, { useLayoutEffect } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {navigation.toggleDrawer();}}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const orders = useSelector(state => state.orders.orders);
  console.log(orders, 'ordersscreen');
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={orders}
      renderItem={({item}) => {
      <Text>{item.totalAmount}</Text>
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    
  }
});

export default OrdersScreen;