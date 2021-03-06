import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { Button, ThemeConsumer } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const config = require('../../../../config/config.json')
const profile = 'guygol@gmail.com'
import { parkingSpots } from '../../Components/ParkingCardList/data'
import ExplanationPopUp from '../../../Host/Components/ExplanationPopUp/explanationPopUp'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20
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
    marginBottom: 10,
    fontFamily: 'Inter-SemiBoldItalic'
  },
  submitButton: {
    width: Dimensions.get('window').width,
    top: 20
  },
  directions: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'Inter-SemiBoldItalic'
  },
  price: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'Inter-SemiBoldItalic'
  },
  policy: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Inter-SemiBoldItalic'
  }
})

class ParkingSpotDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree' // Network image
      ],
      rank: 10,
      dialogVisible: false,
      isForBook: props.route.params.isForBook
    }
    this.imageToArray = this.imageToArray.bind(this)
    this.submitFormBook = this.submitFormBook.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.submitFormCancel = this.submitFormCancel.bind(this)
  }
  closePopUp(childData, childDataRedirect) {
    this.setState({
      dialogVisible: childData,
      saveFeedBackVisible: childData,
      redirect: childDataRedirect
    })
  }
  imageToArray() {
    const { parkingSpot } = this.props.route.params
    let images = []
    parkingSpot.parkingPictures.map(image => {
      images.push(image.imageUrl)
    })
    this.setState({ images: images })
  }
  componentDidMount() {
    this.imageToArray()
  }
  showDialog() {
    this.setState({ dialogVisible: true })
  }
  submitFormBook() {
    const { navigation } = this.props
    const { parkingSpot, forDate, untilDate } = this.props.route.params
    this.checkIfIsAutomaticByDates(parkingSpot, forDate, untilDate)
    let url = `${config.API}/bookParkingSpot`
    let isAutomatic = this.checkIfIsAutomaticByDates(parkingSpot, forDate, untilDate)
    
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      }),
      body: `email=${profile}&requireToDate=${forDate}&parkingSpotID=${parkingSpot.parkingId}&requireUntilDate=${untilDate}&isAutomatic=${isAutomatic}` // <-- Post parameters
    }).catch(error => {
      console.log(error)
    })
    navigation.navigate('BookApproved', {
      parkingSpot: parkingSpot,
      forDate: forDate,
      untilDate: untilDate,
      isAutomatic: isAutomatic
    })
  }
  submitFormCancel() {
    const { parkingSpot } = this.props.route.params

    console.log(parkingSpot)
  }

  checkIfIsAutomaticByDates (parkingspot, forDate, untilDate) {
    let isAuto = true
    parkingspot.windowsOfTime.map(time => {
      let AvailableUntilTime = new Date(time.AvailableUntilTime)
      let AvailablefromTime = new Date(time.AvailablefromTime)

      if ((AvailableUntilTime >= untilDate) && (AvailablefromTime <= forDate)) {
        isAuto = time.isAutomatic
      }
    })
    return isAuto
  }
  calculateTotalPrice() {
    const { forDate, untilDate, parkingSpot } = this.props.route.params
    return ((Math.abs(untilDate - forDate) / 36e5) * parkingSpot.price).toFixed(
      2
    )
  }
  render() {
    const { parkingSpot, forDate, untilDate } = this.props.route.params
    return (
      <View style={styles.container}>
        <View style={styles.sliderBoxContainer}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={300}
            dotColor='#FFEE58'
            inactiveDotColor='#90A4AE'
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.address}>{parkingSpot.address}</Text>
          <Text style={styles.directions}>{parkingSpot.directions}</Text>
          <Text style={styles.price}>{`${parkingSpot.price} \u20AA/Hour`}</Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={styles.policy}>{parkingSpot.policy}</Text>
            <TouchableOpacity onPress={this.showDialog} style={{ left: 10 }}>
              <AntDesign name='questioncircleo' size={24} color='black' />
            </TouchableOpacity>
          </View>
          <ExplanationPopUp
            dialogVisible={this.state.dialogVisible}
            closePopUp={this.closePopUp}
            subject='Policy'
            topTitle='Flexible:'
            topExplain='Full refund 1 day prior to arrival.'
            midTitle='Moderate:'
            midExplain='Full refund 5 days prior to arrival.'
            bottomTitle='Strict:'
            bottomExplain='No refunds for cancellations made within 7 days of check-in.'
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center'
            }}
          >
            <View style={{ margin: 20, alignItems: 'center' }}>
              <Text
                style={{ fontFamily: 'Inter-SemiBoldItalic' }}
              >{`Date: ${forDate.getDate()}/${forDate.getMonth() +
                1}/${forDate.getFullYear()}`}</Text>
              <Text style={{ fontFamily: 'Inter-SemiBoldItalic' }}>
                {`Time: ${forDate.getHours()}:${forDate.getMinutes()}`}{' '}
              </Text>
            </View>
            <MaterialCommunityIcons
              style={{ marginTop: 23 }}
              name='arrow-right'
              size={24}
              color='black'
            />
            <View style={{ margin: 20, alignItems: 'center' }}>
              <Text
                style={{ fontFamily: 'Inter-SemiBoldItalic' }}
              >{`Date: ${untilDate.getDate()}/${untilDate.getMonth() +
                1}/${untilDate.getFullYear()}`}</Text>
              <Text style={{ fontFamily: 'Inter-SemiBoldItalic' }}>
                {`Time: ${untilDate.getHours()}:${untilDate.getMinutes()}`}{' '}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Inter-SemiBoldItalic',
              fontSize: 20,
              textAlign: 'center',
              marginTop: 15
            }}
          >
            Total {this.calculateTotalPrice()} {'\u20AA'}
          </Text>
        </View>
        <Button
          title={this.state.isForBook ? 'Book' : 'Cancel'}
          style={styles.submitButton}
          color='#841584'
          onPress={
            this.state.isForBook ? this.submitFormBook : this.submitFormCancel
          }
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
    )
  }
}
export default ParkingSpotDetails
