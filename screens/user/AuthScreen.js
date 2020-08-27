import React, { useReducer, useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_SIGNUP = "FORM_SIGNUP";

const formReducer = (state, action) => {
  if (action.type === FORM_SIGNUP) {
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

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

  const onChangeInputHandler = useCallback(
    (input, text, isValid) => {
      formDispatch({
        type: FORM_SIGNUP,
        input: input,
        value: text,
        validity: isValid,
      });
    },
    [formDispatch]
  );

  const authHandler = async () => {
    let action;
    action = isSignUp
      ? authActions.signUp(
          formState.inputValues.email,
          formState.inputValues.password
        )
      : authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        );
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      return Alert.alert("Error", error, [{ text: "Ok" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address"
              onChangeInput={onChangeInputHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password"
              onChangeInput={onChangeInputHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator color={Colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "Switch to Login" : "Switch to Sign Up"}
                color={Colors.accent}
                onPress={() => setIsSignUp((prevSate) => !prevSate)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    height: "50%",
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
