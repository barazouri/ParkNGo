import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'; // 0.19.0
import { FontAwesome } from '@expo/vector-icons'; // 6.2.2
import {parkingSpots} from './data'

class ParkingCardList extends Component {
    constructor(props){
        super(props)

    }

  render() {
    // console.log(this.props)
    const { route,navigation } = this.props
    console.log(route)
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {parkingSpots.map(({ address, uri, windowsOfTime, price, key }) => (
            <TouchableOpacity style={{flex:1}} onPress={() => {navigation.navigate('ParkingSpotDetails')}} key={key}>
                <Card image={uri} >
                <Text style={{ marginBottom: 10 }}>
                    Adress: {address}.
                </Text>
                </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default ParkingCardList;

