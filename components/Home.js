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

  static navigationOptions = {
    title: 'Home',
  }

  submitSearch = async () => {
    if(this.state.searchText != ''){
      try{
        const response = await api.get('search/shows', {
          params: {q: this.state.searchText}
        })
        this.setState({searchResults: response.data});
      } catch(error) {
        alert(JSON.stringify('erro: ' + error));
      }
    } else {
      this.setState({searchResults: null});
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
        {this.state.searchResults != null ? (
        <View style={styles.resultadosView}>
          <Text style={styles.resultados}>{'Resultados da Busca'}</Text>
        </View>) : null}

        <View style={styles.flatview}>
          <FlatList
            style={styles.flat}
            data={this.state.searchResults}
            renderItem={({ item }) => 
              <View>
                <View style={styles.maxcard}>
                  <View style={styles.cards}>
                    <Card 
                      show={item.show}
                    />
                  </View>
                </View>
              </View>
            }
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
    initialRouteName: 'home',
    defaultNavigationOptions: {
      headerStyle: {
        //
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
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
    flex: 1,
    flexDirection: 'row',
    borderColor: '#ebebeb',
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cards: {
    flex: 0.8,
    marginBottom: 5,
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
    marginBottom: 5,
  },
  lupa: {
    height: 20,
    width: 20,
    marginLeft: 20,
  },
  flat: {
    width: '100%',
    marginBottom: 110,
  },
  maxcard: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flatview: {
    marginTop: 5,
    width: '100%',
  }
});