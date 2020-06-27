import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';

export default function Loading() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#fff'
            }}>
            <ActivityIndicator size="large" color="#266EE8" />
        </SafeAreaView>
    )
}
