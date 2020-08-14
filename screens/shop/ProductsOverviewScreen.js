import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={(item) => <Text>{item.title}</Text>}
    />
  );
};

export default ProductsOverviewScreen;
