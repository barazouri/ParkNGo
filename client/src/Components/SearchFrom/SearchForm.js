import React from 'react'
<<<<<<< HEAD

=======
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import DateAndTimePicker from './DateAndTimePicker'
import NumericInput from 'react-native-numeric-input'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressInput: {
    alignSelf: 'center',
    width: '80%',
    margin: 20
  },
  distanceText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  distanceInput: {
    marginBottom: 20
  },
  numberInput: {
    alignItems: 'center'
  },
  containerScrollView: {
    flexGrow: 1
    // centerContent: true,
  }
})
class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
<<<<<<< HEAD
<<<<<<< HEAD
      date: new Date(Date.now()),
=======
      forDate: new Date(Date.now()),
      untilDate: null,
>>>>>>> UI search result and details
=======
      forDate: new Date(Date.now()),
      untilDate: null,
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
      mode: 'date',
      show: false,
      distance: 0,
      address: ''
    }
    // this.onChange = this.onChange.bind(this)
    // this.showDatepicker = this.showDatepicker.bind(this)
    this.updateForDate = this.updateForDate.bind(this)
    this.updateUntilDate = this.updateUntilDate.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.OnChangeDistance = this.OnChangeDistance.bind(this)
    this.handleAdress = this.handleAdress.bind(this)
  }
  updateForDate (date) {
    this.setState({ forDate: date })
  }
  updateUntilDate (date) {
    this.setState({ untilDate: date })
  }
  submitForm (navigation) {
    navigation.navigate('ParkingResults', {
      forDate: this.state.forDate,
      untilDate: this.state.untilDate,
      distance: this.state.distance,
      address: this.state.address
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
      <SafeAreaView style={styles.container}>
        <ScrollView centerContent={true} style={styles.containerScrollView}>
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
                totalWidth={240}
                totalHeight={50}
                iconSize={25}
                minValue={0}
                step={20}
                valueType='real'
                rounded
                textColor='#B0228C'
                iconStyle={{ color: 'white' }}
                rightButtonBackgroundColor='#A9A9A9'
                leftButtonBackgroundColor='#A9A9A9'
              />
            </View>
          </View>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
          {/* <Text style={{textAlign:'center', fontSize:20}}>Start Time</Text> */}
          <DateAndTimePicker updateDate={this.updateForDate} kind='Start Time'/>
          {/* <Text style={{textAlign:'center', fontSize:20}}>End Time</Text> */}
          <DateAndTimePicker updateDate={this.updateForDate} kind='End Time'/>
          <Button
            title='Submit'
            style={{ width: Dimensions.get('window').width, top: 20 }}
            color='#841584'
            onPress={() => this.submitForm(navigation)}
            accessibilityLabel='Learn more about this purple button'
          />
        </ScrollView>
      </SafeAreaView>
<<<<<<< HEAD
>>>>>>> UI search result and details
=======
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
    )
  }
}
export default SearchForm
