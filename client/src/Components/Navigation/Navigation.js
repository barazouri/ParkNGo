import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home  from '../../Screens/Home/Home'
import UploadPark  from '../../Screens/UploadPark/UploadPark'
import Profile  from '../../Screens/Profile/Profile'
import ParkingResults  from '../../Screens/ParkingResults/ParkingResults'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 'Location'
    }
  }
  screenOptions = (route) => {

  }
  render() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen        
            // initialRouteName="Feed"
            name="Home"
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            }}
            component={Home} />
            <Tab.Screen 
            // initialRouteName="Feed"
            name="UploadPark" 
            component={ParkingResults} 
            options={{
            tabBarLabel: 'Upload',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="upload" color={color} size={size} />
            ),
            }}
            />
            <Tab.Screen 
            // initialRouteName="Feed"
            name="Profile" 
            component={Profile} 
            options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
            <Icon name="user-circle" size={30} color={color} />
            ),
            }}
            />
        </Tab.Navigator>
    );
  }
}


export default Navigation;