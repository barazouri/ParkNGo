import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ParkingCardList from '../../Components/ParkingCardList/ParkingCardList'
import ParkingSpotDetails from '../ParkingSpotDetails/ParkingSpotDetails'
import SearchForm from '../../Components/SearchFrom/SearchForm'
import HostParkingSpotDetails from '../../../Host/Screens/Listings/HostParkingSpotDetails'
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'


const styles = StyleSheet.create({
})

class ParkingSearch extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const Stack = createStackNavigator()
    return (
      <View style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name='SearchForm'
            component={SearchForm}
            options={{
              title: 'Search',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
          <Stack.Screen
            name='ParkingResults'
            component={ParkingCardList}
            options={{
              title: 'Parking Results',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
          <Stack.Screen
            name='ParkingSpotDetails'
            component={ParkingSpotDetails}
            options={{
              title: 'Parking Details',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
          <Stack.Screen
            name='HostParkingSpotDetails'
            component={HostParkingSpotDetails}
            options={{
              title: 'Host Parking Details',
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
        </Stack.Navigator>

      </View>
    )
  }
}
export default ParkingSearch
