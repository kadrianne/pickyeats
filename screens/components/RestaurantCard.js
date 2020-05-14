import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function RestaurantCard() {

    return (
        <View style={styles.card}>
            <Image
                source={{uri: 'https://lh3.googleusercontent.com/p/AF1QipMB_Up2auSF-xHISadr1qEmQlMUbDW_2JxVLNWE=s1600-w400'}} 
                style={styles.image}
                />
            <Text style={styles.title}>SNOOZE AN A.M. EATERY</Text>
            <View style={styles.infoView}>
                <View style={styles.ratingView}>
                    <Text style={styles.rating}>4.7</Text><Icon name='star' size={22} color="#990000" />
                </View>
                <Text style={styles.openText}>OPEN NOW</Text>
                <View style={styles.priceView}>
                    <Icon name='dollar' size={20} color="#990000" />
                    <Icon name='dollar' size={20} color="#990000" />
                </View>
            </View>
            <View>
                <Text style={styles.text}>2262 Larimer St,</Text>
                <Text style={styles.text}>Denver, CO 80205, USA</Text>
            </View>
            <Button
                buttonStyle={styles.button} titleStyle={styles.buttonText} type='outline'
                title='VIEW MORE' />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.orange,
        margin: 10,
        height: 550,
        borderRadius: 5,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        position: 'relative'
    },
    image: {
        width: '100%',
        aspectRatio: 5/3,
        borderRadius: 5,
        margin: 5,
    },
    title: {
        fontFamily: 'LondrinaShadow-Regular',
        fontSize: 44,
        textAlign: 'center',
        marginHorizontal: 15
    },
    text: {
        fontFamily: 'Raleway-Light',
        fontSize: 16,
        textAlign: 'center',
    },
    infoView:{
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    ratingView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start'
    },
    rating: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 16,
        color: Colors.burgundy,
        textAlign: 'center',
        paddingRight: 5,
    },
    openText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 20,
        color: Colors.burgundy
    },
    priceView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        borderColor: Colors.burgundy,
        borderWidth: 1,
        margin: 15
    },
    buttonText: {
        color: Colors.burgundy,
        fontSize: 24,
        fontFamily: 'Pompiere-Regular'
    }
})