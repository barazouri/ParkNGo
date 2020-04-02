// function SearchForm({ navigation }) {
//         return (
//             <View style={styles.container}>
//                 <Text>Profile screen</Text>
//             </View>
//         );
// }
// export default SearchForm;
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
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
    fontSize: 20,
    textAlign: 'center'
  },
  distanceInput: {
    marginBottom: 20
  },
  numberInput: {
    justifyContent: 'center',
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
      forDate: new Date(Date.now()),
      untilDate: new Date(Date.now()),
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
          <Text style={{textAlign:'center', fontSize:20}}>Start Time</Text>
          <DateAndTimePicker updateDate={this.updateForDate} />
          <Text style={{textAlign:'center', fontSize:20}}>End Time</Text>
          <DateAndTimePicker updateDate={this.updateForDate} />
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
