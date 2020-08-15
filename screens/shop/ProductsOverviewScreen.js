import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  console.log("ProductsOverView", products);
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onViewDetail={() => navigation.navigate('ProductDetail', {productId: item.id, title: item.title})}
          onAddToCart={() => console.log("add to car")}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
