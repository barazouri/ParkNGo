import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { Button } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons' // 6.2.2
import Icon from 'react-native-vector-icons/FontAwesome'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import SafeAreaView from 'react-native-safe-area-view'

const { height } = Dimensions.get('window');

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
      availabilFrom: [],
      availabilUntil: [],
      rank: 10,
      screenHeight: 0,
      check: '2020-04-04',
    }
    this.imageToArray = this.imageToArray.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleCardPress = this.handleCardPress.bind(this)
    this.onContentSizeChange = this.onContentSizeChange.bind(this)
    this.loadCalendar = this.loadCalendar.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.getMarkAvailableDates = this.getMarkAvailableDates.bind(this)
    this.getMarkFutureDates = this.getMarkFutureDates.bind(this)
    this.getMarkWaitingDates = this.getMarkWaitingDates.bind(this)

  }
  onContentSizeChange(contentWidth, contentHeight) {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight })
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
    const { parkingSpot } = this.props.route.params
    this.imageToArray()
    this.loadCalendar()
    console.log("from")
    console.log(this.state.availabilFrom)
    console.log("until")
    console.log(this.state.availabilUntil)
  }

  loadCalendar () {
    const { parkingSpot } = this.props.route.params
    parkingSpot.windowsOfTime.map(window => {
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
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  submitForm () {
    console.log('submited')
  }

  handleCardPress (parkingSpot) {
    const { navigation } = this.props
    navigation.navigate('HostEditParkingSpot', {
      parkingSpot: parkingSpot
    })
    // console.log(parkingSpot)
  }

  getMarkAvailableDates () {
    const { parkingSpot } = this.props.route.params
    let dates = {}
    parkingSpot.windowsOfTime.map((window, index) => {
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

  getMarkFutureDates () {
    const { parkingSpot } = this.props.route.params
    let dates = {}
    // console.log('helloi')
    parkingSpot.futureReservations.map((future, index) => {
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

  getMarkWaitingDates () {
    const { parkingSpot } = this.props.route.params
    let dates = {}
    parkingSpot.hostWaitingQueue.map((wait, index) => {
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

  render () {
    const scrollEnabled = this.state.screenHeight > height;
    const { parkingSpot } = this.props.route.params
    let tmp =''
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
          <View>

          <Text style={styles.parkingDataTitle}>Available Dates (green marked)</Text>
            <Calendar
            onDayPress={(day) => {console.log('selected day', day)}}

            markedDates={
              this.getMarkAvailableDates()
              // [`${tmp = this.formatDate(window.AvailablefromTime)}`]: {startingDay: true, color: 'green', textColor: 'white'},
              // [`${tmp = this.formatDate(window.AvailableUntilTime)}`]: {selected: true, endingDay: true, color: 'green', textColor: 'white'},
              // '2020-04-18': {marked: true},
              // '2020-04-19': {marked: true, dotColor: 'red'}
            }
            markingType={'period'}
            />

          <Text style={styles.parkingDataTitle}>Future Reservations (red marked)</Text>
            <Calendar
              onDayPress={(day) => {console.log('selected day', day)}}
              markedDates={
                this.getMarkFutureDates()
              }
              markingType={'period'}
            />

          <Text style={styles.parkingDataTitle}>Waiting for Approval (blue marked)</Text>
            <Calendar
            onDayPress={(day) => {console.log('selected day', day)}}

            markedDates={
              this.getMarkWaitingDates()
            }
            markingType={'period'}
            />
             {/** 15:08*/}
          </View>
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
</ScrollView>
      </SafeAreaView>
    )
  }
}
export default HostParkingSpotDetails
