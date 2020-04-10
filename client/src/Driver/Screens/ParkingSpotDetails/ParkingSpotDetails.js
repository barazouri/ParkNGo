import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { Button } from 'react-native-elements'

import { parkingSpots } from '../../Components/ParkingCardList/data'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  sliderBoxContainer: {
    height: 300
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  iconStar: {
    fontSize: 15
  },
  address: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom:10,
    fontFamily: 'Inter-SemiBoldItalic'

  },
  submitButton: {
    width: Dimensions.get('window').width,
    top: 20
  },
  directions: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom:10,
    fontFamily: 'Inter-SemiBoldItalic'


  },
  price: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom:10,
    fontFamily: 'Inter-SemiBoldItalic'


  },
  policy: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Inter-SemiBoldItalic'

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
    this.imageToArray = this.imageToArray.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  imageToArray () {
    const { parkingSpot } = this.props.route.params
    let images = []
    parkingSpot.parkingPictures.map(image => {
      images.push(image.imageUrl)
    })
    this.setState({ images: images })
  }
  componentDidMount () {
    this.imageToArray()
  }
  submitForm () {
    console.log('submited')
  }
  render () {
    const { parkingSpot } = this.props.route.params
    return (
      <View style={styles.container}>
        <View style={styles.sliderBoxContainer}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={300}
            dotColor='#FFEE58'
            inactiveDotColor='#90A4AE'
          />
          {/* <View style={styles.rankContainer}>
          <Ionicons
            style={styles.iconStar}
            name='ios-star'
            color='black'
            // size={15}
          />
          <Text>{parkingSpot.totalRankParking}</Text>
          </View> */}
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.address}>{parkingSpot.address}</Text>
        <Text style={styles.directions}>{parkingSpot.directions}</Text>
        <Text style={styles.price}>{`${parkingSpot.price}$`}</Text>
        <Text style={styles.policy}>{parkingSpot.policy}</Text>
        </View>
        <Button
          title='Book'
          style={styles.submitButton}
          color='#841584'
          onPress={this.submitForm}
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
    )
  }
}
export default ParkingSpotDetails
