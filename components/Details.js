import React, {Component} from 'react';
import {Text, View, ScrollView,Image, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class extends Component{

  storeData = async (chave, valor) => {
    try {
      let val = JSON.stringify(valor)
      await AsyncStorage.setItem('@' + chave, val)
    } catch (e) {
      alert(JSON.stringify('erro: ' + e))
    }
  }

  getData = async (chave) => {
    try {
      const value = await AsyncStorage.getItem('@' + chave)
      if(value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch(e) {
      alert(JSON.stringify('erro: ' + e))
    }
  }
  
  static navigationOptions = {
    title: 'Details',
  }

  state = {
    favorito: false
  }
  
  //TODO salvar shows
  render() {
    return(
      <View style={styles.screen}>
        <View style={styles.card}>
          <Image
            style={styles.image} 
            source={{uri: (this.props.navigation.getParam('image', 'https://i.ibb.co/YfZFr7k/noimg.png' ))}}/>
          <View style={styles.titleView}>
            <Text style={styles.title}>
              {this.props.navigation.getParam('nome', 'Sem nome')}
            </Text>
          </View>
        </View>
        <View style={styles.descricao}>
          <Text style={styles.genre}>
            {this.props.navigation.getParam('genero', 'Sem genero')}
          </Text>
          <View style={styles.pontuacao}>
            <Text>
              {'Pontuação: ' + (this.props.navigation.getParam('rating', 'Sem nota') || 'Sem nota')}
            </Text>
            <TouchableOpacity
              onPress = {
                () => {
                  if(!this.state.favorito){
                    this.getData('favoriteShows').then((shows) => {
                      let newFav = [];
                      console.log('List of shows: ' + JSON.stringify(shows) + "\t" + typeof shows);
                      if(Array.isArray(shows)){
                        console.log('Is array');
                        console.log('Push result: '+ shows.push(this.props.navigation.getParam('show', null)));
                        newFav = shows.push(this.props.navigation.getParam('show', null));
                      } else {
                        console.log('is not array');
                        newFav.push(this.props.navigation.getParam('show', null));
                      }
                      console.log('new Fav: ' + JSON.stringify(newFav) + '\t' + typeof newFav +  "\n\n\n")
                      this.storeData('favoriteShows', newFav)
                    }).catch((erro) => {
                      console.log('Erro ao carregar: ' + erro.message);
                    });
                  } else {
                    this.storeData('favoriteShows', []);
                  }
                  this.setState({favorito: !this.state.favorito});
                }
              }>
              <Image
                style={this.state.favorito ? styles.liked : styles.notLiked}
                source={require('../resources/like.png')}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {parseText(this.props.navigation.getParam('descricao', 'Sem descricao'))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

/**
 * Parseamento das tags do texto
 * 
 * @param {*} text 
 */
function parseText(text) {
  let paragraph = text.substring(text.search('<p>') + 3, text.search('</p>'));
  if(paragraph.search('<b>') !== -1){
    let beforeBold = paragraph.substring(0, paragraph.search('<b>'));
    let bold = paragraph.substring(paragraph.search('<b>') + 3, paragraph.search('</b>'));
    let afterBold = paragraph.substring(paragraph.search('</b>') + 4, paragraph.length)
    return (
      <View>
        <Text>
          {beforeBold}
          <Text style={styles.bold}>
            {bold}
          </Text>
          {afterBold}
        </Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text>
          {paragraph}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    marginBottom: '3%',
  },
  card: {
    width: '60%',
    height: '60%',
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  image: {
    marginTop: '8%',
    flex: 6,
    width: '82%',
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  descricao: {
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '6%',
    width: '85%'
  },
  genre: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: '10%',
    width: '70%',
    height: '8%',
    fontStyle: 'italic',
    backgroundColor: '#ebebeb',
    borderRadius: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  pontuacao: {
    width: '70%',
    height: '8%',
    marginBottom: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  liked: {
    height: 30,
    width: 30,
  },
  notLiked: {
    height: 30,
    width: 30,
    opacity: 0.2,
  }
})