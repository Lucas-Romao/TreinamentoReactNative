import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

class Card extends Component{

    render(){
        return(
            <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('details')}>
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
            </TouchableOpacity>
        )
    }
}

export default withNavigation(Card);

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
        borderRadius: 15,
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