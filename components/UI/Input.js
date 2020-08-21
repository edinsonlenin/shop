import React, { useReducer, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch(action.type){
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
        isValid: action.isValid,
        value: action.value
      }
  };
};

const Input = (props) => {
  let {id, label, errorMessage, initialValue, initialValidity, onChangeInput, required} = props;

  const validate = (text) => {
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    return isValid;
  }

  const changeTextHandler = (text) => {
    let isValid = validate(text);
    console.log(required, isValid, id);
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid
    });
  };
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isValid: initialValidity,
    touched: false
  });

  console.log(inputState, id);

  const lostFocusHandler = () => {
    let isValid = validate(inputState.value);
    let value = inputState.value;
    dispatch({ type: INPUT_BLUR, isValid: isValid, value: value});
  }

  useEffect(() => {
      onChangeInput(id, inputState.value, inputState.isValid);
  }, [id, inputState, onChangeInput]);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={changeTextHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched ? (
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
