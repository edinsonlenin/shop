import React, { route, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params ?? {};
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: productId ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={() => {}}
          />
        </HeaderButtons>
      ),
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
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput style={styles.input} value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}/>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} value={price}
            onChangeText={(text) => setPrice(text)}/>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description}
            onChangeText={(text) => setDescription(text)}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
