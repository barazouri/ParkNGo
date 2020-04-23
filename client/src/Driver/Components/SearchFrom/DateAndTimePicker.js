import React, { useState } from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useFonts } from '@use-expo/font';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: 150,
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
  iconTimeAndDate: {
    borderWidth: 1,
    margin: 10,
    borderColor: 'rgba(0,0,0,0.9)',
    borderRadius: 15,
    height: 50,
    width: 50,
    justifyContent: 'center'
  },
  iconCelander: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50
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
    props.updateDate(date)
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 20,fontFamily: 'Inter-SemiBoldItalic'  }}>{props.kind}</Text>
      <View style={styles.iconsContainer}>
        <View style={styles.iconTimeAndDate}>
          <MaterialCommunityIcons
            style={{ textAlign: 'center' }}
            name='clock-outline'
            color={'black'}
            size={30}
            onPress={showTimepicker}
          />
        </View>
        <View style={styles.iconTimeAndDate}>
          <MaterialCommunityIcons
            style={{ textAlign: 'center' }}
            name='calendar-range'
            color={'black'}
            size={30}
            onPress={showDatepicker}
          />
        </View>
      </View>
      {!show && date && (
        <View>
          <Text
            style={{ textAlign: 'center', fontFamily: 'Inter-SemiBoldItalic' }}
          >{`Date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</Text>
          <Text style={{ textAlign: 'center', fontFamily: 'Inter-SemiBoldItalic' }}>
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
