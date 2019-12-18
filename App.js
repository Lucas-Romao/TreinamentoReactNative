import React, {Component} from 'react'; // 1
import {Text, View, StyleSheet, TextInput, FlatList, Image} from 'react-native'; // 2
import { createAppContainer } from 'react-navigation';
import AppNavigator from './components/Home';

const AppContainer = createAppContainer(AppNavigator);

// 3
export default class App extends Component {
  render() {
    return(
      <AppContainer/>
    )
  }
}