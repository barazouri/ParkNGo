import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image
} from 'react-native'
import DateAndTimePicker from '../../../Driver/Components/SearchFrom/DateAndTimePicker'
import SafeAreaView from 'react-native-safe-area-view'
import NumericInput from 'react-native-numeric-input'
import { Dropdown } from 'react-native-material-dropdown'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-elements'
import { Input } from 'react-native-elements'
import HeaderLogo from '../../../Components/HeaderLogo/HeaderLogo'
const config = require('../../../../config/config')
const { height } = Dimensions.get('window')
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    position: 'relative',
    alignSelf: 'center'
  },
  priceBtn: {
    position: 'relative',
    alignSelf: 'center'
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
    width: 200
  },
  edit: {
    fontSize: 55,
    color: 'black'
  },
  priceLabel: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 10
  }
})

class UploadPark extends React.Component {
  constructor (props) {
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
      untilDate: undefined
    }

    this.onContentSizeChange = this.onContentSizeChange.bind(this)
    this.getUrlForApi = this.getUrlForApi.bind(this)
    this.handlePressSave = this.handlePressSave.bind(this)
    this.onChangePolicy = this.onChangePolicy.bind(this)
    this.onChangeParkingSize = this.onChangeParkingSize.bind(this)
    this.uploadParkingSpotView = this.uploadParkingSpotView.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.handleDirections = this.handleDirections.bind(this)
  }

  onContentSizeChange (contentWidth, contentHeight) {
    this.setState({ screenHeight: contentHeight })
  }

  getUrlForApi () {
    return config.API + `/addNewParkingSpot`
  }

  onChangePolicy (value) {
    console.log(`Selected value: ${value}`)
    this.setState({ policy: value })
  }

  onChangeParkingSize (value) {
    this.setState({ parkingSize: value })
  }
  handleAddress(address) {
      this.setState({address:address})
  }
  handleDirections(directions) {
    this.setState({directions:directions})
  }
  handlePressSave () {
    const { navigation } = this.props
    let { email, policy, parkingSize, price, directions, address } = this.state
    let urlAdd = this.getUrlForApi()
    console.log('Saved')

    let url = `${urlAdd}`
    fetch(`${url}`, {
      method: 'POST',
      body: `email=${email}&address=${address}&policy=${policy}&parkingSize=${parkingSize}&price=${price}&directions=${directions}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .catch(err => new Error(err))
      navigation.navigate('Listings')
  }
  uploadParkingSpotView () {
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
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
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
                    // value={this.state.address}
                onChangeText={this.handleAddress}
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
                  leftButtonBackgroundColor='#A9A9A9'
                />
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
              <Input
                containerStyle={styles.inputDirections}
                placeholder='Directions'
                onChangeText={this.handleDirections}
              />
              <View style={styles.saveBtnContainer}>
                <Button
                  title='Add Park'
                  style={{ width: Dimensions.get('window').width, top: 20 }}
                  color='#841584'
                  onPress={() => this.handlePressSave()}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
  render () {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
          <Stack.Screen
            name='Upload Park'
            component={this.uploadParkingSpotView}
            options={{
              title: 'Upload Park',
              ...TransitionPresets.ModalSlideFromBottomIOS,
              headerBackground: () => <HeaderLogo />
            }}
          />
        </Stack.Navigator>
    )
  }
}
export default UploadPark
