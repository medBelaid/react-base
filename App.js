import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DrawerNavigator } from 'react-navigation'

import HomeScreen from './Home'
import SettingsScreen from './Settings'
import France24 from './France24'
import Attessia from './Attessia'

const MyApp = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Aljazeera: {
    screen: SettingsScreen
  },
  'France 24': {
    screen: France24
  },
  Attessia: {
    screen: Attessia
  }
})

export default class App extends React.Component {
  render() {
    return (
      <MyApp />
    );
  }
}
