import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { Button } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome'
import SafeAreaView from 'react-native-safe-area-view'
import DateAndTimePicker from '../../../Driver/Components/SearchFrom/DateAndTimePicker'
import { Dropdown } from 'react-native-material-dropdown'
import { Input } from 'react-native-elements'
import FeedBack from '../../Components/FeedBack/feedBack'


const config = require('../../../../config/config')

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        marginTop: 20
    },
    address: {
        fontSize: 30,
        alignSelf: 'center'
    },
    parkingData: {
        alignSelf: 'center'
    },
    instructions: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    inputDirections: {
        margin: 30,
        width: 220,
        alignSelf: 'center'
    },
    input: {
        margin: 10,
        width: 200,
        alignSelf: 'center'
    },
})

class HostAddImageToParkingSpot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parkingSpot: props.route.params.parkingSpot,
            imageUrl: '',
            saveFeedBackVisible: false,

        }
        this.onContentSizeChange = this.onContentSizeChange.bind(this)
        this.handlePressSave = this.handlePressSave.bind(this)
        this.getUrlAddImageForApi = this.getUrlAddImageForApi.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
    }

    onContentSizeChange(contentWidth, contentHeight) {/////
        this.setState({ screenHeight: contentHeight })
    }

    componentDidMount() {
    }

    handlePressSave() {
        const { parkingSpot } = this.props.route.params
        let urlAdd = this.getUrlAddImageForApi()
        console.log('Add Image Save')
        if (this.state.imageUrl.length == 0) {
            console.log('empty url')
        }
        else {
            console.log('continue')

            const parkingId = parkingSpot.parkingId
            const profileId = 1
            const imageUrl = this.state.imageUrl

            let url = `${urlAdd}`
            fetch(`${url}`, {
                method: 'POST',
                body: `parkingId=${parkingId}&profileId=${profileId}&imageUrl=${imageUrl}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => res.json())
                .catch(err => new Error(err))
                this.saveFeedBack()
        }
    }

    closePopUp(childData, childDataRedirect) {
        const { navigation } = this.props
    
        this.setState({
          dialogVisible: childData,
          saveFeedBackVisible: childData,
        })
    
        if (childDataRedirect) {
          navigation.navigate('Listings')
        }
    
      }

      saveFeedBack() {
        this.setState({ saveFeedBackVisible: true });
      }

    getUrlAddImageForApi() {
        return config.API + `/addPictureToParking`
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
                    <Text style={styles.address}>{this.state.parkingSpot.address}</Text>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />

                    <View>
                        <Text style={styles.instructions}>Please Enter Image URL</Text>
                        <Input
                            containerStyle={styles.inputDirections}
                            placeholder='Image URL'
                            value={this.state.imageUrl}
                            onChangeText={imageUrl => this.setState({ imageUrl })}
                        />
                        <View style={styles.input}>
                            <Button
                                title='Upload'
                                style={{ width: Dimensions.get('window').width }}
                                color='#841584'
                                onPress={() => this.handlePressSave()}
                            />
                            <View style={styles.input}>
                                <FeedBack dialogVisible={this.state.saveFeedBackVisible} closePopUp={this.closePopUp} subject='Uploaded Successfully!' topTitle='The Image have been added to your parking spot Successfully' />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default HostAddImageToParkingSpot
