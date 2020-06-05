import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native'
import { Button } from 'react-native-elements'
import NumericInput from 'react-native-numeric-input'
import { Dropdown } from 'react-native-material-dropdown'
import SafeAreaView from 'react-native-safe-area-view'
import { Input } from 'react-native-elements'

const config = require('../../../../config/config')
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  containerSlide: {
    flex: 1
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    position: 'relative',
    top: 50
  },
  input: {
    margin: 20,
    width: 200,
    alignSelf: 'center'
  },
  inputDirections: {
    margin: 30,
    width: 220,
    alignSelf: 'center'
  },
  edit: {
    fontSize: 55,
    color: 'black'
  },
  addressTitle: {
    margin: 20,
    fontSize: 30,
    alignSelf: 'center'
  },
  saveBtnContainer: {
    position: 'relative'
  },
  priceBtn: {
    position: 'relative',
    alignSelf: 'center'
  }
})

class HostEditParkingSpot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // address: '',
      policy: '',
      parkingSize: '',
      price: 0,
      AvailablefromTime: '',
      AvailableUntilTime: '',
      directions: '',
      forDate: new Date(Date.now()),
      untilDate: undefined
    }

    this.onContentSizeChange = this.onContentSizeChange.bind(this)
    this.handlePressSave = this.handlePressSave.bind(this)
    this.getUrlForApi = this.getUrlForApi.bind(this)
    this.onChangePolicy = this.onChangePolicy.bind(this)
    this.onChangeParkingSize = this.onChangeParkingSize.bind(this)
  }

  getUrlForApi () {
    return config.API + `/editSpecificParking`
  }

  onContentSizeChange (contentWidth, contentHeight) {
    this.setState({ screenHeight: contentHeight })
  }

  // updateForDate(date) {
  //     this.setState({ forDate: date })
  // }

  // updateUntilDate(date) {
  //     this.setState({ untilDate: date })
  // }

  handlePressSave () {
    const { parkingSpot } = this.props.route.params
    let urlAdd = this.getUrlForApi()
    console.log('Saved')

    if (this.state.price == 0) {
      this.state.price = parkingSpot.price
      console.log(this.state.price)
    } else {
      console.log(this.state.price)
    }
    if (this.state.policy == '') {
      this.state.policy = parkingSpot.policy
      console.log(this.state.policy)
    }
    if (this.state.parkingSize == '') {
      this.state.parkingSize = parkingSpot.parkingSize
      console.log(this.state.parkingSize)
    }
    if (this.state.directions == '') {
      this.state.directions = parkingSpot.directions
      console.log(this.state.directions)
    }

    console.log('fromDate ' + this.state.forDate.toString())
    if (this.state.untilDate != undefined) {
      console.log(this.state.untilDate)
    }

    const parkingId = parkingSpot.parkingId
    const address = parkingSpot.address
    const policy = this.state.policy
    const parkingSize = this.state.parkingSize
    const price = this.state.price
    // const AvailablefromTime = this.state.forDate
    // const AvailableUntilTime = this.state.untilDate
    const directions = this.state.directions

    let url = `${urlAdd}`
    fetch(`${url}`, {
      method: 'POST',
      body: `parkingId=${parkingId}&address=${address}&policy=${policy}&parkingSize=${parkingSize}&price=${price}&directions=${directions}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .catch(err => new Error(err))
  }
  onChangePolicy (value) {
    console.log(`Selected value: ${value}`)
    this.setState({ policy: value })
  }

  onChangeParkingSize (value) {
    this.setState({ parkingSize: value })
  }

  render () {
    const { parkingSpot } = this.props.route.params
    const scrollEnabled = this.state.screenHeight > height

    let selectPolicy = [
      {
        value: 'Flexible'
      },
      {
        value: 'Moderate'
      },
      {
        value: 'Strict'
      }
    ]
    let selectParkingSize = [
      {
        value: 'small'
      },
      {
        value: 'medium'
      },
      {
        value: 'big'
      }
    ]
    return (
      <SafeAreaView style={styles.containerSlide}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollview}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.container}>
            <Text style={styles.addressTitle}>{parkingSpot.address}</Text>

            <View style={styles.priceBtn}>
              <NumericInput
                value={this.state.price}
                onChange={price => this.setState({ price })}
                initValue={parkingSpot.price}
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
                leftButtonBackgroundColor='#A9A9A9'
              />
            </View>
            <View style={styles.input}>
              <Dropdown
                placeholder='Policy'
                data={selectPolicy}
                onChangeText={value => this.onChangePolicy(value)}
              />
            </View>
            <View style={styles.input}>
              <Dropdown
                placeholder='Parking Size'
                data={selectParkingSize}
                onChangeText={value => this.onChangeParkingSize(value)}
              />
            </View>
            <Input
              containerStyle={styles.inputDirections}
              placeholder='Directions'
              value={this.state.directions}
              onChangeText={directions => this.setState({ directions })}
            />
            <View style={styles.saveBtnContainer}>
              <Button
                title='Save'
                style={{ width: Dimensions.get('window').width, top: 20 }}
                color='#841584'
                onPress={() => this.handlePressSave()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default HostEditParkingSpot

//All works
