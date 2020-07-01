import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../global";


export function Button(props) {

    const [ color, setColor ] = useState('#FF4700');
    const [ content, setContent ] = useState(<Text style={styles.textSemiBold}>{props.title}</Text>);
    const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {

        switch (props.status) {
            case 'loading':
                setColor('#E2E2E2');
                setContent(<ActivityIndicator size="large" color="#266EE8" />)
                setDisabled(true);
                break;
            case 'done':
                setColor('#266EE8');
                setContent(<Text style={[styles.textSemiBold, { color: '#FFFFFF' }]}>Feito!</Text>)
                setDisabled(true);
                break;
            default:
                setColor('#FF4700');
                setContent(<Text style={[styles.textSemiBold, { color: '#FFFFFF' }]}>{props.title}</Text>);
                setDisabled(false);
        }

        if(props.disabled == true) {
            setColor('#F5F5F5');
            setContent(<Text style={styles.textSemiBold}>{props.disabledText}</Text>);
            setDisabled(true);
        }
        
    }, [props])

    return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={[props.style, styles.button, { backgroundColor: color }]}
            onPress={props.action}
            disabled={disabled}
        >
            {content}
        </TouchableOpacity>
    )
}

export function ButtonTransparent(props) {
    return(
        <TouchableOpacity
            style={styles.buttonTransparent}
            onPress={props.action}
        >
            
            <MI
                style={{ paddingRight: 8 }}
                name={props.icon} 
                size={16}
                color='#333333'
            />
            <Text style={styles.textSemiBold}>
                {props.title}
            </Text>

        </TouchableOpacity>
    )
}

export function ActionButton(props) {
    return (
        <TouchableOpacity
            style={[
                styles.actionButton,
                props.style,
                props.title && { backgroundColor: null }
            ]}
            onPress={props.action}
            disabled={props.disabled}
        >
            <MI
                name={props.icon}
                size={32}
                color='#FFFFFF'
            />
        </TouchableOpacity>
    )
}

export function LinearButton(props) {
    return (
        <TouchableOpacity
            style={props.style}
            onPress={props.action}
        >
            <MI
                name={props.icon}
                size={32}
                color={props.color || '#333333'}
            />
        </TouchableOpacity>
    )
}

export function FilterButton(props) {
    return (
        <TouchableOpacity
            onPress={props.action}
        >
            <MI name={props.icon} size={32} color="#333333" />
            <MI
                style={{
                    position: 'absolute',
                    top: 8,
                    left: -12,
                }}
                name={props.subIcon}
                size={24}
                color='#FF4700'

            />
        </TouchableOpacity>
    )
}