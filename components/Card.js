import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default class Card extends Component{

    render(){
        return(
            <View style={styles.card}>
                <View>
                <Image
                    style={styles.image}
                    source={{uri: this.props.image}}
                />
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>{this.props.title || 'Sem Nome'}</Text>
                    <Text style={styles.Text}>{this.props.genres.join(', ') || 'Sem Genero'}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    info: {
        flexDirection: "column",
        marginLeft: 10,
        marginTop: 10,
        alignContent: "space-between",
    }, 
    image: {
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 3,
        width: 80,
        height: 120,
        resizeMode: "contain",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#ebebeb",
        borderRadius: 10,
    },
    text: {
        marginBottom: 5,
    },
})