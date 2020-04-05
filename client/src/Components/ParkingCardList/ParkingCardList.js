import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'; // 0.19.0
import { FontAwesome } from '@expo/vector-icons'; // 6.2.2
import {parkingSpots} from './data'
const config =  require('../../../config/config')
class ParkingCardList extends Component {
    constructor(props){
        super(props)
        this.state = {
          parkingSpots: []
        }

    }
    componentDidMount(){
      const { route,navigation} = this.props
      const {address, forDate, untilDate, distance} = this.props.route.params
      console.log(address)
      console.log(forDate)
      console.log(untilDate)
      console.log(distance)
      let url = config.API + `/searchParkingSpotByLocation?address=${address}`
      //Hoofien 7
      console.log(url)
      // fetch("http://localhost:3000/searchParkingSpotByLocation?address=Hoofien 7").then((response) => response.json()).then((json) => {
      //   console.log(json)
      // })

      fetch(url)
    .then((response) => response.json())
    .then((json) => {
      this.setState({parkingSpots: json})
      console.log(parkingSpots)
    })
    .catch((error) => {
      console.error(error);
    });
      

    }
  render() {
    // console.log(this.props)
    // console.log(route)
    const { navigation} = this.props
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.parkingSpots.map(({ address, uri, windowsOfTime, price, policy, key }) => (
            <TouchableOpacity style={{flex:1}} onPress={() => {navigation.navigate('ParkingSpotDetails')}} key={key}>
                <Card image={{uri: uri}} >
                <Text style={{ marginBottom: 10 }}>
                    Adress: {address}
                </Text>
                <Text>
                price: {price} $
                </Text>
                <Text>
                policy: {policy} 
                </Text>
                </Card>
            </TouchableOpacity>
          ))
          }
        </ScrollView>
      </View>
    );
  }
}
export default ParkingCardList;

