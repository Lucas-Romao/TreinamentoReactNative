import React,  { Component } from "react";
import {Text, View, StyleSheet, TextInput, FlatList, Image, Button} from 'react-native'; // 2
import api from '../service/api';
import Card from '../components/Card';
import Details from '../components/Details';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Home extends Component{
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
        <View style={styles.header}>
          <View style={styles.border}>
            <Image
              style={styles.lupa}
              source={require('../resources/lupa.webp')}
            />
            <TextInput 
              style={styles.input} 
              placeholder={'Procure uma série'} 
              onChangeText={(text) => this.setState({searchText: text})}
              onSubmitEditing={() => this.submitSearch()}
            />
          </View>
        </View>
        <View style={styles.resultadosView}>
          <Text style={styles.resultados}>{this.state.searchResults != null ? 'Resultados da Busca' : '' }</Text>
        </View>
        <View>
          <FlatList
            data={this.state.searchResults}
            renderItem={({ item }) => 
              <View style={styles.cards}>
                <Card 
                  descricao={item.show.summary}
                  image={item.show.image == null ? 'https://i.ibb.co/YfZFr7k/noimg.png' : (item.show.image.original || item.show.image.medium) }
                  title={item.show.name}
                  genres={item.show.genres}
                />
              </View>}
            keyExtractor={item => item.show.id}
          />
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    home: Home,
    details: Details,
  },
  {
    initialRouteName: 'home'
  }
);

export default createAppContainer(AppNavigator);

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
    color: '#ebebeb',
  },
  input: {
    fontSize: 15,
    padding: 15,
  }, 
  border: {
    flexDirection: 'row',
    borderColor: '#ebebeb',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    width: 260,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cards: {
    marginBottom: 5,
    width: 260,
  },
  resultados: {
    fontWeight: "bold",
    fontSize: 20,
  },
  results: {
    width: 260,
  },
  resultadosView: {
    margin: 10,
  },
  header: {
    flexDirection: "row",
  },
  lupa: {
    height: 20,
    width: 20,
    marginLeft: 20,
  }
});