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
import { Card, Button } from 'react-native-elements' // 0.19.0
import { FontAwesome, Ionicons } from '@expo/vector-icons' // 6.2.2

const config = require('../../../../config/config')

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

class Listings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parkingSpots: []
    }
    this.handleCardPress = this.handleCardPress.bind(this)
  }
  getUrlForApi(){
    // let { address, forDate, untilDate, distance } = this.props.route.params
    let email = 'guygolpur@gmail.com'
    console.log(email)
      return config.API + `/getAllParkingSpotsByProfile?email=${email}`
  }
  componentDidMount () {
    const { route, navigation } = this.props
    let url = this.getUrlForApi()
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ parkingSpots: json })
      })
      .catch(error => {
        console.error(error)
      })
  }
  handleCardPress (parkingSpot) {
    const { navigation } = this.props
    navigation.navigate('HostParkingSpotDetails', {
      parkingSpot: parkingSpot
    })
    // console.log(parkingSpot)
  }
  render () {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.parkingSpots.map((parkingSpot, index) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.handleCardPress(parkingSpot)}
              key={index}
            >
              <Card>
                {parkingSpot.parkingPictures[0] && (
                  <Image
                    style={styles.image}
                    source={{ uri: parkingSpot.parkingPictures[0].imageUrl }}
                  ></Image>
                )}
                <View style={styles.rankContainer}>
                  <Text>{parkingSpot.totalRankParking}</Text>
                  <Ionicons
                    style={styles.iconStar}
                    name='ios-star'
                    color='black'
                    size={15}
                  />
                </View>
                <Text style={{ marginBottom: 10, fontSize: 25 }}>
                  Address: {parkingSpot.address}
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 20 }}>
                  Price: {parkingSpot.price} {'\u20AA/'}hour
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 20 }}>
                  Policy: {parkingSpot.policy}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}
export default Listings
