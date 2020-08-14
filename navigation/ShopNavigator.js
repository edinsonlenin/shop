import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import ProductsOverviewScreens from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constant/Colors";

const Stack = createStackNavigator();

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        options={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
          },
          headerTintColor: Platform.OS === 'android' ? "white" : Colors.primary,
        }}
      >
        <Stack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreens}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
