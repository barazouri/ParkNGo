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

import { parkingSpots } from './data'
const config = require('../../../../config/config')
const profile = 'testguy@gmail.com'
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

class ParkingCardList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parkingSpots: []
    }
    this.handleCardPress = this.handleCardPress.bind(this)
  }
  getUrlForApi () {
    //this is without distance and without untilDate API need to be change
    let { address, forDate, untilDate, price } = this.props.route.params
    console.log(untilDate)
    if (!untilDate && price === 0) {
      console.log('no distance no untilDate')
      return config.API + `/searchParkingSpotByLocation?address=${address}`
    } else if (!untilDate && price > 0) {
      console.log(untilDate)
      console.log('no untildate with price')
      return (
        config.API +
        `/searchParkingSpotByLocationAndPrice?address=${address}&fromPrice=${0}&toPrice=${price}`
      ) //need to be change
    } else {
      console.log('all params')
      return (
        config.API +
        `/searchByLocationAndPriceAndSizeByTime?address=${address}&email=${profile}&fromPrice=${0}&toPrice=${price}&fromTime=${forDate.toString()}&untilTime=${untilDate.toString()}&email=guygolpur@gmail.com`
      ) //need to be change
    }
  }
  componentDidMount () {
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
    navigation.navigate('ParkingSpotDetails', {
      parkingSpot: parkingSpot
    })
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
                  Adress: {parkingSpot.address}
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 20 }}>
                  Price: {parkingSpot.price} $
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
export default ParkingCardList
