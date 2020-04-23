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
import { Ionicons } from '@expo/vector-icons' // 6.2.2

import { parkingSpots } from './data'
const userProfile = 'guygolpur@gmail.com'
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
    if (address && profile && price && forDate && untilDate) {
      console.log('all params')
      return (
        config.API +
        `/searchByLocationAndPriceAndSizeByTime?address=${address}&email=${profile}&fromPrice=${0}&toPrice=${price}&fromTime=${forDate.toString()}&untilTime=${untilDate.toString()}&email=${userProfile}`
      ) //need to be change
    } else if (!untilDate && price > 0) {
      console.log(untilDate)
      console.log(price)
      console.log('no untildate with price')
      return (
        config.API +
        `/searchParkingSpotByLocationAndPrice?address=${address}&fromPrice=${0}&toPrice=${price}`
      ) //need to be change
    } else {
      console.log('no distance no untilDate')
      return config.API + `/searchParkingSpotByLocation?address=${address}`
    }
  }
  componentDidMount () {
    let url = this.getUrlForApi()
    console.log(url)
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
    let { forDate, untilDate } = this.props.route.params
    navigation.navigate('ParkingSpotDetails', {
      parkingSpot: parkingSpot,
      forDate: forDate,
      untilDate: untilDate
    })
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {console.log(parkingSpots)}
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
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 25,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  Adress: {parkingSpot.address}
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
                  Price: {parkingSpot.price} $
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'Inter-SemiBoldItalic'
                  }}
                >
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
