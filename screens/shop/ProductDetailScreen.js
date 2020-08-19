import React, { useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as cartActions from '../../store/actions/cart';
import Colors from "../../constants/Colors";

const ProductDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { productId, title } = route.params;
  const product = useSelector((state) =>
    state.products.availableProducts.find((p) => p.id === productId)
  );

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: title });
  }, [navigation, route]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
      <Button color={Colors.primary} title="Add to Cart" onPress={() => dispatch(cartActions.addToCart(product))} />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }

});

export default ProductDetailScreen;
