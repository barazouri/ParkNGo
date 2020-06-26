import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import { Card } from 'react-native-elements' // 0.19.0
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
      }, console.log(this.state.reservations))
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
  getDate (date) {
    date = new Date(date)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  getTime (time) {
    time = new Date(time)
    return `${time.getHours()}:${time.getMinutes()}`
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
                {reservation.parkingPictures[0] && (
                  <Image
                    style={styles.image}
                    source={{ uri: reservation.parkingPictures[0].imageUrl }}
                  ></Image>
                )}
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 25,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  Address: {reservation.address}
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  Date: {this.getDate(reservation.requireToDate)} -{' '}
                  {this.getDate(reservation.requireUntilDate)}
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  Time: {this.getTime(reservation.requireToDate)} -
                  {this.getTime(reservation.requireUntilDate)}
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  Price: {reservation.price} $
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  Policy: {reservation.policy}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}
export default Reservations
