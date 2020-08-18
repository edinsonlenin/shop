import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Colors from "../../constants/Colors";

const ProductItem = ({ image, title, price, onViewDetail, onAddToCart }) => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }
  return (
    <TouchableCmp onPress={onViewDetail} useForeground>
    <View style={styles.product}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detail}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={onViewDetail}
        ></Button>
        <Button
          color={Colors.primary}
          title="To Cart"
          onPress={onAddToCart}
        ></Button>
      </View>
    </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  product: {
      flex: 1,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  image: {
    height: '60%',
    width: "100%",

  },
  detail: { alignItems: "center", height: '15%', padding: 10 },
  title: {
    fontSize: 16,
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 15,
  },
});

export default ProductItem;
