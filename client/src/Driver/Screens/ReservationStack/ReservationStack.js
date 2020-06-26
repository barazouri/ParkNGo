import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import Reservations from '../Reservations/Reservations'
import HeaderLogo from '../../../Components/HeaderLogo/HeaderLogo'
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import ParkingSpotDetails from '../ParkingSpotDetails/ParkingSpotDetails'
const logo = require('../../../../images/logo.png')

const styles = StyleSheet.create({})

class ReservationStack extends React.Component {
  constructor (props) {
    super(props)
  }
  LogoTitle () {
    return <Image style={{ width: 50, height: 50 }} source={logo} />
  }
  render () {
    const Stack = createStackNavigator()
    return (
      <View style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name='Reservations'
            component={Reservations}
            options={{
              title: 'Reservations',
              ...TransitionPresets.ModalSlideFromBottomIOS,
              headerBackground: () => <HeaderLogo />
            }}
          />
          <Stack.Screen
            name='ParkingSpotDetails'
            component={ParkingSpotDetails}
            options={{
              title: 'ParkingSpotDetails',
              ...TransitionPresets.ModalSlideFromBottomIOS,
              headerBackground: () => <HeaderLogo />
            }}
          />
        </Stack.Navigator>
      </View>
    )
  }
}
export default ReservationStack
