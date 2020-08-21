import React, { useState, useReducer } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Platform,
  Alert
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import Input from '../../components/UI/Input';
import * as productActions from "../../store/actions/products";

const FORM_INPUT_CHANGE = 'FORM_INPUT_CHANGE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_CHANGE) {
    const validities = { ...state.inputValidities, [action.input]: action.validity};
    let formValid = true;
    for (let key in validities) {
      formValid = formValid && validities[key];
    }
    return {...state,
      isFormValid: formValid,
      inputValues: { ...state.inputValues, [action.input]: action.value },
      inputValidities: validities,
    };
  }
  return state;
};

const EditProductScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { productId } = route.params ?? {};
  let selectedProduct;
  if (productId) {
    selectedProduct = useSelector((state) =>
      state.products.availableProducts.find(
        (product) => product.id === productId
      )
    );
  }
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: selectedProduct ? selectedProduct.title : "",
      imageUrl: selectedProduct ? selectedProduct.imageUrl : "",
      price: selectedProduct ? selectedProduct.price : "",
      description: selectedProduct ? selectedProduct.description : "",
    },
    inputValidities: {
      title: selectedProduct ? true : false,
      imageUrl: selectedProduct ? true : false,
      price: selectedProduct ? true : false,
      description: selectedProduct ? true : false,
    },
    isFormValid: selectedProduct ? true : false
  });

  const onChangeInput = (input, text) => {
    let isValid = true;
    if (text.trim().length === 0) {
      isValid = false;
    }
    formDispatch({
      type: FORM_INPUT_CHANGE,
      input: input,
      value: text,
      validity: isValid
    });
  };

  const save = () => {
    if (!formState.isFormValid){
      Alert.alert('Error', 'Invalid form entries', [{text: 'Ok'}])
      return;
    }
    if (productId) {
      dispatch(
        productActions.updateProduct(productId, formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description)
      );
    } else {
      dispatch(productActions.addProduct(formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description, +formState.inputValues.price));
    }
    navigation.goBack();
  };

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
          onPress={() => {
            save();
          }}
        />
      </HeaderButtons>
    ),
  });
  }, [navigation, formState, productId, dispatch]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id='title'
          label='Title'
          errorMessage='Title is required!'
          initialValue={selectedProduct ? selectedProduct.title : ''}
          initialValidity={selectedProduct ? true : false}
        />
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={onChangeInput.bind(this, 'title')}
            autoCapitalize='sentences'
            returnKeyType='next'
          />
          { !formState.inputValidities.title ? <Text style={{color: 'red'}}>*Field is required!</Text> : null }
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={onChangeInput.bind(this, 'imageUrl')}
          />
          { !formState.inputValidities.imageUrl ? <Text style={{color: 'red'}}>*Field is required!</Text> : null }
        </View>
        {selectedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
            onChangeText={onChangeInput.bind(this, 'price')}
              keyboardType='decimal-pad'
            />
          { !formState.inputValidities.price ? <Text style={{color: 'red'}}>*Field is required!</Text> : null }
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={onChangeInput.bind(this, 'description')}
          />
          { !formState.inputValidities.description ? <Text style={{color: 'red'}}>*Field is required!</Text> : null }

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
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 2,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
