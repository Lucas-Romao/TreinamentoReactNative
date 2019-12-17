import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default class Card extends Component{

    render(){
        return(
            <View>
                <View>
                    <Image
                        style={styles.image}
                        source={{uri: this.props.info.image == null ? 'https://i.ibb.co/YfZFr7k/noimg.png' : (this.props.info.image.original || this.props.info.image.medium) }}
                    />
                </View>
                <View style={styles.info}>
                    <Text>{this.props.title || 'Sem Nome'}</Text>
                    <Text>{formatGenre(this.props.genre) || 'Sem Genero'}</Text>
                </View>
            </View>
        )
    }
}
function formatGenre(genres){
    string = '';
    for(genre in genres){
        string = string + genre + ", "
    }
    return string;
}

const styles = StyleSheet.create({
    info: {
        flexDirection: "column",
        justifyContent: "space-around",
    }, 
    image: {
        width: 80,
        height: 120,
        resizeMode: "contain",
    }
})