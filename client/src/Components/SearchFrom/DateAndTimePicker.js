import React, { useState } from 'react'
<<<<<<< HEAD
<<<<<<< HEAD
import { View, Button, Platform, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
=======
=======
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
import { View, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
<<<<<<< HEAD
>>>>>>> UI search result and details
=======
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af

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
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '80%',
    margin: 20
  },
  iconClock: {
    // left: 20,
<<<<<<< HEAD
<<<<<<< HEAD
    right:10
=======
    margin: 10
  },
  iconCelander: {
    margin: 10
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
  },
  iconClose: {
    margin: 10
  }
})
<<<<<<< HEAD
const DateAndTimePicker = (props) => {
  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('date')
=======
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
  const [date, setDate] = useState()
  const [mode, setMode] = useState('start')
>>>>>>> UI search result and details
=======
const DateAndTimePicker = props => {
  const [date, setDate] = useState()
  const [mode, setMode] = useState('start')
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
  const hideDatePicker = () => {
    setShow(false)
  }
  const handleConfirm = date => {
    setShow(false)
    setDate(date)
  }
<<<<<<< HEAD
>>>>>>> UI search result and details
=======
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>{props.kind}</Text>
      <View style={styles.iconsContainer}>
<<<<<<< HEAD
<<<<<<< HEAD

        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
        <Ionicons style={styles.iconClock} name='ios-clock' color={mode == 'time' ? 'green' : 'black'} size={40} onPress={showTimepicker}/>
        <MaterialCommunityIcons style={styles.iconCelander} name="calendar-range" color={mode == 'date' ? 'green' : 'black'} size={40} onPress={showDatepicker}/>
      </View>
      {/* <View>
        <Button onPress={showTimepicker} title='Show time picker!' />
      </View> */}
=======
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
=======
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
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
      {!show && date && (
        <View>
          <Text
            style={{ textAlign: 'center' }}
          >{`Date: ${date.getDate()}/${date.getDay()}/${date.getFullYear()}`}</Text>
          <Text style={{ textAlign: 'center' }}>
            {`Time: ${date.getHours()}:${date.getMinutes()}`}{' '}
          </Text>
        </View>
      )}
<<<<<<< HEAD
>>>>>>> UI search result and details
=======
>>>>>>> 6b925ebfa2e720805cee53bb45d5022acc6c87af
      {show && (
        <DateTimePickerModal
          isVisible={show}
          value={date}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
    </View>
  )
}

export default DateAndTimePicker
