import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, Animated, ActivityIndicator } from 'react-native';
import styles from '../global';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { regexMed, treatPrice } from '../utils/treatString';

import { InfoOrder } from '../components/Info';

import cardImage from '../assets/illustrations/repeat_food.png';
import { LinearButton } from './Button';

export function NavItem(props) {
    return (
        <TouchableOpacity style={styles.action} onPress={props.action}>
            <View style={styles.iconAction}>
                <MI name={props.icon} size={32} color="#333333" />	
            </View>
            <View style={{flexGrow: 1, justifyContent: 'center'}}>
                <Text style={styles.textSemiBold}>{props.title}</Text>
                <Text style={styles.subtitleTextAction}>{props.subtitle}</Text>
            </View>
            <View style={styles.arrowAction}>
                <MI name="chevron-right" size={32} color="#666666" />	
            </View>
        </TouchableOpacity>
    )
}

export function Avatar(props) {
    return (
        <View style={styles.store}>
            <TouchableOpacity onPress={props.action}>
                { !props.loading ?
                <Image
                    style={styles.storeAvatar}
                    source={
                        !props.image.uri ?
                        cardImage
                    : 
                        props.image
                    }
                    resizeMode={'cover'}
                />
                :
                    <View style={[styles.storeAvatar, { backgroundColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' }]}>
                       <ActivityIndicator size='small' color="#639DFF" />
                    </View>
                    
                }
                { props.isChangeable && !props.loading && 
                <View style={styles.boxFloatButton}>
                    <View
                    style={[styles.buttonFloat, { width: 32, height: 32, display: props.transparent ? 'none' : 'flex' }]}>
                        <MI
                            name={props.icon}
                            color='#fff'
                            size={32}
                        />
                    </View> 
                </View>
                }
                       
            </TouchableOpacity>
            
            <View style={{ flexGrow: 1, paddingLeft: 16}}>
                <View style={{ flexDirection: 'row'}}>
                    {props.title === '' || props.title === undefined ?
                        <View style={styles.titleHide} />
                    :
                        <Text style={[styles.title, styles.textWrap, {
                            marginBottom: 0,
                            fontSize: 30 - (props.title.length * 0.3)
                        }]}>{props.title}</Text>
                    }
                </View>
                    {!props.subtitle ? 
                        <View style={[styles.textHide,{ marginTop: 4 }]}/>
                    : 
                        <View style={{flexDirection: 'row'}}>
                            <MI name='whatsapp' color='#333333' size={16} style={{ marginTop: 3, marginRight: 4}}/>
                            <Text style={styles.text}>{props.subtitle}</Text>
                        </View>
                    }
            </View>
        </View>
    )
}

export function Card(props) {

    return (
        <TouchableOpacity style={[styles.box, props.style]} onPress={props.action}>
            {props.image &&
                <Image
                    style={styles.boxImage}
                    source={
                        {uri: props.image }
                    }
                    resizeMode='cover'
                />
            }
            
            <View style={styles.boxBody}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.textWrap, styles.textBold]}>{props.title && regexMed(props.title)}</Text>
                </View>
                { props.price &&
                    <Text style={styles.textSemiBold}>{treatPrice(props.price)}</Text>
                }
                
            </View>

        </TouchableOpacity>
    )
}

export function CardOrder(props) {

    return (
        <TouchableOpacity style={styles.box} onPress={props.action}>
            <View style={{ flexGrow: 1 }}>
                <Text style={styles.textBold}>{regexMed(props.title).toUpperCase()}</Text>
                <Text style={[styles.text]}>{regexMed(props.address).toUpperCase()}</Text> 
                {props.status[0] == 'done' && <Text style={styles.text}>{props.status[2]}</Text>}
                {props.status[0] == 'lost' && <Text style={styles.text}>{props.status[1]}</Text>}
            </View>
            <View>
                <Text style={[styles.textSemiBold, { marginTop: 0 }]}>{treatPrice(props.price)}</Text>
                <Text style={[styles.textBold, { alignSelf: 'flex-end', color: '#639DFF' }]}>{props.time}</Text>
            </View>
        </TouchableOpacity>
    )
}

export function CardItem(props) {

    return (
        <View style={[styles.box, { flexDirection: 'row', marginBottom: 8 }]}>
            <Text style={[styles.text,{ marginRight: 8}]}>{props.amount}x</Text>
            <Text style={[styles.textWrap, styles.text]}>{regexMed(props.title)}</Text>
            <Text style={[styles.textSemiBold, { marginTop: 0 }]}>{treatPrice(props.price)}</Text>
        </View>
    )
}

export function Checkout(props) {

    const [ wasClicked, setWasClicked ] = useState(false);
    const [ viewSize, setViewSize ] = useState(0);

    const translateY = new Animated.Value(0);
    const marginAnim = new Animated.Value(-16);

    let offset = 0;

    const sendInfoClicked = () => {
        setWasClicked(true);
        setTimeout(() => setWasClicked(false), 1000)
    }

    const animatedEvent = Animated.event([
        {
            nativeEvent: {
                translationY: translateY
            }
        }
    ], { useNativeDriver: true });

    function onHandlerStateChanged(event) {
        if(event.nativeEvent.oldState === State.ACTIVE) {

            let opened = false;

            const { translationY } = event.nativeEvent;

            offset += translationY;

            if(translationY >= -80) {
                opened = true;
            } else {
                translateY.setValue(offset);
                translateY.setOffset(-430);
                offset = -430;
            }

            Animated.timing(translateY, {
                toValue: opened ? 430 : 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                offset = opened ?  0 : -430;
                translateY.setOffset(offset);
                translateY.setValue(0);
            });

            Animated.timing(marginAnim, {
                toValue: opened ? -16 : 16,
                duration: 300,
                useNativeDriver: true
            }).start();

        }
    }

    return (
        <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
        >
            <Animated.View
                onLayout={
                    event => {
                        const { height } = event.nativeEvent.layout;
                        setViewSize(-(height - 64));
                    }
                }
                style={[
                    styles.orderCheckout,
                    {
                        bottom: viewSize,
                        transform: [{
                            translateY: translateY.interpolate({
                                inputRange: [viewSize, 0],
                                outputRange: [viewSize, 0],
                                extrapolate: 'clamp'
                            })
                        }],
                    }
                ]}
            >
                <Animated.View
                    style={[styles.orderHeader,
                        {
                        zIndex: 99,
                        opacity: translateY.interpolate({
                            inputRange: [ -50, 0 ],
                            outputRange:[ 0, 1 ]
                        })

                    }]}
                >
                    <TouchableOpacity
                        style={styles.orderDropButton}
                        onPress={sendInfoClicked}
                    >
                        {wasClicked ?
                            <View style={{ alignItems: 'center' }}>
                                <MI name='menu-up' color='#FFFFFF' size={32}/>
                                <Text style={[styles.text,{ marginTop: -10, color: '#FFFFFF' }]}>Segure e arraste pra cima</Text>
                            </View>
                        :
                            <>
                            <View>
                                <MI name='bike' color='#FFFFFF' size={32}/>  
                            </View>
                            </> 
                        }   
                    </TouchableOpacity>     
                </Animated.View>

                <View
                    style={[
                        styles.orderHeader,
                        {backgroundColor: '#FFFFFF'}
                    ]}
                >
                    <TouchableOpacity
                        style={styles.orderDropButton}
                        onPress={sendInfoClicked}
                    >
                        <View>
                            <MI name='chevron-down' color='#639DFF' size={32}/>
                        </View>
                    </TouchableOpacity>
                    
                </View>              
                
                <InfoOrder data={props.data} action={props.action}/>

            </Animated.View>
        </PanGestureHandler>  
    )
}

export function Modal(props) {

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