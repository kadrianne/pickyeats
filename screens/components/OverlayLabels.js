import React from 'react'
import { StyleSheet, Text, Animated } from 'react-native'
import Colors from '../../styles/Colors'

export default function OverlayLabel({ color, label, rotation, top, left, right, opacity }) {
    return (
        <Animated.View style={[styles.overlayLabel, { opacity, transform: [{rotate: rotation }], top, left, right, borderColor: color, backgroundColor: color }]}>
            <Text style={styles.overlayLabelText}>{label}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    overlayLabel: {
        position: 'absolute',
        elevation: 50,
        padding: 10,
        borderRadius: 5,
    },
        overlayLabelText: {
        fontSize: 24,
        fontFamily: 'Raleway-Medium',
        textAlign: 'center',
        color: Colors.white
    },
})
