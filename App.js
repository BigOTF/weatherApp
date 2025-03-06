import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from "react-native";

import Home from "./screen/Home";
import Search from "./screen/Search";
import Profile from "./screen/Profile";
import Notifcation from "./screen/Notifcation";

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#33143C',
          },
          tabBarShowLabel: false,
        }}
      >

        <Tab.Screen 
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name='home' size={24} color={color} />,
            tabBarActiveTintColor: '#fff',
            headerTitle: () => (
              <View style={styles.headerTitle}>

                <View style={styles.iconContainer}>
                  <Ionicons name="grid" size={16} color='#fff' />
                </View>
                
                <Text style={styles.headerText}>Home</Text>

                <View style={styles.iconContainer}>
                  <Ionicons name="refresh" size={23} color='#fff' style={{ transform: [{ rotate: '45deg' }] }} />
                </View>

              </View>
            ),
            
          }}
        />

        <Tab.Screen 
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name='search' size={24} color={color} />,
            tabBarActiveTintColor: '#fff'
          }}
        />
        <Tab.Screen 
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name='person-outline' size={24} color={color} />,
            tabBarActiveTintColor: '#fff'
          }}
        />
        <Tab.Screen 
          name="Notification"
          component={Notifcation}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name='notifications' size={24} color={color} />,
            tabBarActiveTintColor: '#fff'
          }}
        />


      </Tab.Navigator>
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
