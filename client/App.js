import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyDrawerNavigator from './src/Components/Navigation/Navigation'

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation></Navigation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
