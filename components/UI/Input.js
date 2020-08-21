import React, { useReducer } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
  switch(action.type){
    case INPUT_CHANGE:
      return {
        value: action.value,
        isValid: action.isValid
      };
  };
};

const Input = ({id, label, errorMessage, initialValue, initialValidity}) => {
  const onChangeInput = (text) => {
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: true
    });
  };
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isValid: initialValidity
  });
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={inputState.value}
        onChangeText={onChangeInput}
      />
      {!inputState.isValid ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
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

export default Input;
