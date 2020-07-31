import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { Colors } from '../global';

export default function Loading() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.primaryWhite,
      }}
    >
      <ActivityIndicator size="large" color={Colors.primary} />
    </SafeAreaView>
  );
}
