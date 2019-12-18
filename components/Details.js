import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default class extends Component{
  render() {
    return(
      <View>
        <Text>{this.props.navigation.getParam('nome', 'Sem Nome')}</Text>
        <Text>{this.props.navigation.getParam('genero', 'Sem Genero')}</Text>
        <Text>{this.props.navigation.getParam('descricao', 'Sem descricao')}</Text>
      </View>
    )
  }
}