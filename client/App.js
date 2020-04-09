import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/Components/Navigation/Navigation'
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Screens/Home/Home'

// import {enableScreens} from 'react-native-screens'
// enableScreens()

const styles = StyleSheet.create({
});

export default function App() {
  return (
      <NavigationContainer>
            <Navigation/>
      </NavigationContainer>
  );
}


