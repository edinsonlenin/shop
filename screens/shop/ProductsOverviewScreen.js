import React, { useEffect, useState } from "react";
import { FlatList, Platform, Button, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    alert('useLayoutEffect', 'ProductOverviewScreen');
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      ),
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
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    }
    catch(err){
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProducts);

    return unsubscribe;
  }, [dispatch]);

  if (isLoading) {
    return <View style={StyleSheet.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }

  if (!isLoading && products.length === 0) {
    return <View style={styles.centered}>
      <Text style={styles.text}>There is no products! Maybe you can create one!</Text>
    </View>
  }
  
  if (error) {
    return <View style={styles.centered}>
      <Text style={styles.text}>{error}</Text>
      <Button title='Try again' onPress={loadProducts} color={Colors.primary}  />
    </View>
  }


  const navigateToDetail = (productId, title) => {
    navigation.navigate("ProductDetail", {
      productId,
      title,
    })
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => navigateToDetail(item.id, item.title)}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => navigateToDetail(item.id, item.title)}
          ></Button>
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(cartActions.addToCart(item))}
          ></Button>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center'
  }
});

export default ProductsOverviewScreen;
