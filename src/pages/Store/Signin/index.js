import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../contexts/auth';
import styles from '../../../global';
import api from '../../../services/api';

import { Header } from '../../../components/Header';
import { InputPassword, Input } from '../../../components/Input';
import { Button, ButtonTransparent } from '../../../components/Button';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState();
  const [status, setStatus] = useState();

  const navigation = useNavigation();
  const { sign } = useContext(AuthContext);

  async function handleSignin() {
    setStatus('loading');

    const { data } = await api.post('signin', { email, password });
    if (data.error) {
      setStatus();
      setAlert(data.error);
      return;
    }

    await sign({
      avatar: data.avatar,
      name: data.name,
      whatsapp: data.whatsapp,
      email: data.email,
      token: data.token,
      store_id: data._id,
    });

    return setStatus('done');
  }

  const navigateToSignup = () => navigation.navigate('Signup');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="entrar" />
      <View style={styles.column}>
        <Text style={[styles.title, { marginBottom: 0 }]}>Entrar</Text>
        <Text style={[styles.subtitle, { marginBottom: 16 }]}>
          Gerenciar o seu negócio
        </Text>
        <Input
          title="Email"
          name="email"
          action={(email) => setEmail(email.toLowerCase())}
          capitalize="none"
          focus
          maxLength={30}
          error={alert}
        />
        <InputPassword
          title="Senha"
          name="password"
          action={(password) => setPassword(password)}
          error={alert}
        />
        <Button action={handleSignin} title="Entrar" status={status} />
        <ButtonTransparent
          action={navigateToSignup}
          title="Quero criar uma conta"
          icon="account-plus-outline"
        />
      </View>
    </SafeAreaView>
  );
}
