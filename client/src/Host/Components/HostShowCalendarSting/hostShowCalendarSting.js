import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons' // 6.2.2
import StarRating from 'react-native-star-rating'
import VerifyPopUp from '../VerifyPopUp/verifyPopUp'
import config from '../../../../config/config.json'

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        top: 30,
    },
    AvailabilityTitle: {
        fontSize: 25,
        textAlign: 'center',
        color: '#6abd8e',
    },
    futureTitle: {
        fontSize: 25,
        textAlign: 'center',
        color: '#e0705c'
    },
    waitingTitle: {
        fontSize: 25,
        textAlign: 'center',
        color: '#f0e68c'
    },
    pastTitle: {
        fontSize: 25,
        textAlign: 'center',
        color: '#03cffc'
    }
})

class HostShowCalendarSting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parkingSpot: props.route.params.parkingSpot,
            dataToShow: props.route.params.dataToShow,
            dialogVisibleAnswerParking: false,
            saveFeedBackVisible: false,
            setUser: {}
        }
        this.onContentSizeChange = this.onContentSizeChange.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.getUrlurlApproveOrDeclineForApi = this.getUrlurlApproveOrDeclineForApi.bind(this)
        this.saveFeedBack = this.saveFeedBack.bind(this)
        this.setUser = this.setUser.bind(this)
    }


    onContentSizeChange(contentWidth, contentHeight) {
        this.setState({ screenHeight: contentHeight })
    }

    closePopUp(childData, childDataAnswer) {
        const { navigation } = this.props

        this.setState({
            dialogVisibleAnswerParking: childData,
            saveFeedBackVisible: childData,
        })

        if (childDataAnswer) {
            console.log('aprroved the request')
            let urlApproveOrDecline = this.getUrlurlApproveOrDeclineForApi()
            console.log('urlApproveOrDecline: ', urlApproveOrDecline)

            console.log('this.state.setUser.requireToDate: ', this.state.setUser.requireToDate)
            let url = `${urlApproveOrDecline}`
            fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `email=${this.state.setUser.bookedBy}&parkingSpotID=${this.state.parkingSpot.parkingId}&hostID=${1}&requireToDate=${this.state.setUser.requireToDate}&requireUntilDate=${this.state.setUser.requireUntilDate}&answer=${true}` // <-- Post parameters
            })  //check in the driver order spot the isAutomatic condition... now its=TRUE and need to be change dinamically acording to windowsOfTime.isAutomatic
                .then(res => res.json())
                .catch(err => new Error(err))
            this.saveFeedBack()


            navigation.navigate('HostParkingSpotCalendar')
        }
        else {  // need to add like above but with answer=${false}
            console.log('NOT aprroved')
        }

    }

    saveFeedBack() {
        this.setState({ dialogVisibleAnswerParking: true });
    }

    getUrlurlApproveOrDeclineForApi() {
        return config.API + `/approveOrDeclineReq`
    }

    setUser(hostWaitingQueue) {
        this.setState({ setUser: hostWaitingQueue })
        console.log('setUser: ', this.state.setUser)
        this.saveFeedBack()
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        if (this.state.dataToShow === 'ShowAvailableDates') {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.scrollview}
                        scrollEnabled={scrollEnabled}
                        onContentSizeChange={this.onContentSizeChange}
                    >
                        <Text style={styles.AvailabilityTitle}>Available Dates</Text>
                        {this.state.parkingSpot.windowsOfTime.map((windowOfTime, i) => {
                            return (
                                <Card>
                                    {
                                        <View key={i} style={styles.user}>
                                            <Text style={styles.name}>Available from: {windowOfTime.AvailablefromTime}</Text>
                                            <Text style={styles.name}>Available until: {windowOfTime.AvailableUntilTime}</Text>
                                            <Text style={styles.name}>is automatic: {windowOfTime.isAutomatic.toString()}</Text>
                                        </View>
                                    }
                                </Card>
                            )
                        })}
                    </ScrollView>
                </SafeAreaView>
            )
        }
        if (this.state.dataToShow === 'ShowFutureReservationsDates') {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.scrollview}
                        scrollEnabled={scrollEnabled}
                        onContentSizeChange={this.onContentSizeChange}
                    >
                        <Text style={styles.futureTitle}>Future Reservations</Text>
                        {this.state.parkingSpot.futureReservations.map((futureReservation, i) => {
                            return (
                                <Card>
                                    {
                                        <View key={i} style={styles.user}>
                                            <Text style={styles.name}>Booked by: {futureReservation.bookedBy}</Text>
                                            <Text style={styles.name}>Booked to: {futureReservation.requireToDate}</Text>
                                            <Text style={styles.name}>Booked until: {futureReservation.requireUntilDate}</Text>
                                        </View>
                                    }
                                </Card>
                            )
                        })}
                    </ScrollView>
                </SafeAreaView>
            )
        }
        if (this.state.dataToShow === 'ShowWaitingQueueDates') {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.scrollview}
                        scrollEnabled={scrollEnabled}
                        onContentSizeChange={this.onContentSizeChange}
                    >
                        <Text style={styles.waitingTitle}>Waiting For Approval</Text>
                        {this.state.parkingSpot.hostWaitingQueue.map((hostWaitingQueue, i) => {
                            return (
                                <TouchableOpacity onPress={() => this.setUser(hostWaitingQueue)} style={{ left: 10 }}>
                                    <Card>
                                        {
                                            <View key={i} style={styles.user}>
                                                <Text style={styles.name}>Requested by: {hostWaitingQueue.bookedBy}</Text>
                                                <Text style={styles.name}>Require to: {hostWaitingQueue.requireToDate}</Text>
                                                <Text style={styles.name}>Require until: {hostWaitingQueue.requireUntilDate}</Text>
                                                <View style={styles.input}>
                                                    <VerifyPopUp dialogVisible={this.state.dialogVisibleAnswerParking} closePopUp={this.closePopUp} subject='Approve or Decline the Request' topTitle='Let the driver know your answer' />
                                                </View>
                                            </View>
                                        }
                                    </Card>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </SafeAreaView>
            )
        }
        if (this.state.dataToShow === 'ShowPastReservationsDates') {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.scrollview}
                        scrollEnabled={scrollEnabled}
                        onContentSizeChange={this.onContentSizeChange}
                    >
                        <Text style={styles.pastTitle}>Past Reservations</Text>
                        {this.state.parkingSpot.pastReservations.map((pastReservation, i) => {
                            return (
                                <Card>
                                    {
                                        <View key={i} style={styles.user}>
                                            <Text style={styles.name}>Booked by: {pastReservation.bookedBy}</Text>
                                            <Text style={styles.name}>Booked to: {pastReservation.fromoDate}</Text>
                                            <Text style={styles.name}>Booked until: {pastReservation.untilDate}</Text>
                                        </View>
                                    }
                                </Card>
                            )
                        })}
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
}
export default HostShowCalendarSting
