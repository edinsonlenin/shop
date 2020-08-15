import React, { useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector } from 'react-redux';

const ProductDetailScreen = ({ navigation, route }) => {
    const { productId, title } = route.params;
    const product = useSelector(state => state.products.availableProducts.find(p => p.id === productId));

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: title });
      }, [navigation, route]);

    return <ScrollView>
        <Image style={styles.image} source={{uri: product.imageUrl}} />
        <Button title="Add to Cart" onPress={() => {}} />
    <Text>${product.price.toFixed(2)}</Text>
    <Text>{product.description}</Text>
    </ScrollView>
}; 

const styles = StyleSheet.create({
    image: {
        height: '60%',
        width: '100%'
    }
});

export default ProductDetailScreen;