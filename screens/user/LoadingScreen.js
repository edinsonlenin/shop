import React from "react";
import { View, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default LoadingScreen;
