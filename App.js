import React, {Component} from 'react'; // 1
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native'; // 2
import api from './service/api';
import Card from './components/Card';

// 3
export default class App extends Component {
  state = {
    searchText: '',
    searchResults: null,
  }

  submitSearch = async () => {
    if(this.state.searchText != ''){
      try{
        const response = await api.get('search/shows', {
          params: {q: this.state.searchText}
        })
        this.setState({searchResults: response.data})
      } catch(error) {
        alert(JSON.stringify('erro: ' + error))
      }
    }
  }

  render() {
    return (
      // 4
      <View style={styles.screen}>
        <View style={styles.border}>
          <TextInput 
            style={styles.input} 
            placeholder={'Procure uma série'} 
            onChangeText={(text) => this.setState({searchText: text})}
            onSubmitEditing={() => this.submitSearch()}/>
        </View>
        <View>
          <Text>{this.state.searchText}</Text>
        </View>
        <View style={styles.results}>
          <FlatList
            data={this.state.searchResults}
            renderItem={({ item }) => 
              <Card 
                title={item.show.name}
                genre={item.show.genre}
              />}
            keyExtractor={item => item.show.id}
          />
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
    fontSize: 50,
    color: '#999999',
  },
  input: {
    fontSize: 15,
    padding: 15,
  }, 
  border: {
    flexDirection: 'row',
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    width: 260,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});