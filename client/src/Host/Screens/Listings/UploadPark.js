import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import NumericInput from 'react-native-numeric-input'
import { Dropdown } from 'react-native-material-dropdown'
import { Button } from 'react-native-elements'
import { Input } from 'react-native-elements'
import HeaderLogo from '../../../Components/HeaderLogo/HeaderLogo'
const config = require('../../../../config/config')
const { height } = Dimensions.get('window')
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import { AntDesign } from '@expo/vector-icons'
import ExplanationPopUp from '../../Components/ExplanationPopUp/explanationPopUp'
import FeedBack from '../../Components/FeedBack/feedBack'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    position: 'relative'
  },
  priceBtn: {
    position: 'relative',
    alignSelf: 'center'
  },
  inputDirections: {
    margin: 30,
    width: 220,
    alignSelf: 'center'
  },
  input: {
    alignSelf: 'center',
    width: 250
  },
  edit: {
    fontSize: 55,
    color: 'black'
  },
  priceLabel: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 10
  },
  priceLabelExplain: {
    alignSelf: 'center',
    margin: 10
  }
})

class UploadParkContent extends React.Component {
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
      untilDate: undefined,
      dialogVisible: false,
      dialogVisibleParkingSize: false,
      saveFeedBackVisible: false,
      redirect: false
    }

    this.onContentSizeChange = this.onContentSizeChange.bind(this)
    this.getUrlForApi = this.getUrlForApi.bind(this)
    this.handlePressSave = this.handlePressSave.bind(this)
    this.onChangePolicy = this.onChangePolicy.bind(this)
    this.onChangeParkingSize = this.onChangeParkingSize.bind(this)
    this.uploadParkingSpotView = this.uploadParkingSpotView.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.handleDirections = this.handleDirections.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.showDialogParkingSize = this.showDialogParkingSize.bind(this)
    this.saveFeedBack = this.saveFeedBack.bind(this)
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
  handleAddress (address) {
    this.setState({ address: address })
  }
  handleDirections (directions) {
    this.setState({ directions: directions })
  }
  handlePressSave () {
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
    this.saveFeedBack()
  }

  saveFeedBack () {
    this.setState({ saveFeedBackVisible: true })
  }

  showDialog () {
    this.setState({ dialogVisible: true })
  }

  showDialogParkingSize () {
    this.setState({ dialogVisibleParkingSize: true })
  }

  handleCancel () {
    this.setState({ dialogVisible: false })
  }

  uploadParkingSpotView () {
    const scrollEnabled = this.state.screenHeight > height
  }

  closePopUp (childData, childDataRedirect) {
    const { navigation } = this.props

    this.setState({
      dialogVisible: childData,
      dialogVisibleParkingSize: childData,
      saveFeedBackVisible: childData,
      redirect: childDataRedirect
    })

    if (childDataRedirect) {
      navigation.reset({
        routes: [{ name: 'Listings' }],
      });
      
    }
  }

  render () {
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
            scrollEnabled={this.scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
          >
            <View style={styles.container}>
              <Input
                containerStyle={styles.inputDirections}
                placeholder='Address'
                onChangeText={this.handleAddress}
              />
              <View style={styles.priceBtn}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.priceLabelExplain}>({'\u20AA'}/Hour)</Text>
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
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View style={styles.input}>
                  <Dropdown
                    label='Policy'
                    data={selectPolicy}
                    onChangeText={value => this.onChangePolicy(value)}
                  />
                </View>

                <TouchableOpacity
                  onPress={this.showDialog}
                  style={{ marginTop: 35, marginLeft: 10 }}
                >
                  <AntDesign name='questioncircleo' size={24} color='black' />
                </TouchableOpacity>
              </View>
              <View style={styles.input}>
                <ExplanationPopUp
                  dialogVisible={this.state.dialogVisible}
                  closePopUp={this.closePopUp}
                  subject='Policy'
                  topTitle='Flexible:'
                  topExplain='Full refund 1 day prior to arrival.'
                  midTitle='Moderate:'
                  midExplain='Full refund 5 days prior to arrival.'
                  bottomTitle='Strict:'
                  bottomExplain='No refunds for cancellations made within 7 days of check-in.'
                />
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View style={styles.input}>
                  <Dropdown
                    label='Parking Size'
                    data={selectParkingSize}
                    onChangeText={value => this.onChangeParkingSize(value)}
                  />
                </View>
                <TouchableOpacity
                  onPress={this.showDialogParkingSize}
                  style={{ marginTop: 35, marginLeft: 10 }}
                >
                  <AntDesign name='questioncircleo' size={24} color='black' />
                </TouchableOpacity>
              </View>
              <View style={styles.input}>
                <ExplanationPopUp
                  dialogVisible={this.state.dialogVisibleParkingSize}
                  closePopUp={this.closePopUp}
                  subject='Parking Size'
                  topTitle='Small:'
                  topExplain='Private vehicles, such as: Seat Ibiza, Mazda 3, Ford Focus etc.'
                  midTitle='Medium:'
                  midExplain='Medium vehicles such as: Jip, Hammer, Dogde etc.'
                  bottomTitle='Big:'
                  bottomExplain='Big vehicles such as: Tracks, RV etc.'
                />
              </View>
              <Input
                containerStyle={styles.inputDirections}
                placeholder='Comments'
                onChangeText={this.handleDirections}
              />
              <View style={styles.saveBtnContainer}>
                <Button
                  title='Upload'
                  style={{ width: Dimensions.get('window').width, top: 20 }}
                  color='#841584'
                  onPress={() => this.handlePressSave()}
                />
              </View>
              <View style={styles.input}>
                <FeedBack
                  dialogVisible={this.state.saveFeedBackVisible}
                  closePopUp={this.closePopUp}
                  subject='New Parking Spot Have Been Created!'
                  topTitle='The parking spot added to your list'
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

class UploadPark extends React.Component {
  render () {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Upload Park'
          component={UploadParkContent}
          options={{
            title: 'Create New Parking Spot',
            ...TransitionPresets.ModalSlideFromBottomIOS,
            headerBackground: () => <HeaderLogo />
          }}
        />
      </Stack.Navigator>
    )
  }
}
export default UploadPark
