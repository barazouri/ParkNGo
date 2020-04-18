import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../Screens/Home/Home'
import ListingsNavigate from '../../../Host/Screens/Listings/ListingNavigate'
import Profile from '../../Screens/Profile/Profile'
import ParkingSearch from '../../Screens/ParkingSearch/ParkingSearch'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome'

class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      kindUser: 'driver'
    }
    this.changeKindUser = this.changeKindUser.bind(this)
    this.hostNavigation = this.hostNavigation.bind(this)
    this.driverNavigation = this.driverNavigation.bind(this)
  }
  changeKindUser (kindUser) {
      this.setState({ kindUser: kindUser }, 
        console.log(this.state.kindUser)
        )
  }
  hostNavigation (Tab) {
    return (
      <Tab.Screen
        // initialRouteName="Feed"
        name='Upload'
        component={ListingsNavigate}
        options={{
          tabBarLabel: 'Upload',
          // headerRight: () => (
          //   <Button
          //     onPress={() => alert('This is a button!')}
          //     title='Info'
          //     color='#fff'
          //   />
          // ),
          tabBarIcon: ({ color, size }) => (
            <Icon name='upload' color={color} size={size} />
          )
        }}
      />
    )
  }
  driverNavigation (Tab) {
    return (
      <Tab.Screen
        // initialRouteName="Feed"
        name='Search'
        component={ParkingSearch}
        options={{
          tabBarLabel: 'Search',
          // headerRight: () => (
          //   <Button
          //     onPress={() => alert('This is a button!')}
          //     title='Info'
          //     color='#fff'
          //   />
          // ),
          tabBarIcon: ({ color, size }) => (
            <Icon name='search' color={color} size={size} />
          )
        }}
      />
    )
  }
  render () {
    const Tab = createBottomTabNavigator()
    return (
      <Tab.Navigator>
        <Tab.Screen
          // initialRouteName="Feed"
          name='Home'
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={size} />
            )
          }}
          component={Home}
        />
        {this.state.kindUser === 'driver'
          ? this.driverNavigation(Tab)
          : this.hostNavigation(Tab)}
        <Tab.Screen
          // initialRouteName="Feed"
          name='Profile'
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name='user-circle' size={30} color={color} />
            )
          }}
          initialParams={{
            changeKindUser: this.changeKindUser,
            kindUser: this.state.kindUser
          }}
        />
      </Tab.Navigator>
    )
  }
}

export default Navigation
