import React from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../global';

export function PreviewImage(props) {
    
    return (
        <View style={{ justifyContent: 'flex-end', marginBottom: 16 }}>
            {props.image.uri ?
                <Image
                    source={props.image}
                    style={styles.fullImage}
                    resizeMode='cover'
                />
            : 
                <View style={{ height: 100 }}/>
            }
            
            <View style={styles.groupFloatButton}>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={props.action}
                >
                    {props.loading ?
                        <ActivityIndicator size='large' color='#FFFFFF'/>
                    :
                        <MI
                            name={props.icon}
                            color='#FFFFFF'
                            size={32}
                        />
                    }
                    
                </TouchableOpacity>

            </View>
            
        </View>
    )
}