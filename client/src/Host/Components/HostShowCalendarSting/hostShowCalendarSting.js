import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons' // 6.2.2
import StarRating from 'react-native-star-rating'


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
            dataToShow: props.route.params.dataToShow

        }
        this.onContentSizeChange = this.onContentSizeChange.bind(this)
    }


    onContentSizeChange(contentWidth, contentHeight) {
        this.setState({ screenHeight: contentHeight })
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
                                <Card>
                                    {
                                        <View key={i} style={styles.user}>
                                            <Text style={styles.name}>Requested by: {hostWaitingQueue.bookedBy}</Text>
                                            <Text style={styles.name}>Require to: {hostWaitingQueue.requireToDate}</Text>
                                            <Text style={styles.name}>Require until: {hostWaitingQueue.requireUntilDate}</Text>
                                        </View>
                                    }
                                </Card>
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
