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
import NumericInput from 'react-native-numeric-input'
import { Dropdown } from 'react-native-material-dropdown'
import SafeAreaView from 'react-native-safe-area-view'
import { Input } from 'react-native-elements'
import ExplanationPopUp from '../../Components/ExplanationPopUp/explanationPopUp'
import FeedBack from '../../Components/FeedBack/feedBack'
import { AntDesign } from '@expo/vector-icons'

const config = require('../../../../config/config')
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  containerSlide: {
    flex: 1
  },
  container: {
    // flex: 1,
    // alignSelf: 'center',
    // position: 'relative',
    // top: 50
  },
  input: {
    margin: 10,
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
  },
  priceLabelExplain: {
    alignSelf: 'center',
    margin: 10
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
      untilDate: undefined,
      dialogVisible: false,
      dialogVisibleParkingSize: false,
      saveFeedBackVisible: false
    }

    this.onContentSizeChange = this.onContentSizeChange.bind(this)
    this.handlePressSave = this.handlePressSave.bind(this)
    this.getUrlForApi = this.getUrlForApi.bind(this)
    this.onChangePolicy = this.onChangePolicy.bind(this)
    this.onChangeParkingSize = this.onChangeParkingSize.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.showDialogParkingSize = this.showDialogParkingSize.bind(this)
  }

  getUrlForApi () {
    return config.API + `/editSpecificParking`
  }

  onContentSizeChange (contentWidth, contentHeight) {
    this.setState({ screenHeight: contentHeight })
  }

  showDialog () {
    this.setState({ dialogVisible: true })
  }

  showDialogParkingSize () {
    this.setState({ dialogVisibleParkingSize: true })
  }

  closePopUp (childData, childDataRedirect) {
    const { navigation } = this.props

    this.setState({
      dialogVisible: childData,
      dialogVisibleParkingSize: childData,
      saveFeedBackVisible: childData
    })

    if (childDataRedirect) {
      navigation.navigate('Listings')
    }
  }

  saveFeedBack () {
    this.setState({ saveFeedBackVisible: true })
  }

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
    this.saveFeedBack()
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
              <Text style={styles.priceLabelExplain}>
                Price ({'\u20AA'}/Hour)
              </Text>
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
              <TouchableOpacity onPress={this.showDialog}>
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
            <View style={styles.input}>
              <Dropdown
                placeholder='Parking Size'
                data={selectParkingSize}
                onChangeText={value => this.onChangeParkingSize(value)}
              />
              <TouchableOpacity onPress={this.showDialogParkingSize}>
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
              value={this.state.directions}
              onChangeText={directions => this.setState({ directions })}
            />
            <View style={styles.input}>
              <Button
                title='Save'
                style={{ width: Dimensions.get('window').width }}
                color='#841584'
                onPress={() => this.handlePressSave()}
              />
            </View>
            <View style={styles.input}>
              <FeedBack
                dialogVisible={this.state.saveFeedBackVisible}
                closePopUp={this.closePopUp}
                subject='Edit Successfully!'
                topTitle='The parking spot edited Successfully'
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
