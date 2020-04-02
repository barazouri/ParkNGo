import React, { useState } from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';


const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressInput: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: 20
  },
  iconClock: {
    // left: 20,
    margin:10
  },
  iconCelander:{
    margin:10
  },
  iconClose: {
    margin:10
  }
})
const DateAndTimePicker = (props) => {
  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('start')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    props.updateDate(currentDate)
    setDate(currentDate)
  }

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
  const closeDatepicker = () => {
    setShow(false)
    setMode("closed")
  }

  return (
    <View style={{width:'100%'}}>
      <View style={styles.iconsContainer}>

        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
        
        <Ionicons style={styles.iconClock} name='ios-clock' color={mode == 'time' ? 'green' : 'black'} size={40} onPress={showTimepicker}/>
        <MaterialCommunityIcons style={styles.iconCelander} name="calendar-range" color={mode == 'date' ? 'green' : 'black'} size={40} onPress={showDatepicker}/>
        <MaterialCommunityIcons style={styles.iconClose} name="close" color={mode == 'closed' ? 'green' : 'black'} size={40} onPress={closeDatepicker}/>

      </View>
      {mode == 'closed' && (
          <Text style={{textAlign:"center"}}>{date.toString()}</Text>
        )}
      {/* <View>
        <Button onPress={showTimepicker} title='Show time picker!' />
      </View> */}
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  )
}

export default DateAndTimePicker
