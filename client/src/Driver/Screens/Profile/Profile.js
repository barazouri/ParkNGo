import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.changeUsermode = this.changeUsermode.bind(this)
    this.state = {
      changeUserTo: 'host'
    }
  }
  changeUsermode () {
    const { route } = this.props
    if (this.state.changeUserTo == 'driver') {
      this.setState(
        { changeUserTo: 'host' },
        route.params.changeKindUser(this.state.changeUserTo),
      )
    } else {
      this.setState(
        { changeUserTo: 'driver' },
        route.params.changeKindUser(this.state.changeUserTo)
      )
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.changeUsermode}
          title={`change to ${this.state.changeUserTo}`}
        />
        {/* <Text>hello</Text> */}
      </View>
    )
  }
}
export default Profile

