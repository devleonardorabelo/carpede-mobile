import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

import messaging from '@react-native-firebase/messaging';

const App = () => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>Hello, World!</Text>
    </View>
  )
}

export default App;