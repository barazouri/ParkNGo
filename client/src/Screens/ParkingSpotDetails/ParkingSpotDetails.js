import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sliderBoxContainer: {
    height: 300
  }
})

class ParkingSpotDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree' // Network image
      ],
      rank: 10
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.sliderBoxContainer}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={300}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            dotColor='#FFEE58'
            inactiveDotColor='#90A4AE'
          />
          <Ionicons
            style={styles.iconClock}
            name='ios-star'
            color='black'
            size={40}
          />
          <Text>{this.state.rank}</Text>
        </View>
      </View>
    )
  }
}
export default ParkingSpotDetails
