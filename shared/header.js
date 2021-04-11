import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Materialicons } from '@expo/vector-icons';

export default function header({ title }) {
    return (
        <View style = {styles.header}>
            <Text style = {styles.headerText}> { title  }</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
    },
})