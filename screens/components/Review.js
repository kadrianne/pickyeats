import React from 'react'
import { StyleSheet, View, Text, Image, Linking } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../styles/Colors'

export default function Review({ review }) {

    const date = review.time_created.split(' ')[0]
    const splitDate = date.split('-')
    const year = splitDate[0]
    const month = splitDate[1]
    const day = splitDate[2]

    return (
        <View style={styles.review}>
            <View style={styles.userContainer}>
                <Text style={styles.name}>{review.user.name}</Text>
                <Image style={styles.image} source={{uri: `${review.user.image_url}`}} />
            </View>
            <View style={styles.textContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.rating}>Rating: {review.rating}</Text>
                    <Text style={styles.rating}>{month}/{day}/{year}</Text>
                </View>
                <Text style={styles.text}>{review.text}</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(review.url)}>Read more...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    review: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    image: {
        width: '100%',
        // height: '10%',
        aspectRatio: 1,
        borderRadius: 100,
    },
    userContainer: {
        flex: 1,
        marginHorizontal: 10,
    }, 
    textContainer: {
        marginHorizontal: 5,
        flex: 3
    }, 
    name: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
        color: Colors.burgundy
    },
    rating: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 16,
        marginBottom: 5,
        color: Colors.burgundy
    },
    text: {
        fontFamily: 'Raleway-Light',
        fontSize: 14,
    },
    link: {
        fontFamily: 'Raleway-Light',
        fontSize: 14,
        textDecorationLine: 'underline',
        textAlign: 'right'
    }
})