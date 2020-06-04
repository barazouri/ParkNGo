import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons' // 6.2.2
import { Rating, AirbnbRating } from 'react-native-elements';




const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    reviewsContainer: {
        width: '100%',
        position: 'relative',
        height: '100%',
        fontSize: 10,
    },
    rankContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    rankTotal: {
        fontSize: 25,
        position: 'relative',
        left: 0,
        // top: 1
    },
    iconStar: {
        position: 'relative',
        // top: 10,
        fontSize: 30,
        color: '#ebd534'
    }
})

class HostParkingSpotReviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parkingSpot: props.route.params.parkingSpot

        }
        this.onContentSizeChange = this.onContentSizeChange.bind(this)
        // this.dateconvertor = this.dateconvertor.bind(this)
    }


    onContentSizeChange(contentWidth, contentHeight) {
        // Save the content height in state
        this.setState({ screenHeight: contentHeight })
    }

    // dateconvertor(dateString) {
    //     var d = new Date(dateString);
    //     return d
    // }

    render() {
        // let newDate = new Date
        const scrollEnabled = this.state.screenHeight > height;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={styles.rankContainer}>
                        <Text style={styles.rankTotal}>{this.state.parkingSpot.totalRankParking}</Text>
                        <Ionicons
                            style={styles.iconStar}
                            name='ios-star'
                            color='black'
                            size={15}
                        />

                    </View>
                    {this.state.parkingSpot.hostReviews.map((hostReview, i) => {
                        return (
                            <Card>
                                {

                                    <View key={i} style={styles.user}>
                                        <Text style={styles.name}>Review date: {hostReview.date}</Text>


                                        {/* <Text newDate={this.dateconvertor(hostReview.date)}
                                            style={{ textAlign: 'center', fontFamily: 'Inter-SemiBoldItalic' }}
                                        >{`Date: ${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`}</Text>
                                        <Text style={{ textAlign: 'center', fontFamily: 'Inter-SemiBoldItalic' }}>
                                            {`Time: ${newDate.getHours()}:${newDate.getMinutes()}`}{' '}
                                        </Text> */}

                                        <Text style={styles.name}>Review from: {hostReview.reviewFrom}</Text>
                                        <Text style={styles.name}>Rank: {hostReview.rank}</Text>
                                        <Text style={styles.name}>Review: {hostReview.review}</Text>


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
export default HostParkingSpotReviews
