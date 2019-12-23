import React, {Component} from 'react';
import {Text, View, ScrollView,Image, StyleSheet} from 'react-native';

export default class extends Component{

  static navigationOptions = {
    title: 'Details',
  }

  render() {
    return(
      <View style={styles.screen}>
        <View style={styles.card}>
          <Image
            style={styles.image} 
            source={{uri: (this.props.navigation.getParam('image', 'https://i.ibb.co/YfZFr7k/noimg.png' ))}}/>
          <View style={styles.titleView}>
            <Text style={styles.title}>
              {this.props.navigation.getParam('nome', 'Sem Nome')}
            </Text>
          </View>
        </View>
        <View style={styles.descricao}>
          <Text style={styles.genre}>
            {this.props.navigation.getParam('genero', 'Sem Genero')}
          </Text>
          <ScrollView>
            <Text>
              {this.props.navigation.getParam('descricao', 'Sem descricao')}
            </Text>
          </ScrollView>
        </View>
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
})