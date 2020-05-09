import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ParkingCardList from '../../Components/ParkingCardList/ParkingCardList'
import ParkingSpotDetails from '../ParkingSpotDetails/ParkingSpotDetails'
import SearchForm from '../../Components/SearchFrom/SearchForm'
import BookApproved from '../BookApprove/BookApprove'
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import HeaderLogo from '../../../Components/HeaderLogo/HeaderLogo'

const styles = StyleSheet.create({})

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
              ...TransitionPresets.ModalSlideFromBottomIOS,
              headerBackground: () => <HeaderLogo />
            }}
          />
          <Stack.Screen
            name='ParkingResults'
            component={ParkingCardList}
            options={{
              title: 'Parking Results',
              ...TransitionPresets.ModalSlideFromBottomIOS,
              headerBackground: () => <HeaderLogo />
            }}
          />
          <Stack.Screen
            name='ParkingSpotDetails'
            component={ParkingSpotDetails}
            options={{
              title: 'Parking Details',
              ...TransitionPresets.ModalSlideFromBottomIOS,
              headerBackground: () => <HeaderLogo />
            }}
          />
          <Stack.Screen
            name='BookApproved'
            component={BookApproved}
            options={{
              title: 'Book Status',
              ...TransitionPresets.ModalSlideFromBottomIOS,
              headerBackground: () => <HeaderLogo />
            }}
          />
        </Stack.Navigator>
      </View>
    )
  }
}
export default ParkingSearch
