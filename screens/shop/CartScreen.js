import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Button, Text, FlatList } from 'react-native';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const itemsTransformed = [];
    const items = state.cart.items;
    for (const key in items){
      itemsTransformed.push({
        productId: key,
        productTitle: items[key].productTitle,
        productPrice: items[key].productPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
      });
    }
    return itemsTransformed.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
  Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button 
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={()=> {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
           />
      </View>
      <View>
        <FlatList 
        keyExtractor={item => item.productId} 
        data={cartItems} 
        renderItem={({item}) => <CartItem quantity={item.quantity} 
                                          title={item.productTitle} 
                                          amount={item.sum} 
                                          deleteable
                                          onRemove={() => dispatch(cartActions.removeFromCart(item.productId))} />} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;