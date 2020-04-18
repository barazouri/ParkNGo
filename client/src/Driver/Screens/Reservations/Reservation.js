import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import * as Font from 'expo-font'
import { Card, Button } from 'react-native-elements' // 0.19.0
import { FontAwesome, Ionicons } from '@expo/vector-icons' // 6.2.2

// import { parkingSpots } from './data'
const userProfile = 'guygol@gmail.com'
const config = require('../../../../config/config')
const profile = 'guygol@gmail.com'
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

class Reservations extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reservations: []
    }
    this.handleCardPress = this.handleCardPress.bind(this)
    this.getParkingDetails = this.getParkingDetails(this)
  }
  componentDidMount () {
    let url = `${config.API}/getFutureReservationsForDriver?email=${userProfile}`
    // console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ reservations: json })
      })
      .catch(error => {
        console.error(error)
      })
  }
  getParkingDetails (parkingID) {
    let url = `${config.API}/getFutureReservationsForDriver?email=${userProfile}`
    console.log(parkingID)
    fetch(url)
      .then(response => response.json())
      .then(json => {
          console.log(json)
        this.setState({ reservations: json })
      })
      .catch(error => {
        console.error(error)
      })
  }
  handleCardPress () {
    // const { navigation } = this.props
    // let { forDate, untilDate } = this.props.route.params
    // navigation.navigate('ParkingSpotDetails', {
    //   parkingSpot: parkingSpot,
    //   forDate: forDate,
    //   untilDate: untilDate
    // })
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.reservations.map((reservation, index) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.handleCardPress(reservation)}
              key={index}
            >
              <Card>
                {/* <Text>{reservation.parkingSpotID}</Text> */}
                {() => this.getParkingDetails(reservation.parkingSpotID)}
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 25,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  From: {reservation.requireToDate}
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  To: {reservation.requireUntilDate} $
                </Text>

                {/* <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  Policy: {parkingSpot.policy}
                </Text> */}
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}
export default Reservations
