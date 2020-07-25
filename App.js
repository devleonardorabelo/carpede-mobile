/* eslint-disable camelcase */
import React from 'react';
import { NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  const { NavigationBarColor } = NativeModules;

  NavigationBarColor.changeNavigationBarColor('#FDFDFD', true, false);

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
