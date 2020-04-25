import React from 'react'
import { View, Image } from 'react-native'

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
        source={require('../../../images/logo.png')}
      />
    </View>
  )
}
export default HeaderLogo
