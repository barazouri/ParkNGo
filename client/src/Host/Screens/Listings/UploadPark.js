import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import DateAndTimePicker from '../../../Driver/Components/SearchFrom/DateAndTimePicker'
import SafeAreaView from 'react-native-safe-area-view'
import NumericInput from 'react-native-numeric-input'
import { Dropdown } from 'react-native-material-dropdown'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-elements'
import { Input } from 'react-native-elements'


const config = require('../../../../config/config')
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        position: 'relative',
        alignSelf: 'center',
    },
    priceBtn: {
        position: 'relative',
        alignSelf: 'center',
        // top: 50
    },
    inputDirections: {
        margin: 30,
        width: 220,
        alignSelf: 'center'
      },
    input: {
        // margin: 15,
        // top: 100,
        alignSelf: 'center',
        width: 200,
    },
    edit: {
        fontSize: 55,
        color: "black",
    },
    priceLabel: {
        alignSelf: 'center',
        fontSize: 20,
        margin: 10
    }
})

class UploadPark extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            email: 'guygolpur@gmail.com',
            policy: '',
            parkingSize: '',
            price: 0,
            AvailablefromTime: '',
            AvailableUntilTime: '',
            directions: '',
            forDate: new Date(Date.now()),
            untilDate: undefined,
        }

        this.onContentSizeChange = this.onContentSizeChange.bind(this)
        this.getUrlForApi = this.getUrlForApi.bind(this)
        this.handlePressSave = this.handlePressSave.bind(this)
        this.onChangePolicy = this.onChangePolicy.bind(this)
        this.onChangeParkingSize = this.onChangeParkingSize.bind(this)
    }

    onContentSizeChange(contentWidth, contentHeight) {
        this.setState({ screenHeight: contentHeight })
    }

    getUrlForApi() {
        return config.API + `/addNewParkingSpot`
    }

    onChangePolicy(value) {
        console.log(`Selected value: ${value}`);
        this.setState({ policy: value });
    }

    onChangeParkingSize(value) {
        this.setState({ parkingSize: value });
    }

    handlePressSave() {
        let urlAdd = this.getUrlForApi()
        console.log("Saved")

        let url = `${urlAdd}`
        fetch(`${url}`, {
            method: 'POST',
            body: `email=${email}&address=${address}&policy=${policy}&parkingSize=${parkingSize}&price=${price}&AvailablefromTime=${AvailablefromTime}&AvailableUntilTime=${AvailableUntilTime}&directions=${directions}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .catch(err => new Error(err))

    }

    render() {
        // const { parkingSpot } = this.props.route.params
        const scrollEnabled = this.state.screenHeight > height;
        let selectPolicy = [{
            value: 'Flexible',
        }, {
            value: 'Moderate',
        }, {
            value: 'Strict',
        }]
        let selectParkingSize = [{
            value: 'small',
        }, {
            value: 'medium',
        }, {
            value: 'big',
        }]

        return (
            <SafeAreaView style={{flex:1}}>

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={styles.container}>
                    <Input
                         containerStyle={styles.inputDirections}
                         placeholder='Address'
                         value={this.state.address}
                         onChangeText={address => this.setState({ address })}
                         />
                        <View style={styles.priceBtn}>
                            <Text style={styles.priceLabel}>Price</Text>
                            <NumericInput
                                value={this.state.price}
                                onChange={price => this.setState({ price })}
                                initValue={0}
                                minValue={0}
                                totalWidth={240}
                                totalHeight={50}
                                iconSize={25}
                                step={1}
                                valueType='real'
                                rounded
                                textColor='#B0228C'
                                iconStyle={{ color: 'white' }}
                                rightButtonBackgroundColor='#A9A9A9'
                                leftButtonBackgroundColor='#A9A9A9'                            />
                        </View>
                        <View style={styles.input}>
                            <Dropdown
                                label='Policy'
                                data={selectPolicy}
                                onChangeText={value => this.onChangePolicy(value)}
                            />
                        </View>
                        <View style={styles.input}>
                            <Dropdown
                                label='Parking Size'
                                data={selectParkingSize}
                                onChangeText={value => this.onChangeParkingSize(value)}
                            />
                        </View>

                        {/* <TextInput style={styles.input}
                            label="Directions"
                            mode='outlined'
                            value={this.state.directions}
                            onChangeText={directions => this.setState({ directions })}
                        /> */}
                        <Input
                         containerStyle={styles.inputDirections}
                         placeholder='Directions'
                         value={this.state.directions}
                         onChangeText={directions => this.setState({ directions })}
                         />
                        <View style={styles.saveBtnContainer}>
                            <Button
                                type="clear"
                                icon={
                                    <Icon name="save" style={styles.edit}>
                                    </Icon>
                                }
                                onPress={() => this.handlePressSave()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default UploadPark;