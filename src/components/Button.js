import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Gradient from 'react-native-linear-gradient';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../global";


export function Button(props) {

    const [ color, setColor ] = useState(['#FF7239', '#FF4700']);
    const [ content, setContent ] = useState(<Text style={styles.textSemiBold}>{props.title}</Text>);
    const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {

        switch (props.status) {
            case 'loading':
                setColor(['#FF4700', '#FF7239']);
                setContent(<ActivityIndicator size="large" color="#FFFFFF" />)
                setDisabled(true);
                break;
            case 'done':
                setColor(['#FF7239', '#FF4700']);
                setContent(<Text style={[styles.textSemiBold, { color: '#FFFFFF' }]}>Feito!</Text>)
                setDisabled(true);
                break;
            default:
                setColor(['#FF7239', '#FF4700']);
                setContent(<Text style={[styles.textSemiBold, { color: '#FFFFFF' }]}>{props.title}</Text>);
                setDisabled(false);
        }

        if(props.disabled == true) {
            setColor(['#F5F5F5', '#F5F5F5']);
            setContent(<Text style={styles.textSemiBold}>{props.disabledText}</Text>);
            setDisabled(true);
        }
        
    }, [props])

    return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={[props.style]}
            onPress={props.action}
            disabled={disabled}
        >
            <Gradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                colors={color}
                style={styles.button}
            >
                {content}
            </Gradient>
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
            onPress={props.action}
            disabled={props.disabled}
        >
            <Gradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                colors={['#FF7239', '#FF4700']}
                style={[
                    styles.actionButton,
                    props.style,
                ]}
            >
                <MI
                    name={props.icon}
                    size={32}
                    color='#FFFFFF'
                />
            </Gradient>
            
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