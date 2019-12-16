import React, {Component} from 'react'; // 1
import {Text, View, StyleSheet, TextInput} from 'react-native'; // 2

// 3
export default class App extends Component {
  state = {
    searchText: '',
  }

  render() {
    return (
      // 4
      <View style={styles.screen}>
        <View>
          <TextInput 
            style={styles.input} 
            placeholder={'Procure uma série'} 
            onChangeText={(text) => this.setState({searchText: text})}/>
        </View>
        <View>
          <Text>{this.state.searchText}</Text>
        </View>
      </View>
    );
  }
}

// 5
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: 'purple',
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#999999',
    height: 50,
    width: 270,
    fontSize: 15,
    padding: 15,
  }
});