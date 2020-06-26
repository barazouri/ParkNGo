import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'

const Logo = require('../../../../images/logo.png')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30
  },
  welcomeText: {
    fontSize: 30,
    // fontFamily: 'Inter-SemiBoldItalic',
    bottom: 30
  },
  changeMode: {
    fontSize: 20,
    marginBottom: 10
  }
})

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      toggleStatus: false
    }
    this.changeToggle = this.changeToggle.bind(this)
  }
  changeToggle () {
    const { route } = this.props
    this.setState({ toggleStatus: !this.state.toggleStatus })
    if (this.state.toggleStatus === false) {
      this.setState(
        { changeUserTo: 'host' },
        route.params.changeKindUser('host')
      )
    } else {
      this.setState(
        { changeUserTo: 'driver' },
        route.params.changeKindUser('driver')
      )
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>WELCOME</Text>
        <Text style={styles.welcomeText}>
          {this.state.toggleStatus ? 'Host' : 'Driver'}
        </Text>
        <Image style={styles.logo} source={Logo}></Image>
        <Text style={styles.changeMode}>Change mode Driver/Host</Text>
        <ToggleSwitch
          isOn={this.state.toggleStatus}
          onColor='blue'
          offColor='green'
          labelStyle={{ color: 'black', fontWeight: '900' }}
          size='large'
          onToggle={this.changeToggle}
        />
      </View>
    )
  }
}
export default Home
