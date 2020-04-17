import React from 'react'
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
import * as Font from 'expo-font'
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addressInput: {
    alignSelf: 'center',
    width: '80%',
    margin: 10,
    fontFamily: 'Inter-SemiBoldItalic'

  },
  distanceText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBoldItalic'
  },
  distanceInput: {
    marginBottom: 10
  },
  numberInput: {
    alignItems: 'center'
  },
  containerScrollView: {
    flexGrow: 1
  },
  numberInputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20
  }
})
class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      forDate: new Date(Date.now()),
      untilDate: undefined,
      mode: 'date',
      show: false,
      distance: 0,
      address: null,
      price: 0
    }
    // let [fontsLoaded] = useFonts({
    //   'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
    // });
    // this.onChange = this.onChange.bind(this)
    // this.showDatepicker = this.showDatepicker.bind(this)
    this.updateForDate = this.updateForDate.bind(this)
    this.updateUntilDate = this.updateUntilDate.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.OnChangeDistance = this.OnChangeDistance.bind(this)
    this.handleAdress = this.handleAdress.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
  }
  updateForDate (date) {
    this.setState({ forDate: date })
  }
  updateUntilDate (date) {
    this.setState({ untilDate: date })
  }
  submitForm (navigation) {
    if (this.state.address === null) {
      console.log('address required') //need to add user message
      return
    }
    navigation.navigate('ParkingResults', {
      forDate: this.state.forDate,
      untilDate: this.state.untilDate,
      distance: this.state.distance,
      address: this.state.address,
      price: this.state.price
    })
  }
  OnChangeDistance (distance) {
    this.setState({ distance })
  }
  handleAdress (address) {
    this.setState({ address })
  }
  onChangePrice (price) {
    this.setState({ price: price })
  }

  render () {
    const { navigation } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView centerContent={true} style={styles.containerScrollView}>
          <Input
            containerStyle={styles.addressInput}
            placeholder='Address (required)*'
            value={this.state.address}
            onChangeText={this.handleAdress}
          />
          {/* <Text style={{textAlign:'center', fontSize:20}}>Start Time</Text> */}
          <DateAndTimePicker
            updateDate={this.updateForDate}
            kind='Start Time'
            date={this.state.forDate}
          />
          {/* <Text style={{textAlign:'center', fontSize:20}}>End Time</Text> */}
          <DateAndTimePicker
            updateDate={this.updateUntilDate}
            kind='End Time'
          />
          <View style={styles.numberInputContainer}>
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
            <View style={styles.distanceInput}>
              <Text style={styles.distanceText}>Max price</Text>
              <View style={styles.numberInput}>
                <NumericInput
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  totalWidth={240}
                  totalHeight={50}
                  iconSize={25}
                  minValue={0}
                  step={5}
                  valueType='real'
                  rounded
                  textColor='#B0228C'
                  iconStyle={{ color: 'white' }}
                  rightButtonBackgroundColor='#A9A9A9'
                  leftButtonBackgroundColor='#A9A9A9'
                />
              </View>
            </View>
          </View>
          <Button
            title='Submit'
            style={{ width: Dimensions.get('window').width, top: 20 }}
            color='#841584'
            onPress={() => this.submitForm(navigation)}
            accessibilityLabel='Learn more about this purple button'
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default SearchForm
