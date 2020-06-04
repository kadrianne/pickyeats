import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Animated, PanResponder } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../styles/Colors'
import ButtonSection from './ButtonSection'
import OverlayLabels from './OverlayLabels'
import { SCREEN_WIDTH } from '../../styles/Dimensions'
import { SliderBox } from 'react-native-image-slider-box'
import RestaurantInfo from './RestaurantInfo'
import { BACKEND_URL } from '../../env.config'

export default function RestaurantCard({ getMatchedRestaurants }) {

    const dispatch = useDispatch()
    const activeParty = useSelector(state => state.activeParty)
    const loggedInUser = useSelector(state => state.loggedInUser)
    const restaurant = useSelector(state => state.currentRestaurant)
    const moreInfo = useSelector(state => state.moreRestaurantInfo)
    const showMoreInfo = useSelector(state => state.showMoreInfo)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [label, setLabel] = useState('')

    let position = new Animated.ValueXY()

    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })

    const rotateAndTranslate = {
        transform: [{ rotate }, ...position.getTranslateTransform()]
    }

    const likeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0,0,1],
        extrapolate: 'clamp'
    })

    const dislikeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1,0,0],
        extrapolate: 'clamp'
    })

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible)
    }

    const removeRestaurantFromList = () => {
        dispatch({ type:'REMOVE_RESTAURANT', restaurant: restaurant })
    }

    const addRestaurantToLiked = (matchedRestaurantID) => {
        const likedRestaurant = {
            yelp_id: restaurant.id,
            name: restaurant.name,
            party: activeParty.id,
            user: loggedInUser.id,
            matched_restaurant: matchedRestaurantID
        }

        fetch(`${BACKEND_URL}/liked-restaurants/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(likedRestaurant)
        })
    }


    const updatePreviouslyLikedRestaurant = (previouslyLikedRestaurant, matchedRestaurantID) => {
        fetch(`${BACKEND_URL}/liked-restaurants/${previouslyLikedRestaurant.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({matched_restaurant: matchedRestaurantID})
        }).then(getMatchedRestaurants)
    }

    const postMatchedRestaurant = (matchedRestaurant) => {
        fetch(`${BACKEND_URL}/matched-restaurants/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(matchedRestaurant)
        }).then(response => response.json())
            .then(results => {
                addRestaurantToLiked(results.id)
                updatePreviouslyLikedRestaurant(matchedRestaurant,results.id)
            })
    }
      
    const checkMatchedRestaurants = (likedRestaurants) => {
        const matchedRestaurant = likedRestaurants.find(currentRestaurant => currentRestaurant.yelp_id == restaurant.id)

        if (matchedRestaurant) {
            postMatchedRestaurant(matchedRestaurant)
            toggleOverlay()
        } else {
            addRestaurantToLiked(null)
            setTimeout(removeRestaurantFromList, 300)
        }

    }

    const displayLike = () => {
        return <OverlayLabels label='YUM' color={Colors.primary} rotation='-30deg' top={100} left={15} />
    }

    const displayDislike = () => {
        return <OverlayLabels label='MEH' color={Colors.secondary} rotation='30deg' top={100} right={15} />
    }

    const handleLike = () => {
        setLabel('like')
        fetch(`${BACKEND_URL}/api/party-restaurants?party_id=${activeParty.id}`)
            .then(response => response.json())
            .then(checkMatchedRestaurants)
    }
    
    const handleDislike = () => {
        setLabel('dislike')
        setTimeout(removeRestaurantFromList, 300)
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onPanResponderMove: (event,gestureState) => {
            position.setValue({ x: gestureState.dx, y: gestureState.dy })
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dx > 120) {
                Animated.spring(position, {
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                    useNativeDriver: true,
                }).start(handleLike,() => {
                    position.setValue({ x: 0, y: 0 })
                })
            } else if(gestureState.dx < -120) {
                Animated.spring(position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                    useNativeDriver: true,
                }).start(handleDislike,() => {
                    position.setValue({ x: 0, y: 0 })
                })
            } else {
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    friction: 4
                }).start()
            }
        }
    })

    const getHours = () => {
        // hours = restaurantInfo.hours
        // console.log(restaurantInfo.hours)
    }

    useEffect(() => {
        setLabel('')
    },[restaurant])

    return (
        <>
        { showMoreInfo === false
            ? <>
            <Animated.View {...panResponder.panHandlers} style={[rotateAndTranslate, styles.card]}>
                {/* <OverlayLabels label='YUM' color={Colors.primary} rotation='-30deg' top={25} left={15} opacity={likeOpacity} />
                <OverlayLabels label='MEH' color={Colors.secondary} rotation='30deg' top={25} right={15} opacity={dislikeOpacity} /> */}
                <Image
                source={{uri: `${restaurant.image_url}`}} 
                style={styles.image}
                />
                <RestaurantInfo />
            </Animated.View>
            <ButtonSection 
                handleLike={handleLike}
                handleDislike={handleDislike}
                removeRestaurantFromList={removeRestaurantFromList}
                toggleOverlay={toggleOverlay}
                visible={overlayVisible}
            />
            { label === 'like' && displayLike() }
            { label === 'dislike' && displayDislike() }
            </>
            : <View style={styles.cardExpanded}>
                <View style={{position: 'relative', zIndex: 1, height: '30%'}}>
                    {moreInfo.photos && <SliderBox imageComponentStyle={styles.image} images={moreInfo.photos} />}
                </View>
                <RestaurantInfo />
            </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.orange,
        marginHorizontal: 10,
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
        position: 'absolute',
        top: 70
    },
    cardExpanded: {
        backgroundColor: Colors.orange,
        height: '92%',
        width: '100%',
        justifyContent: 'space-between'
    },
    image: {
        width: SCREEN_WIDTH - 30,
        aspectRatio: 5/3,
        borderRadius: 5,
        margin: 5,
    },
})