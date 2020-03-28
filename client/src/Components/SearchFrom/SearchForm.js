// function SearchForm({ navigation }) {
//         return (
//             <View style={styles.container}>
//                 <Text>Profile screen</Text>
//             </View>
//         );
// }
// export default SearchForm;
import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import { Input, Button } from 'react-native-elements'
import DateAndTimePicker from './DateAndTimePicker'
import NumericInput from 'react-native-numeric-input'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressInput: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: 20
  },
  distanceText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20
  },
  distanceInput: {
    marginBottom: 20
  },
  numberInput: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date(Date.now()),
      mode: 'date',
      show: false,
      distance: 0,
      address: ''
    }
    // this.onChange = this.onChange.bind(this)
    // this.showDatepicker = this.showDatepicker.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.OnChangeDistance = this.OnChangeDistance.bind(this)
    this.handleAdress = this.handleAdress.bind(this)
  }
  updateDate (date) {
    this.setState({ date: date })
  }
  submitForm (navigation) {
    navigation.navigate('ParkingCardList', {
        date: this.state.date,
        distance: this.state.distance,
        address: this.state.address,
    })
  }
  OnChangeDistance (distance) {
    this.setState({ distance })
  }
  handleAdress (address) {
    this.setState({ address })
  }
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        {/* <View style={styles.addressInput}> */}
        <Input
          containerStyle={styles.addressInput}
          placeholder='Address'
          value={this.state.address}
          onChangeText={this.handleAdress}
        />
        <View style={styles.distanceInput}>
          <Text style={styles.distanceText}>
            Distance from destenation in meters
          </Text>
          <View style={styles.numberInput}>
            <NumericInput
              value={this.state.distance}
              onChange={this.OnChangeDistance}
            //   onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              minValue={0}
              step={20}
              valueType='real'
              rounded
              textColor='#B0228C'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#EA3788'
              leftButtonBackgroundColor='#E56B70'
            />
          </View>
        </View>
        {/* <Input containerStyle={styles.addressInput} placeholder='Address' /> */}
        {/* <Button onPress={this.showDatepicker} title="Show date picker!" />
          <Button onPress={this.showTimepicker} title="Show time picker!" /> */}
        {/* {this.state.show && ( */}
        <DateAndTimePicker updateDate={this.updateDate} />
        {/* )} */}
        <Button
          title='Submit'
          style={{ width: Dimensions.get('window').width, top: 20 }}
          color='#841584'
          onPress={() => this.submitForm(navigation)}
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
      //   </View>
    )
  }
}
export default SearchForm
