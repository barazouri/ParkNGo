import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper'
import NumericInput from 'react-native-numeric-input'
import { Dropdown } from 'react-native-material-dropdown'



const config = require('../../../../config/config')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    input: {
        margin: 15,
        // height: 40,
        // borderColor: '#7a42f4',
        // borderWidth: 1,
        width: 200,
     },
     edit: {
        // justifyContent: 'center',
        // alignItems: 'center',
     },
})

class HostEditParkingSpot extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            address: '',
            policy: '',
            parkingSize: '',
            price: 0,
            AvailablefromTime: '',
            AvailableUntilTime: '',
            directions: ''
        }
        // this.handleCardPress = this.handleCardPress.bind(this)
      }

    handlePressSave() {
        const { parkingSpot } = this.props.route.params
        console.log("Saved")
        if(this.state.address == '')
        {
            this.state.address = parkingSpot.address
            console.log(this.state.address)
        }
        if(this.state.price == 0)
        {
            this.state.price = parkingSpot.price
            console.log(this.state.price)
        }
        else
        {
            console.log(this.state.price)
        }
        if(this.state.policy == '')
        {
            this.state.policy = parkingSpot.policy
            console.log(this.state.policy)
        }
        if(this.state.parkingSize == '')
        {
            this.state.parkingSize = parkingSpot.parkingSize
            console.log(this.state.parkingSize)
        }
        if(this.state.directions == '')
        {
            this.state.directions = parkingSpot.directions
            console.log(this.state.directions)
        }
        if(this.state.AvailablefromTime == '')
        {
            this.state.AvailablefromTime = parkingSpot.AvailablefromTime
            console.log(this.state.AvailablefromTime)
        }
        if(this.state.AvailableUntilTime == '')
        {
            this.state.AvailableUntilTime = parkingSpot.AvailableUntilTime
            console.log(this.state.AvailableUntilTime)
        }

    }
      getUrlForApi(){
          return config.API + `/editSpecificParking`
      }
    //   componentDidMount () {
    //     const { route, navigation } = this.props
    //     let url = this.getUrlForApi()
    //     fetch(`${url}`, {
    //         method: 'POST',
    //         body: `parkingId=${this.props.parkingId}&address=${this.props.address}&policy=${this.props.policy}&parkingSize=${this.props.parkingSize}&price=${this.props.price}&AvailablefromTime=${this.props.AvailablefromTime}&AvailableUntilTime=${this.props.AvailableUntilTime}&directions=${this.props.directions}`,
    //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //     })

    //   }
    render() {
        const { parkingSpot } = this.props.route.params
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
            <View style={styles.container}>
                <TextInput style = {styles.input}
                    label = "Address"
                    mode = 'outlined'
                    value={parkingSpot.address}
                    onChangeText={address => this.setState({ address })}
                />

                <NumericInput 
                    value={this.state.price} 
                    onChange={price => this.setState({price})} 
                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                    initValue= {parkingSpot.price}
                    minValue={0}
                    totalWidth={240} 
                    totalHeight={50} 
                    iconSize={25}
                    step={0.1}
                    valueType='real'
                    rounded 
                    textColor='#B0228C' 
                    iconStyle={{ color: 'white' }} 
                    rightButtonBackgroundColor='#EA3788' 
                    leftButtonBackgroundColor='#E56B70'
                    />
                {/* <Button
                    icon={
                        <Icon name="save" style={styles.edit}>
                        <Text style={styles.ediText}>Save</Text>
                        </Icon>
                    }
                    onPress={() => this.handlePressAdress()}
                /> */}
                
                <Dropdown
                    label='Policy'
                    data={selectPolicy}
                />
                {/* <Button
                    icon={
                        <Icon name="save" style={styles.edit}>
                        <Text style={styles.ediText}>Save</Text>
                        </Icon>
                    }
                    onPress={() => this.handlePressPolicy()}
                /> */}

                <Dropdown
                    label='Parking Size'
                    data={selectParkingSize}
                />
                {/* <Button
                    icon={
                        <Icon name="save" style={styles.edit}>
                        <Text style={styles.ediText}>Save</Text>
                        </Icon>
                    }
                    onPress={() => this.handlePressParkingSize()}
                /> */}

                {/* <Button
                    icon={
                        <Icon name="save" style={styles.edit}>
                        <Text style={styles.ediText}>Save</Text>
                        </Icon>
                    }
                    onPress={() => this.handlePressPrice()}
                /> */}

                <TextInput style = {styles.input}
                    label = "Directions"
                    mode = 'outlined'
                    value={this.state.directions}
                    onChangeText={directions => this.setState({ directions })}
                />

                <TextInput style = {styles.input}
                    label = "AvailablefromTime"
                    mode = 'outlined'
                    value={this.state.AvailablefromTime}
                    onChangeText={AvailablefromTime => this.setState({ AvailablefromTime })}
                    />
                {/* <Button
                    icon={
                        <Icon name="save" style={styles.edit}>
                        <Text style={styles.ediText}>Save</Text>
                        </Icon>
                    }
                    onPress={() => this.handlePressAvailablefromTime()}
                /> */}

                <TextInput style = {styles.input}
                    label = "AvailableUntilTime"
                    mode = 'outlined'
                    value={this.state.AvailableUntilTime}
                    onChangeText={AvailableUntilTime => this.setState({ AvailableUntilTime })}
                    />
                {/* <Button
                    icon={
                        <Icon name="save" style={styles.edit}>
                        <Text style={styles.ediText}>Save</Text>
                        </Icon>
                    }
                    onPress={() => this.handlePressAvailableUntilTime()}
                /> */}


                <Button
                    icon={
                        <Icon name="save" style={styles.edit}>
                        <Text style={styles.ediText}>Save</Text>
                        </Icon>
                    }
                    onPress={() => this.handlePressSave()}
                />
            </View>
        );
    }
}
export default HostEditParkingSpot;