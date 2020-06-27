import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../global';

export function Input(props) {

    const err = () => {
        if(!props.error) return;
        if(props.error.input == props.name) return true;
    }

    function treatContent(content){
        if(typeof content === 'number') return content.toFixed(2);
        return content;
    }

    return (
        <View style={[styles.groupInput, props.style ]}>
            <View style={styles.labelInput}>
                <Text
                    style={[styles.labelText, styles.textSemiBold, {
                        color: err() ? '#E63B2E' : '#333333'
                    }]}>
                    {props.title}
                </Text>
            </View>
            <TextInput
                style={[styles.textInput,{
                    borderColor: err() ? '#E63B2E' : '#E2E2E2',
                    borderWidth: err() ? 2 : 1,
                }]}
                placeholder={props.placeholder}
                onChangeText={props.action}
                defaultValue={treatContent(props.default)}
                autoFocus={props.focus || false}
                keyboardType={props.keyboard || 'default'}
                maxLength={props.maxLength || 20}
                autoCapitalize= { props.capitalize || 'sentences' }
            />
            {err() && <Text style={styles.inputTextAlert}>{props.error.text}</Text>} 
        </View>
    )
}

export function InputPassword(props) {

    const err = () => {
        if(!props.error) return;
        if(props.error.input == props.name) return true;
    }

    return (
        <View style={styles.groupInput}>
            <View style={styles.labelInput}>
                <Text
                    style={[styles.labelText, styles.textSemiBold, {
                        color: err()  ? '#E63B2E' : '#333333'
                    }]}>
                    {props.title}
                </Text>
            </View>
            <TextInput
                style={[styles.textInput,{
                    borderColor: err()  ? '#E63B2E' : '#E2E2E2',
                    borderWidth: err()  ? 2 : 1,
                }]}
                onChangeText={props.action}
                secureTextEntry={true}
                password={true}
                placeholder={props.placeholder}
                maxLength={20}                 
            />
            {err() && <Text style={styles.inputTextAlert}>{props.error.text}</Text>} 
        </View>
    )
}

export function TextArea(props) {

    const err = () => {
        if(!props.error) return;
        if(props.error.input == props.name) return true;
    }

    return (
        <View style={styles.groupInput}>
            <View style={styles.labelInput}>
                <Text style={[styles.labelText, styles.textSemiBold]}>{props.title}</Text>
            </View>
            <TextInput
                multiline={true}
                numberOfLines={10}
                style={styles.textareaInput}
                defaultValue={props.default}
                onChangeText={props.action}
                placeholder={props.placeholder}
                maxLength={100 || props.maxLength}
            />
            {err() && <Text style={styles.inputTextAlert}>{props.error.text}</Text>} 
        </View>
    )
}

export function Select(props){

    const err = () => {
        if(!props.error) return;
        if(props.error.input == props.name) return true;
    }

    return(
        <TouchableOpacity
            style={[styles.groupInput, props.style]}
            onPress={props.action}
        >
            <View style={styles.labelInput}>
                <Text
                    style={[styles.labelText, styles.textSemiBold, {
                        color: err()  ? '#E63B2E' : '#333333'
                    }]}>
                    {props.title}
                </Text>
            </View>
            <Text
                style={[
                    styles.textInput,{
                    borderColor: err()  ? '#E63B2E' : '#E2E2E2',
                    borderWidth: err()  ? 2 : 1,
                    textAlignVertical: 'center'
                }
            ]}>
                {props.text}
            </Text>
            {err() && <Text style={styles.inputTextAlert}>{props.error.text}</Text>}   
        </TouchableOpacity>
        
        
    )
}