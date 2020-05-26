import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import Colors from '../../styles/Colors'
import MatchOverlay from './MatchOverlay'

export default function ButtonSection({ handleLike, handleDislike, removeRestaurantFromList, toggleOverlay, visible }) {

    const handleBackdropPress = () => {
        toggleOverlay()
        removeRestaurantFromList()
    }

    return (
        <View style={styles.buttonView}>
            <Button
                raised
                buttonStyle={styles.button} type='solid'
                icon={{
                    name: 'thumb-down',
                    size: 35,
                    color: Colors.orange
                }}
                onPress={handleDislike}
            />
            <Button
                raised
                buttonStyle={styles.button} type='solid'
                icon={{
                    name: 'thumb-up',
                    size: 35,
                    color: Colors.orange
                }}
                onPress={handleLike}
            />
            <Overlay children={<MatchOverlay removeRestaurantFromList={removeRestaurantFromList} />} 
                overlayStyle={styles.match} 
                isVisible={visible} 
                onBackdropPress={handleBackdropPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 25
    },
    button: {
        backgroundColor: Colors.burgundy,
        borderRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    match: {
        backgroundColor: Colors.white,
        width: 350,
        alignItems: 'center',
    }
})