import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // headerRight: () => (
      //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //     <Item
      //       title="Cart"
      //       iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
      //       onPress={() => {navigation.navigate('Cart')}}
      //     />
      //   </HeaderButtons>
      // ),
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
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.userProducts);
  console.log(products, 'UserProductsScreen');
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={({ item }) => {
        console.log(item);
        return <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {}}
          ></Button>
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(deleteProduct(item.id))
            }}
          ></Button>
        </ProductItem>
      }}
    />
  );
};

export default UserProductsScreen;
