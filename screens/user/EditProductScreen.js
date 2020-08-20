import React, { route } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";

const EditProductScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params ? 'Edit Product' : 'Add Product',
    //   headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="Cart"
    //         iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
    //         onPress={() => {
    //           navigation.navigate("Cart");
    //         }}
    //       />
    //     </HeaderButtons>
    //   ),
    //   headerLeft: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="Menu"
    //         iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //         onPress={() => {
    //           navigation.toggleDrawer();
    //         }}
    //       />
    //     </HeaderButtons>
    //   ),
    });
  }, [navigation]);

  let productId;
  console.log(route.params);
  if (route.params) {
   let { productId } = route.params;
  }
 console.log(productId, "productId");
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
});

export default EditProductScreen;
