import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
})

class HostParkingSpotCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.onContentSizeChange = this.onContentSizeChange.bind(this)
    }
    onContentSizeChange(contentWidth, contentHeight) {
        // Save the content height in state
        this.setState({ screenHeight: contentHeight })
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        const { parkingSpot } = this.props.route.params
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={styles.sliderBoxContainer}>

                    </View>
                </ScrollView>
            </SafeAreaView>
    )
  }
}
export default HostParkingSpotCalendar
