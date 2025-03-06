import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from "react-native";

import Home from "./screen/Home";
import SearchScreen from "./screen/SearchScreen";
import Profile from "./screen/Profile";
import Notifcation from "./screen/Notifcation";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#33143C',
          },
          tabBarShowLabel: false,
        }}
      >

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTitleStyle: {
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
            },
            headerTitleAlign: 'center',
            headerTitle: 'Search for City'
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconContainer: {
    width: 35,
    height: 35,
    backgroundColor: '#957DCD',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: '#fff'
  }
})
