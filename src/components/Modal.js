import React from 'react';
import { View, Text } from 'react-native';

import styles from '../global';
import { LinearButton, ActionButton} from '../components/Button'

export function AlertCenter(props) {
    return (
        props.active ?
        <View style={styles.backgroundModal}>
            <View style={styles.modal}>
                <View style={styles.headerModal}>
                    <Text style={[styles.textBold,{ width:'85%' }]}>{props.title}</Text>
                    <LinearButton style={{ width: '10%' }} icon='close' action={props.actionClose} />
                </View>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
        :null
    )
}

export function AlertNotification(props) {
    return (
        <View style={[styles.alertBottom,{ bottom: props.show ? 0 : -999 }]}>
            <Text style={[styles.textBold, { color: '#FFFFFF' }]}>{props.title}</Text>
            <Text style={[styles.text, { color: '#FFFFFF' }]}>{props.text}</Text>
        </View>
    )
}

export function ChooseImageMode(props) {
    return (
        props.active ?
        <View style={styles.backgroundModal}>
            <View style={styles.modal}>
                <View style={styles.headerModal}>
                    <Text style={[styles.textBold, { marginRight: 20 }]}>{props.title}</Text>
                    <LinearButton icon='close' action={props.actionClose} />
                </View>
                <View style={[styles.row, { justifyContent: 'center' }]}>
                    <ActionButton style={{ marginRight: 8 }} icon='camera-outline' action={props.actionCamera} />
                    <ActionButton style={{ marginLeft: 8 }} icon='image-filter' action={props.actionGallery} />
                </View>
            </View>
        </View>
        :null
    )
}

export function Modal(props) {
    return (
        props.active ?
        <View style={styles.backgroundModal}>
            <View style={styles.modal}>
                <View style={styles.headerModal}>
                    <Text style={[styles.textBold, { marginRight: 20 }]}>{props.title}</Text>
                    <LinearButton icon='close' action={props.actionClose} />
                </View>
                {props.children}
            </View>
        </View>
        :null
    )
}
