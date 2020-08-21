import React from "react";
import { FlatList, Platform, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navigation.navigate("EditProduct");
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
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.userProducts);
  const onEditHandler = (id) =>
    navigation.navigate("EditProduct", { productId: id });
  const onDeleteHandler = (id) => {
    Alert.alert("Are you Sure?", "Your wish delete product?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={({ item }) => {
        return (
          <ProductItem
            image={item.imageUrl}
            title={item.title}
            price={item.price}
            onSelect={() => onEditHandler(item.id)}
          >
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => onEditHandler(item.id)}
            ></Button>
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {
                onDeleteHandler(item.id);
              }}
            ></Button>
          </ProductItem>
        );
      }}
    />
  );
};

export default UserProductsScreen;
