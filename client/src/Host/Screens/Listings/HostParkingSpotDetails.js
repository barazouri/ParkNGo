import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { Button } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons' // 6.2.2
import Icon from 'react-native-vector-icons/FontAwesome'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import SafeAreaView from 'react-native-safe-area-view'
import config from '../../../../config/config.json'
import VerifyPopUp from '../../Components/VerifyPopUp/verifyPopUp'

const io = require('socket.io-client')
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  sliderBoxContainer: {
    // height: 310,
  },
  btns: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  iconStar: {
    fontSize: 35,
    color: '#ebd534',
    position: 'absolute',
    alignSelf: 'center'
    // left: 2
  },
  rankTotal: {
    fontSize: 25,
    position: 'relative',
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
    borderBottomWidth: 1
  },
  parkingDataTitle: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  edit: {
    fontSize: 35,
    color: 'black'
  },
  ediText: {
    fontSize: 25
  },
  calendarBtn: {
    marginTop: 21,
    borderWidth: 1,
    width: 80,
    height: 60,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 5
  },
  calendarInner: {
    fontSize: 35
  },
  delete: {
    fontSize: 35
  }
})

class HostParkingSpotDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      parkingSpots: [],
      availabilFrom: [],
      availabilUntil: [],
      rank: 10,
      screenHeight: 0,
      check: '2020-04-04',
      parkingSpot: props.route.params.parkingSpot,
      plateNumber: null,
      dialogVisibleDeleteParking: false,
      saveFeedBackVisible: false,
    }
    this.imageToArray = this.imageToArray.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleReviewPress = this.handleReviewPress.bind(this)
    this.handleCardPress = this.handleCardPress.bind(this)
    this.handleCalendarPress = this.handleCalendarPress.bind(this)
    this.onContentSizeChange = this.onContentSizeChange.bind(this)
    this.loadCalendar = this.loadCalendar.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.getMarkAvailableDates = this.getMarkAvailableDates.bind(this)
    this.getMarkFutureDates = this.getMarkFutureDates.bind(this)
    this.getMarkWaitingDates = this.getMarkWaitingDates.bind(this)
    this.handleDeleteParkingSpot = this.handleDeleteParkingSpot.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.getUrlDeleteForApi = this.getUrlDeleteForApi.bind(this)
    this.handleAddImageBtn = this.handleAddImageBtn.bind(this)
  }
  onContentSizeChange(contentWidth, contentHeight) {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight })
  }

  imageToArray() {
    let images = []
    this.state.parkingSpot.parkingPictures.map(image => {
      images.push(image.imageUrl)
    })
    this.setState({ images: images })
  }

  componentDidMount() {
    const socket = io(config.ioServer, {
      transports: ['websocket'],
      forceNode: true
    })
    socket.on('parkingSpotAvailabilityChange', plateNumber => {
      let { parkingSpot } = this.state
      parkingSpot.availability = plateNumber
      console.log(plateNumber)
      this.setState({ parkingSpot: parkingSpot })
    })
    this.imageToArray()
    this.loadCalendar()
  }

  loadCalendar() {
    this.state.parkingSpot.windowsOfTime.map(window => {
      let parseDateFrom = this.formatDate(window.AvailablefromTime)
      this.state.availabilFrom.push(parseDateFrom)

      let parseDateUntil = this.formatDate(window.AvailableUntilTime)
      this.state.availabilUntil.push(parseDateUntil)
    })
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  submitForm() {
    console.log('submited')
  }

  handleCardPress(parkingSpot) {
    const { navigation } = this.props
    navigation.navigate('HostEditParkingSpot', {
      parkingSpot: parkingSpot
    })
    // console.log(parkingSpot)
  }

  handleCalendarPress(parkingSpot) {
    const { navigation } = this.props
    navigation.navigate('HostParkingSpotCalendar', {
      parkingSpot: parkingSpot
    })
    // console.log(parkingSpot)
  }

  handleAddImageBtn(parkingSpot) {
    console.log('add image')
    const { navigation } = this.props
    navigation.navigate('HostAddImageToParkingSpot', {
      parkingSpot: parkingSpot
    })
  }

  handleReviewPress() {
    const { navigation } = this.props
    navigation.navigate('HostParkingSpotReviews', {
      parkingSpot: this.state.parkingSpot
    })
  }

  getMarkAvailableDates() {
    let dates = {}
    this.state.parkingSpot.windowsOfTime.map((window, index) => {
      dates[`${this.formatDate(window.AvailablefromTime)}`] = {
        startingDay: true,
        color: 'green',
        textColor: 'white'
      }
      dates[`${this.formatDate(window.AvailableUntilTime)}`] = {
        selected: true,
        endingDay: true,
        color: 'green',
        textColor: 'white'
      }
    })
    console.log(dates)
    return dates
  }

  getMarkFutureDates() {
    let dates = {}
    // console.log('helloi')
    this.state.parkingSpot.futureReservations.map((future, index) => {
      dates[`${this.formatDate(future.requireToDate)}`] = {
        startingDay: true,
        color: 'red',
        textColor: 'white'
      }
      dates[`${this.formatDate(future.requireUntilDate)}`] = {
        selected: true,
        endingDay: true,
        color: 'red',
        textColor: 'white'
      }
    })
    console.log(dates)
    return dates
  }

  getMarkWaitingDates() {
    let dates = {}
    this.state.parkingSpot.hostWaitingQueue.map((wait, index) => {
      dates[`${this.formatDate(wait.requireToDate)}`] = {
        startingDay: true,
        color: 'blue',
        textColor: 'white'
      }
      dates[`${this.formatDate(wait.requireUntilDate)}`] = {
        selected: true,
        endingDay: true,
        color: 'blue',
        textColor: 'white'
      }
    })
    console.log(dates)
    return dates
  }

  handleDeleteParkingSpot(parkingSpotToDelete) {
    this.saveFeedBack()
  }

  closePopUp(childData, childDataAnswer) {
    const { navigation } = this.props

    this.setState({
      dialogVisibleDeleteParking: childData,
      saveFeedBackVisible: childData,
    })

    if (childDataAnswer) {
      console.log('aprroved to delete')
      let urldelete = this.getUrlDeleteForApi()
      console.log('Delete')


      let url = `${urldelete}`
      fetch(`${url}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .catch(err => new Error(err))
      this.saveFeedBack()


      navigation.navigate('Listings')
    }
    else {
      console.log('NOT aprroved to delte')
    }

  }

  getUrlDeleteForApi() {
    const { parkingSpot } = this.props.route.params

    const parkingId = parkingSpot.parkingId
    const profileId = 1

    return config.API + `/removeSpecificParkingSpot?profileId=${profileId}&parkingId=${parkingId}`
  }

  saveFeedBack() {
    this.setState({ dialogVisibleDeleteParking: true });
  }

  render() {
    const scrollEnabled = this.state.screenHeight > height
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollview}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.sliderBoxContainer}>
            <SliderBox
              images={this.state.images}
              sliderBoxHeight={300}
              dotColor='#FFEE58'
              inactiveDotColor='#90A4AE'
            />
            <Button
              icon={
                <Icon name='pencil' style={styles.edit}>
                  <Text style={styles.ediText}>Edit</Text>
                </Icon>
              }
              onPress={() => this.handleCardPress(this.state.parkingSpot)}
            />
          </View>
          <Text style={styles.address}>{this.state.address}</Text>
          <View style={styles.rankContainer}>
            <Text style={styles.rankTotal}>
              {this.state.parkingSpot.totalRankParking}
            </Text>
            <Ionicons
              style={styles.iconStar}
              name='ios-star'
              color='black'
              size={15}
            />
          </View>
          <View style={styles.btns}>
            <View style={styles.calendarBtn}>
              <Button
                type='clear'
                icon={
                  <Icon name='calendar' style={styles.calendarInner}>
                  </Icon>
                }
                onPress={() => this.handleCalendarPress(this.state.parkingSpot)}
              />
            </View>
            <View style={styles.calendarBtn}>
              <Button
                type='clear'
                icon={
                  <Icon name='image' style={styles.calendarInner}>
                  </Icon>
                }
                onPress={() => this.handleAddImageBtn(this.state.parkingSpot)}
              />
            </View>
          </View>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />

          <Text style={styles.parkingDataTitle}>Price:</Text>
          <Text
            style={styles.parkingData}
          >{`${this.state.parkingSpot.price} \u20AA/Hour`}</Text>
          <View style={styles.line} />

          <Text style={styles.parkingDataTitle}>Directions:</Text>
          <Text style={styles.parkingData}>
            {this.state.parkingSpot.directions}
          </Text>
          <View style={styles.line} />

          <Text style={styles.parkingDataTitle}>Policy:</Text>
          <Text style={styles.parkingData}>
            {this.state.parkingSpot.policy}
          </Text>
          <View style={styles.line} />

          <Text style={styles.parkingDataTitle}>Parking Spot Size:</Text>
          <Text style={styles.parkingData}>
            {this.state.parkingSpot.parkingSize}
          </Text>
          <View style={styles.line} />
          <Text style={styles.parkingDataTitle}>
            {this.state.parkingSpot.availability &&
              this.state.parkingSpot.availability.length > 0
              ? 'Occupied by: '
              : 'Is Available: '}
          </Text>
          <Text style={styles.parkingData}>
            {this.state.parkingSpot.availability.length > 0
              ? this.state.parkingSpot.availability
              : 'Yes'}
          </Text>
          {/* <Text>{this.state.plateNumber}</Text> */}
          <View style={styles.line} />

          <Button
            icon={
              <Icon name='trash' style={styles.delete}>
                <Text style={styles.ediText}>Delete</Text>
              </Icon>
            }
            onPress={() => this.handleDeleteParkingSpot(this.state.parkingSpot)}
          />
          <View style={styles.input}>
            <VerifyPopUp dialogVisible={this.state.dialogVisibleDeleteParking} closePopUp={this.closePopUp} subject='Are you sure you want to delete this parking spot?' topTitle='This parking spot will be deleted permanently' />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default HostParkingSpotDetails