/* eslint-disable camelcase */
import React from 'react';
import { NativeModules, Vibration } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import PushNotification from 'react-native-push-notification';
import BackgroundService from 'react-native-background-actions';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';

import { connect, disconnect, notifyNewOrder } from './src/services/socket';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  disconnect();

  const { NavigationBarColor } = NativeModules;

  NavigationBarColor.changeNavigationBarColor('#FDFDFD', true, false);

  PushNotification.configure({
    popInitialNotification: true,
  });

  const notificationConnection = async () => {
    const current = await AsyncStorage.getItem('@Carpede:store');
    if (!current) return;

    const store = JSON.parse(current);

    const { store_id } = store;

    connect(store_id);

    notifyNewOrder((order) => {
      PushNotification.cancelLocalNotifications({ id: '65487412' });

      PushNotification.localNotification({
        id: '65487412',
        visibility: 'public',
        importance: 'high',
        vibrate: false,
        bigText: `Novo pedido foi feito ás ${order.time}`,
        subText: 'Confira sua lista de pedidos',
        alertAction: 'view',
        title: 'Novo Pedido!',
        message: `Novo pedido foi feito ás ${order.time}`,
        playSound: true,
        soundName: 'default',
        largeIcon: 'ic_launcher_foreground',
        smallIcon: 'icon_small',
        color: '#FF4700',
      });
      Vibration.vibrate();
    });
  };

  const options = {
    taskName: 'Notification Connection',
    taskTitle: 'Aguardando novos Pedidos',
    taskDesc: 'Vamos notificar quando chegar :)',
    taskIcon: {
      name: 'ic_launcher',
      type: 'drawable',
      color: '#FF4700',
    },
    parameters: {
      // delay: 1000,
    },
  };

  BackgroundService.start(notificationConnection, options);
  BackgroundService.stop();

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
