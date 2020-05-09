import React from 'react'
import { View, Image } from 'react-native'
import logo from '../../../images/logo.png'

const HeaderLogo = props => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <Image
        style={{
          width: 60,
          height: 60,
          marginTop: 35,
          marginRight: 28,
          marginBottom: 10,
          alignSelf: 'flex-end'
        }}
        source={logo}
      />
    </View>
  )
}
export default HeaderLogo
