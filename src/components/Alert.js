import React from 'react';
import { View, Text } from 'react-native';

import styles from '../global';

export function AlertNotification(props) {
    return (
        <View style={[styles.alertBottom,{ bottom: props.show ? 0 : -999 }]}>
            <Text style={[styles.textBold, { color: '#FFFFFF' }]}>{props.title}</Text>
            <Text style={[styles.text, { color: '#FFFFFF' }]}>{props.text}</Text>
        </View>
    )
}