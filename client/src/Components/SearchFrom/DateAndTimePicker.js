import React, { useState } from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Button } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20
  },
  iconsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addressInput: {
    width: '80%',
    margin: 20
  },
  iconClock: {
    margin: 10
  },
  iconCelander: {
    margin: 10
  },
  iconClose: {
    margin: 10
  }
})
const DateAndTimePicker = props => {
  const [date, setDate] = useState(props.date)
  const [mode, setMode] = useState('start')
  const [show, setShow] = useState(false)

  const showMode = currentMode => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }
  const hideDatePicker = () => {
    setShow(false)
  }
  const handleConfirm = date => {
    setShow(false)
    setDate(date)
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>{props.kind}</Text>
      <View style={styles.iconsContainer}>
        <MaterialCommunityIcons
          style={styles.iconClock}
          name='clock-outline'
          color={mode == 'time' ? 'green' : 'black'}
          size={40}
          onPress={showTimepicker}
        />
        <MaterialCommunityIcons
          style={styles.iconCelander}
          name='calendar-range'
          color={mode == 'date' ? 'green' : 'black'}
          size={40}
          onPress={showDatepicker}
        />
      </View>
      {!show && date && (
        <View>
          <Text
            style={{ textAlign: 'centerå' }}
          >{`Date: ${date.getDate()}/${date.getDay()}/${date.getFullYear()}`}</Text>
          <Text style={{ textAlign: 'center' }}>
            {`Time: ${date.getHours()}:${date.getMinutes()}`}{' '}
          </Text>
        </View>
      )}
      {show && (
        <DateTimePickerModal
          isVisible={show}
          date={date}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
    </View>
  )
}

export default DateAndTimePicker
