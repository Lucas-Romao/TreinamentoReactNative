import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

class Card extends Component{

    render(){
        return(
            <TouchableOpacity style={styles.card} 
                onPress={
                    () => this.props.navigation.navigate('details', {
                        nome: this.props.title,
                        genero: this.props.genres.join(', '),
                        descricao: this.props.descricao,
                        image: this.props.image,
                    })}>
                <View style={styles.marcacao}>
                <Image
                    style={styles.image}
                    source={{uri: this.props.image}}
                />
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>{this.props.title || 'Sem Nome'}</Text>
                    <Text style={styles.description}>{this.props.genres.join(', ') || 'Sem Genero'}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(Card);

const styles = StyleSheet.create({
    info: {
        flex: 1,
        marginTop: 10,
        marginLeft: 5,
        flexDirection: "column",
    }, 
    image: {
        width: 80,
        height: 120,
        resizeMode: "contain",
        borderRadius: 15,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#ebebeb",
        borderRadius: 10,
    },
    description: {
        marginTop: 9,
    },
    marcacao: {
        margin: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    }
})