import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Reservations from '../Reservations/Reservations'
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'


const styles = StyleSheet.create({
})

class ReservationStack extends React.Component {
  constructor (props) {
    super(props)
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
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
        </Stack.Navigator>

      </View>
    )
  }
}
export default ReservationStack
