import React, { useLayoutEffect } from "react";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {navigation.navigate('Cart')}}
          />
        </HeaderButtons>
      ),
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

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onViewDetail={() =>
            navigation.navigate("ProductDetail", {
              productId: item.id,
              title: item.title,
            })
          }
          onAddToCart={() => dispatch(cartActions.addToCart(item))}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
