import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import Review from './Review'
import { YELP_API_TOKEN } from '../../env.config'

export default function RestaurantInfo(){

    const dispatch = useDispatch()
    const restaurant = useSelector(state => state.currentRestaurant)
    const moreRestaurantInfo = useSelector(state => state.moreRestaurantInfo)
    const showMoreInfo = useSelector(state => state.showMoreInfo)
    const reviews = useSelector(state => state.reviews)

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
        }
    }

    const displayReviews = () => {
        return reviews.map((review, index) => {
            return <Review key={index} review={review} />
        })
    }

    const setMoreInfo = (results) => {
        dispatch({type: 'SET_INFO', info: results})
    }

    const getMoreInfo = () => {
        fetch(`https://api.yelp.com/v3/businesses/${restaurant.id}`, {
            headers: {
                'Authorization': `Bearer ${YELP_API_TOKEN}`
            }
        }).then(response => response.json())
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
        }).then(response => response.json())
            .then(results => setReviews(results.reviews))
    }

    const handleViewMore = () => {
        if (!moreRestaurantInfo.id) {
            getMoreInfo()
            getReviews()
        }
        dispatch({ type: 'TOGGLE_INFO' })
    }

    return (
        <>
        <Text style={styles.title}>{restaurant.name}</Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={ !showMoreInfo && styles.cardInfo }>
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
                { showMoreInfo && <Text style={styles.text}>{restaurant.display_phone}</Text> }
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
        </>
    )
}

const styles = StyleSheet.create({
    cardInfo: {
        marginTop: 5,
        height: '100%',
        justifyContent: 'space-between',
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