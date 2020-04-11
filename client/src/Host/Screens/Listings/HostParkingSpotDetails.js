import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { Button } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons' // 6.2.2
import Icon from 'react-native-vector-icons/FontAwesome';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  sliderBoxContainer: {
    height: 350,
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  iconStar: {
    fontSize: 35,
    color: '#ebd534',
    position: "absolute",
    // left: 2
  },
  rankTotal: {
    fontSize: 25,
    position: "relative",
    left: 15,
    top: 1
  },
  address: {
    fontSize: 30,
    alignSelf: 'center'
  },
  parkingData: {
    alignSelf: 'center'
  },
  submitButton: {
    width: Dimensions.get('window').width,
    top: 20 
  },
  line: {
    borderBottomColor: '#d2d4cf',
    borderBottomWidth: 1,
  },
  parkingDataTitle: {
    alignSelf: 'center',
    fontWeight: "bold"
  },
  edit: {
    fontSize: 35,
    color: "black",
  },
  ediText: {
    fontSize: 25,
  },
  delete: {
    fontSize: 35,

  },
})

class HostParkingSpotDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      images: [],
      parkingSpots: [],
      rank: 10
    }
    this.imageToArray = this.imageToArray.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleCardPress = this.handleCardPress.bind(this)
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
  handleCardPress (parkingSpot) {
    const { navigation } = this.props
    navigation.navigate('HostEditParkingSpot', {
      parkingSpot: parkingSpot
    })
    console.log(parkingSpot)
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
          <Button
            icon={
              <Icon
                name="pencil"
                style={styles.edit}
              >
              <Text style={styles.ediText}>Edit</Text>
              </Icon>
            }
            onPress={() => this.handleCardPress(parkingSpot)}
          />
          
        </View>
        
        <Text style={styles.address}>{parkingSpot.address}</Text>
        <View style={styles.rankContainer}>
            <Text style={styles.rankTotal}>{parkingSpot.totalRankParking}</Text>
            <Ionicons
              style={styles.iconStar}
              name='ios-star'
              color='black'
              size={15}
            />
          </View>
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 1,}}/>

        {/* <View style={styles.parkingData}> */}
          <Text style={styles.parkingDataTitle}>Price:</Text>
          <Text style={styles.parkingData}>{`${parkingSpot.price}$`}</Text>
          <View style={styles.line}/>

          <Text style={styles.parkingDataTitle}>Directions:</Text>
          <Text style={styles.parkingData}>{parkingSpot.directions}</Text>
          <View style={styles.line}/>

          <Text style={styles.parkingDataTitle}>Policy:</Text>
          <Text style={styles.parkingData}>{parkingSpot.policy}</Text>
          <View style={styles.line}/>

          <Text style={styles.parkingDataTitle}>Parking Spot Size:</Text>
          <Text style={styles.parkingData}>{parkingSpot.parkingSize}</Text>
          <View style={styles.line}/>

          <Text style={styles.parkingDataTitle}>Is Available?</Text>
          <Text style={styles.parkingData}>{parkingSpot.availability}</Text>
          <View style={styles.line}/>
          <Button
            icon={
              <Icon
                name="trash"
                style={styles.delete}
              >
              <Text style={styles.ediText}>Delete</Text>
              </Icon>
            }
            // onPress={() => this.handleCardPress(parkingSpot)}
          />

      </View>
    )
  }
}
export default HostParkingSpotDetails
