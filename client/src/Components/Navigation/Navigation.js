import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home  from '../../Screens/Home/Home'
import UploadPark  from '../../Screens/UploadPark/UploadPark'
import Profile  from '../../Screens/Profile/Profile'
import ParkingSearch  from '../../Screens/ParkingSearch/ParkingSearch'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'Location'
    }
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
            name="Search" 
            component={ParkingSearch} 
            options={{
            tabBarLabel: 'Search',
          headerTitle: props => <Text>button</Text>,
          headerRight: () => (
                      <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                      />
                    ),
            tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
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