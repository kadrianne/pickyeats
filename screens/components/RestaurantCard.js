import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-native-elements'
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonSection from './ButtonSection'
import Review from './Review'
import { SliderBox } from 'react-native-image-slider-box'
import { YELP_API_TOKEN } from '../../env.config'

export default function RestaurantCard() {

    const dispatch = useDispatch()
    const restaurant = useSelector(state => state.currentRestaurant)
    const moreInfo = useSelector(state => state.moreRestaurantInfo)
    const reviews = useSelector(state => state.reviews)
    const [ showMoreInfo, setShowMoreInfo ] = useState(false)

    const renderCategories = () => {
        const categories = restaurant.categories.map(category => {
            return category.title
        })
        return categories.join(', ')
    }

    const renderPrice = () => {
        if (restaurant.price){
            const priceArray = restaurant.price.split('')
            
            return priceArray.map((dollar,index) => {
                return <Icon key={index} name='dollar' size={20} color="#990000" />
            })
        }r
    }

    const setMoreInfo = (results) => {
        dispatch({type: 'SET_INFO', info: results})
    }

    const getMoreInfo = () => {
        fetch(`https://api.yelp.com/v3/businesses/${restaurant.id}`, {
            headers: {
                'Authorization': `Bearer ${YELP_API_TOKEN}`
            }
        })
            .then(response => response.json())
            .then(setMoreInfo)
    }

    const setReviews = (reviews) => {
        dispatch({type:'SET_REVIEWS', reviews: reviews})
    }

    const getReviews = () => {
        fetch(`https://api.yelp.com/v3/businesses/${restaurant.id}/reviews`, {
            headers: {
                'Authorization': `Bearer ${YELP_API_TOKEN}`
            }
        })
            .then(response => response.json())
            .then(results => setReviews(results.reviews))
    }

    const handleViewMore = () => {
        getMoreInfo()
        getReviews()
       setShowMoreInfo(previousState => !previousState)
    }

    const getHours = () => {
        // hours = restaurantInfo.hours
        // console.log(restaurantInfo.hours)
    }

    const displayReviews = () => {
        return reviews.map(review => {
            return <Review review={review} />
        })
    }

    return (
        <>
        <View style={ showMoreInfo === false ? styles.card : styles.cardExpanded }>
            { showMoreInfo === false
                ? <Image
                source={{uri: `${restaurant.image_url}`}} 
                style={styles.image}
                />
                // : null
                : <View style={{position: 'relative', zIndex: 1, height: '30%'}}>
                    {moreInfo.photos ? <SliderBox imageComponentStyle={styles.image} images={moreInfo.photos} /> : null}
                </View>
            }
            <Text style={styles.title}>{restaurant.name}</Text>
            <ScrollView contentContainerStyle={showMoreInfo === false ? styles.cardInfo : null}>
                <View style={styles.infoView}>
                    <View style={styles.ratingView}>
                        <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text><Icon name='star' size={22} color="#990000" />
                    </View>
                    <View style={styles.priceView}>
                        {renderPrice()}
                    </View>
                </View>
                <Text style={styles.boldText}>{renderCategories()}</Text>
                <View style={styles.address}>
                    {restaurant.location.display_address.length <= 2
                        ? <><Text style={styles.text}>{restaurant.location.display_address[0]}</Text>
                        <Text style={styles.text}>{restaurant.location.display_address[1]}</Text></>
                        : <><Text style={styles.text}>{`${restaurant.location.display_address[0]}, ${restaurant.location.display_address[1]}`}</Text>
                        <Text style={styles.text}>{restaurant.location.display_address[2]}</Text></>
                    }
                    { showMoreInfo === false ? null : <Text style={styles.text}>{restaurant.display_phone}</Text> }
                </View>
                { showMoreInfo === false 
                ? <Button
                    buttonStyle={styles.button} titleStyle={styles.buttonText} type='outline'
                    icon={{
                        name: 'arrow-downward',
                        size: 30,
                        color: Colors.burgundy
                    }}
                    iconRight
                    title='VIEW MORE'
                    onPress={handleViewMore}
                    /> 
                : <>
                    {/* <Text style={styles.openText}>OPEN NOW</Text> */}
                    <Text style={styles.boldText}>Reviews ({restaurant.review_count})</Text>
                    {displayReviews()}
                    {/* <Text >{restaurantInfo.hours}</Text> */}
                    <Button
                        buttonStyle={styles.button} titleStyle={styles.buttonText} type='outline'
                        icon={{
                            name: 'arrow-upward',
                            size: 30,
                            color: Colors.burgundy
                        }}
                        iconRight
                        title='SHOW LESS'
                        onPress={handleViewMore}
                    /> 
                </> }
            </ScrollView>
        </View>
        { showMoreInfo === false ? <ButtonSection /> : null }
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
    },
    cardExpanded: {
        backgroundColor: Colors.orange,
        height: '92%',
        width: '100%',
        justifyContent: 'space-between'
    },
    cardInfo: {
        marginTop: 5,
        height: '100%',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2
    },
    image: {
        width: '100%',
        aspectRatio: 5/3,
        borderRadius: 5,
        margin: 5,
        position: 'relative',
        zIndex: 1
    },
    title: {
        fontFamily: 'LondrinaShadow-Regular',
        fontSize: 42,
        textAlign: 'center',
        marginHorizontal: 15,
        marginBottom: 5,
        lineHeight: 45
    },
    text: {
        fontFamily: 'Raleway-Light',
        fontSize: 16,
        textAlign: 'center',
    },
    infoView:{
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10
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
    boldText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 18,
        color: Colors.burgundy,
        marginHorizontal: 15,
        textAlign: 'center',
        marginVertical: 10
    },
    priceView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    address: {
        marginVertical: 10
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