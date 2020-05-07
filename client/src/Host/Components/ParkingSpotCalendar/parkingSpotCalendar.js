import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { Button } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons' // 6.2.2
import Icon from 'react-native-vector-icons/FontAwesome'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import SafeAreaView from 'react-native-safe-area-view'
import DateAndTimePicker from '../../../Driver/Components/SearchFrom/DateAndTimePicker'
import { Dropdown } from 'react-native-material-dropdown'

const config = require('../../../../config/config')
//until here

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  address: {
    fontSize: 30,
    alignSelf: 'center'
  },
  parkingData: {
    alignSelf: 'center'
  },
  line: {
    borderBottomColor: '#d2d4cf',
    borderBottomWidth: 1,
  },
  parkingDataTitle: {
    alignSelf: 'center',
    fontWeight: "bold"
  },
  MainContainer: {

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex:1,
    margin: 10
    
    },
    calendarWrapper: {
        position: 'relative',
        top: 20
    },
    automaticBtn: {
      textAlign: 'center',
      color:'white',
      alignSelf: 'center',
      width: 130

    },
    saveBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      // backgroundColor: 'green'
    },
    editSave: {
      fontSize: 45,
      color: "black",
    },
})

class HostParkingSpotCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      availabilFrom: [],
      availabilUntil: [],
      screenHeight: 0,
      calendarStatus: false,
      calendarText: 'Add available time',
      forDate: new Date(Date.now()),
      untilDate: undefined,
      parkingSpot: props.route.params.parkingSpot,

    }
    this.onContentSizeChange = this.onContentSizeChange.bind(this)
    this.loadCalendar = this.loadCalendar.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.getMarkAvailableDates = this.getMarkAvailableDates.bind(this)
    this.getMarkFutureDates = this.getMarkFutureDates.bind(this)
    this.getMarkWaitingDates = this.getMarkWaitingDates.bind(this)
    this.ShowHideCalendarComponentView = this.ShowHideCalendarComponentView.bind(this)
    this.OpenCloseCalendarComponentView = this.OpenCloseCalendarComponentView.bind(this)
    this.updateForDate = this.updateForDate.bind(this)
    this.updateUntilDate = this.updateUntilDate.bind(this)
    this.handlePressSave = this.handlePressSave.bind(this)
    this.getUrlForApi = this.getUrlForApi.bind(this)
    console.log("qqqqqqq")
    console.log(props.route.params.parkingSpot.windowsOfTime)
  }

  getUrlForApi(){
    return config.API + `/addwindowsOfTimeToParkingSpot`
  }
  updateForDate (date) {
    this.setState({ forDate: date })
  }

  updateUntilDate (date) {
    this.setState({ untilDate: date })
  }

  ShowHideCalendarComponentView = () =>{
 
    if(this.state.calendarStatus == true)
    {
      this.setState({calendarStatus: false})
      this.setState({calendarText: 'Add available time'})
    }
    else
    {
      this.setState({calendarStatus: true})
      this.setState({calendarText: 'Back'})
    }
  }

  OpenCloseCalendarComponentView = () =>{
 
    if(this.state.calendarStatus == true)
    {
      this.setState({calendarText: 'Add available time'})
    }
    else
    {
      this.setState({calendarText: 'Back'})
    }
  }

  onContentSizeChange(contentWidth, contentHeight) {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight })
  }

  componentDidMount () {
    const { parkingSpot } = this.props.route.params
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

  getMarkAvailableDates () {
    // const { parkingSpot } = this.props.route.params
    let dates = {}
    this.state.parkingSpot.windowsOfTime.map((window, index) => {
      dates[`${this.formatDate(window.AvailablefromTime)}`] = {
        startingDay: true,
        color: '#6abd8e',
        textColor: 'white',
        // opacity: 0.3
        //until here
      }
      dates[`${this.formatDate(window.AvailableUntilTime)}`] = {
        selected: true,
        endingDay: true,
        color: '#6abd8e',
        textColor: 'white'
      }
    })
    this.state.parkingSpot.futureReservations.map((future, index) => {
        dates[`${this.formatDate(future.requireToDate)}`] = {
          startingDay: true,
          color: '#e0705c',
          textColor: 'white'
        }
        dates[`${this.formatDate(future.requireUntilDate)}`] = {
          selected: true,
          endingDay: true,
          color: '#e0705c',
          textColor: 'white'
        }
      })
      this.state.parkingSpot.hostWaitingQueue.map((wait, index) => {
        dates[`${this.formatDate(wait.requireToDate)}`] = {
          startingDay: true,
          color: '#f0e68c',
          textColor: 'white'
        }
        dates[`${this.formatDate(wait.requireUntilDate)}`] = {
          selected: true,
          endingDay: true,
          color: '#f0e68c',
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

  handlePressSave() {
    this.ShowHideCalendarComponentView()
    const { parkingSpot } = this.props.route.params
    let urlAdd = this.getUrlForApi()
    console.log("Saved")

    console.log("fromDate " + this.state.forDate.toString())
    if(this.state.untilDate != undefined)
    {
        console.log(this.state.untilDate)
    }

    const AvailablefromTime = this.state.forDate
    const AvailableUntilTime = this.state.untilDate
    const isAutomatic = this.state.isAutomatic

    if(this.state.isAutomatic === true)
    {
      isAutomatic == true
    }
    const parkingId = parkingSpot.parkingId
    let url = `${urlAdd}`
    fetch(`${url}`, {
      method: 'POST',
      body: `parkingId=${parkingId}&isAutomatic=${isAutomatic}&AvailablefromTime=${AvailablefromTime}&AvailableUntilTime=${AvailableUntilTime}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .catch(err => new Error(err))
    this.setState({parkingSpot: parkingSpot})
  }

  render () {
    let automatic = [{
      label: "Yes",
      value: true,
    }, {
      label: "No",
      value: false,
    }]
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
        <Text style={styles.address}>{parkingSpot.address}</Text>
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 1,}}/>

          <View style={styles.line}/><View>
            <View style={styles.MainContainer}>
                {
                    // Pass any View or Component inside the curly bracket.
                    // Here the ? Question Mark represent the ternary operator.

                    this.state.calendarStatus ? <View><DateAndTimePicker updateDate={this.updateForDate} kind='Start Time'date={this.state.forDate}></DateAndTimePicker>
                                                <DateAndTimePicker updateDate={this.updateUntilDate} kind='End Time'/>
                                                <View style={styles.automaticBtn}>
                                                  <Dropdown
                                                  // textColor='pink'
                                                  // shadeOpacity='0.24'
                                                  // labelFontSize="25"
                                                    baseColor='black'
                                                    label='Is Automatic?'
                                                    data={automatic}
                                                    // value={this.state.isAutomatic}
                                                    onChangeText={value => this.setState({ isAutomatic: value })}
                                                  />
                                                </View>
                                                <View style={styles.saveBtn}>
                                                  <Button
                                                  type="clear"
                                                    icon={
                                                      <Icon name="save" style={styles.editSave}>
                                                        {/* <Text style={styles.ediText}>Save</Text> */}
                                                      </Icon>
                                                    }
                                                    onPress={() => this.handlePressSave()}
                                                  />
                                                </View>
                                                </View> : null
                  }
                  <Button
                  type="clear" 
                  title={this.state.calendarText} onPress={this.ShowHideCalendarComponentView} />
            </View>
            <View style={styles.line}/>

          <Text style={styles.parkingDataTitle}>Available Dates (green marked)</Text>
          <Text style={styles.parkingDataTitle}>Future Reservations (red marked)</Text>
          <Text style={styles.parkingDataTitle}>Waiting for Approval (yellow marked)</Text>
          <View style ={styles.calendarWrapper}>
            <CalendarList
            onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={0}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={24}
            // Enable or disable scrolling of calendar list
            scrollEnabled={true}
            // Enable or disable vertical scroll indicator. Default = false
            showScrollIndicator={true}
            onDayPress={(day) => {console.log('selected day', day)}}

            markedDates={
              this.getMarkAvailableDates()
            }
            markingType={'period'}
            />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default HostParkingSpotCalendar
