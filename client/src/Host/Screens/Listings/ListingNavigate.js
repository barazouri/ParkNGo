import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Listings from './Listings'
import HostParkingSpotDetails from './HostParkingSpotDetails'
import HostEditParkingSpot from './HostEditParkingSpot'
import HostParkingSpotCalendar from '../../Components/ParkingSpotCalendar/parkingSpotCalendar'
import HostParkingSpotReviews from '../../Components/ParkingSpotReviews/parkingSpotReviews'
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'


const styles = StyleSheet.create({
})

class ListingNavigate extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const Stack = createStackNavigator()
    return (
      <View style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name='Listings'
            component={Listings}
            options={{
              title: 'Listings',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
          <Stack.Screen
            name='HostParkingSpotDetails'
            component={HostParkingSpotDetails}
            options={{
              title: 'Parking Spot Details',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
         <Stack.Screen
            name='HostEditParkingSpot'
            component={HostEditParkingSpot}
            options={{
              title: 'Edit Parking Spot',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
          <Stack.Screen
            name='HostParkingSpotCalendar'
            component={HostParkingSpotCalendar}
            options={{
              title: 'Calendar',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
          <Stack.Screen
            name='HostParkingSpotReviews'
            component={HostParkingSpotReviews}
            options={{
              title: 'Reviews',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
        </Stack.Navigator>

      </View>
    )
  }
}
export default ListingNavigate
