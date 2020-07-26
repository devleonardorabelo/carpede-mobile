import React, { useEffect } from 'react';
import { Text, Image, SafeAreaView, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import styles from '../../global';
import { Button, ButtonTransparent } from '../../components/Button';

import imageHome from '../../assets/illustrations/home.png';

export default function Home() {
  const navigation = useNavigation();
  const navigateToSignup = () => navigation.navigate('Signup');
  const navigateToSignin = () => navigation.navigate('Signin');

  useEffect(() => SplashScreen.hide(), []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#FDFDFD" barStyle="dark-content" />
      <View
        style={[
          styles.column,
          {
            paddingTop: 40,
            justifyContent: 'space-between',
            height: '100%',
            backgroundColor: '#FDFDFD',
          },
        ]}
      >
        <View>
          <Text style={[styles.title, { marginBottom: 10 }]}>
            Seja bem-vindo ao Carpede!
          </Text>
          <Text style={[styles.subtitle, { marginBottom: 32 }]}>
            Proporcione aos seus clientes um atendimento personalizado
          </Text>
          <Button title="Quero criar a minha Loja" action={navigateToSignup} />
          <ButtonTransparent
            title="Já tenho a minha Loja"
            action={navigateToSignin}
          />
        </View>

        <Image
          style={{ height: '35%', alignSelf: 'center', marginBottom: 32 }}
          source={imageHome}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
