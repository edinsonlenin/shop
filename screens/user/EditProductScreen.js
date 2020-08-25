import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator, Text
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";

const FORM_INPUT_CHANGE = "FORM_INPUT_CHANGE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_CHANGE) {
    const validities = {
      ...state.inputValidities,
      [action.input]: action.validity,
    };
    let formValid = true;
    for (let key in validities) {
      formValid = formValid && validities[key];
    }
    return {
      ...state,
      isFormValid: formValid,
      inputValues: { ...state.inputValues, [action.input]: action.value },
      inputValidities: validities,
    };
  }
  return state;
};

const EditProductScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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
    isFormValid: selectedProduct ? true : false,
  });

  const onChangeInputHandler = useCallback(
    (input, text, isValid) => {
      formDispatch({
        type: FORM_INPUT_CHANGE,
        input: input,
        value: text,
        validity: isValid,
      });
    },
    [formDispatch]
  );

  const save = async () => {
    if (!formState.isFormValid) {
      Alert.alert("Error", "Invalid form entries", [{ text: "Ok" }]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try{

      if (productId) {
        await dispatch(
          productActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          productActions.addProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            +formState.inputValues.price
          )
        );
      }
      navigation.goBack();
    }
    catch(err){
      setError(err.message);
    }
    setIsLoading(false);
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

  useEffect(() => {
    if (error){
      Alert.alert('Message', error, [{text: 'Ok'}]);
    }
  }, [error]);

  if (isLoading) {
    return <View style={StyleSheet.centered}>
      <ActivityIndicator style={StyleSheet.text} size='large' color={Colors.primary} />
    </View>
  }

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100} style={{flex:1}}>
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorMessage="Title is required!" 
          initialValue={selectedProduct ? selectedProduct.title : ""}
          initialValidity={!!selectedProduct}
          onChangeInput={onChangeInputHandler}
          autoCapitalize="sentences"
          required
        />
        <Input
          id="imageUrl"
          label="Image"
          errorMessage="Image is required!"
          initialValue={selectedProduct ? selectedProduct.imageUrl : ""}
          initialValidity={!!selectedProduct}
          onChangeInput={onChangeInputHandler}
          required
        />
        {selectedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorMessage="Price is required!"
            initialValue={selectedProduct ? selectedProduct.price : ""}
            initialValidity={!!selectedProduct}
            onChangeInput={onChangeInputHandler}
            keyboardType="decimal-pad"
            required
          />
        )}
        <Input
          id="description"
          label="Description"
          errorMessage="Description is required!"
          initialValue={selectedProduct ? selectedProduct.description : ""}
          initialValidity={!!selectedProduct}
          onChangeInput={onChangeInputHandler}
          required
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center'
  }
});

export default EditProductScreen;
