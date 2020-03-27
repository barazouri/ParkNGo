import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'; // 0.19.0

import { FontAwesome } from '@expo/vector-icons'; // 6.2.2

const parkingSpots = [
    {
        key: 1,
        parkingId: "3c",
        address: "Hoofien 7",
        policy: "easy",
        parkingSiae: "big",
        price: 20,
        windowsOfTime: [],
        availability: "yes",
        directions: "",
        uri: {uri: 'https://res.cloudinary.com/donglyhya/image/upload/v1516817597/campaign6_lfiwwo.jpg'},
    },
    {
        key: 2,
        parkingId: "3c",
        address: "Hoofien 7",
        policy: "easy",
        parkingSiae: "big",
        price: 20,
        windowsOfTime: [],
        availability: "yes",
        directions: "",
        uri: {uri: 'https://res.cloudinary.com/donglyhya/image/upload/v1516817597/campaign4_wlc7p1.jpg'},
    }

]
const images = [
  {
    key: 1,
    name: "Nathan Anderson",
    uri: {uri: 'https://res.cloudinary.com/donglyhya/image/upload/v1516817597/campaign1_byvldn.png'},
    url: "https://unsplash.com/photos/C9t94JC4_L8"
  },
  {
    key: 2,
    name: "Jamison McAndie",
    uri: {uri: 'https://res.cloudinary.com/donglyhya/image/upload/v1516817597/campaign2_hfbowa.png'},
    url: "https://unsplash.com/photos/waZEHLRP98s"
  },
  {
    key: 3,
    name: "Alberto Restifo",
    uri: {uri: 'https://res.cloudinary.com/donglyhya/image/upload/v1516817597/campaign3_utrh6j.jpg'},
    url: "https://unsplash.com/photos/cFplR9ZGnAk"
  },
  {
    key: 4,
    name: "John Towner",
    uri: {uri: 'https://res.cloudinary.com/donglyhya/image/upload/v1516817597/campaign4_wlc7p1.jpg'},
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  },
  {
    key: 5,
    name: "John Towner",
    uri: {uri: 'https://res.cloudinary.com/donglyhya/image/upload/v1516817882/campaign5_wudgxu.jpg'},
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  },
  {
    key: 6,
    name: "John Towner",
    uri: {uri: 'https://res.cloudinary.com/donglyhya/image/upload/v1516817597/campaign6_lfiwwo.jpg'},
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  },
];

class ParkingCardList extends Component {
    constructor(props){
        super(props)

    }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="user" size={24} color={tintColor} />
    ),
  };
 onPress = () => {
    console.log("hello")
    
}
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {parkingSpots.map(({ address, uri, windowsOfTime, price, key }) => (
            <TouchableOpacity style={{flex:1}} onPress={this.onPress}>
                <Card image={uri} key={key}>
                <Text style={{ marginBottom: 10 }}>
                    Adress: {name}.
                </Text>
                {/* <Button
                    buttonStyle={{backgroundColor: "#03A9F4"}}
                    text="View more"
                    onPress={() => Linking.openURL(url)}
                /> */}
                </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default ParkingCardList;