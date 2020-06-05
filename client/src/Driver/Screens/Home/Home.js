import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
const Logo = require('../../../../images/logo.png')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 300
  },
  welcomeText: {
    fontSize: 30,
    // fontFamily: 'Inter-SemiBoldItalic',
    bottom:30
  }
})

class Home extends React.Component {
  render () {
    return (
        <View style={styles.container}>
          <Text style={styles.welcomeText}>WELCOME!</Text>
          <Image style={styles.logo} source={Logo}></Image>
        </View>
    )
  }
}
export default Home
