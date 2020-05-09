import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    height: '80%'
  },
  timeContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    width: '90%',
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20
  },
  timeHeader: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBoldItalic',
    fontSize: 20,
    marginBottom: 10
  },
  timeAndDateText: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBoldItalic',
    fontSize: 17
  }
})

class BookApprove extends React.Component {
  constructor (props) {
    super(props)
    this.handleButton = this.handleButton.bind(this)
  }
  handleButton () {
      const {navigation} = this.props
    navigation.navigate('Reservations')
  }
  render () {
    const { parkingSpot, forDate, untilDate } = this.props.route.params
    console.log(forDate)
    console.log(untilDate)

    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 40,
            fontFamily: 'Inter-SemiBoldItalic'
          }}
        >
          Book Approved
        </Text>
        <View style={styles.timeContainer}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Inter-SemiBoldItalic',
              fontSize: 20,
              marginBottom: 10
            }}
          >
            Address
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Inter-SemiBoldItalic',
              fontSize: 17
            }}
          >
            {parkingSpot.address}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeHeader}>Enter Time</Text>
          <Text
            style={styles.timeAndDateText}
          >{`Date: ${forDate.getDate()}/${forDate.getMonth() +
            1}/${forDate.getFullYear()}`}</Text>
          <Text style={styles.timeAndDateText}>
            {`Time: ${forDate.getHours()}:${forDate.getMinutes()}`}{' '}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <MaterialCommunityIcons
            name='arrow-down-bold-outline'
            size={50}
            color='black'
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeHeader}>Exit Time</Text>
          <Text
            style={styles.timeAndDateText}
          >{`Date: ${untilDate.getDate()}/${untilDate.getMonth() +
            1}/${untilDate.getFullYear()}`}</Text>
          <Text style={styles.timeAndDateText}>
            {`Time: ${untilDate.getHours()}:${untilDate.getMinutes()}`}{' '}
          </Text>
        </View>
        <Button
          title='Continue'
          style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
          color='#841584'
          onPress={this.handleButton}
          accessibilityLabel='Learn more about this purple button'
        ></Button>
      </View>
    )
  }
}
export default BookApprove
