import React, {Component} from 'react'; // 1
import {Text, View, StyleSheet, TextInput} from 'react-native'; // 2

// 3
export default class App extends Component {
  render() {
    return (
      // 4
      <View style={styles.hello}>
        <Text style={styles.text}>Hello, world!</Text>
      </View>
    );
  }
}

// 5
const styles = StyleSheet.create({
  hello: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: 'purple',
  },
});