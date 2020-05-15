import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonSection from './ButtonSection'

export default function RestaurantCard({restaurant}) {

    const renderCategories = () => {
        const categories = restaurant.categories.map(category => {
            return category.title
        })
        return categories.join(', ')
    }

    const renderPrice = () => {
        const priceArray = restaurant.price.split('')
        
        return priceArray.map(dollar => {
            return <Icon name='dollar' size={20} color="#990000" />
        })
    }

    return (
        <>
        <View style={styles.card}>
            <Image
                source={{uri: `${restaurant.image_url}`}} 
                style={styles.image}
                />
            <Text style={styles.title}>{restaurant.name}</Text>
            <View style={styles.infoView}>
                <View style={styles.ratingView}>
                    <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text><Icon name='star' size={22} color="#990000" />
                </View>
                <Text style={styles.openText}>OPEN NOW</Text>
                <View style={styles.priceView}>
                    {renderPrice()}
                </View>
            </View>
            <View>
                {restaurant.location.display_address.length <= 2
                    ? <><Text style={styles.text}>{restaurant.location.display_address[0]}</Text>
                    <Text style={styles.text}>{restaurant.location.display_address[1]}</Text></>
                    : <><Text style={styles.text}>{`${restaurant.location.display_address[0]}, ${restaurant.location.display_address[1]}`}</Text>
                    <Text style={styles.text}>{restaurant.location.display_address[2]}</Text></>
                }
            </View>
            <Text style={styles.categoryText}>{renderCategories()}</Text>
            <Button
                buttonStyle={styles.button} titleStyle={styles.buttonText} type='outline'
                icon={{
                    name: 'arrow-downward',
                    size: 30,
                    color: Colors.burgundy
                }}
                iconRight
                title='VIEW MORE' />
        </View>
        <ButtonSection />
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.orange,
        margin: 10,
        height: '75%',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        justifyContent: 'space-between'
    },
    image: {
        width: '100%',
        aspectRatio: 5/3,
        borderRadius: 5,
        margin: 5,
    },
    title: {
        fontFamily: 'LondrinaShadow-Regular',
        fontSize: 42,
        textAlign: 'center',
        marginHorizontal: 15,
        lineHeight: 45
    },
    text: {
        fontFamily: 'Raleway-Light',
        fontSize: 16,
        textAlign: 'center',
    },
    infoView:{
        flexDirection: 'row',
        marginHorizontal: 15
    },
    ratingView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start'
    },
    rating: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 17,
        color: Colors.burgundy,
        textAlign: 'center',
        paddingRight: 5,
    },
    openText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 20,
        color: Colors.burgundy,
    },
    categoryText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 18,
        color: Colors.burgundy,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    priceView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        borderColor: Colors.burgundy,
        borderWidth: 1,
        marginHorizontal: 15,
        marginBottom: 15
    },
    buttonText: {
        color: Colors.burgundy,
        fontSize: 24,
        fontFamily: 'Pompiere-Regular'
    }
})