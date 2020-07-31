/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import { format } from '@buttercup/react-formatted-input';
import api from '../../../services/api';
import AuthContext from '../../../contexts/auth';

import { openPicker } from '../../../utils/ImagePicker';
import { uploadImage } from '../../../services/uploadImage';
import { WhatsappFormat, HourFormat } from '../../../utils/treatString';

import styles from '../../../global';
import { Header } from '../../../components/Header';
import { Input, InputPassword } from '../../../components/Input';
import { Button, ButtonTransparent } from '../../../components/Button';
import { Avatar } from '../../../components/Item';
import { ChooseImageMode } from '../../../components/Modal';

export default function Signup() {
  const { navigate } = useNavigation();
  const { sign } = useContext(AuthContext);

  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState({});
  const [password, setPassword] = useState('');
  const [opening, setOpening] = useState({});
  const [closure, setClosure] = useState({});
  const [averageDeliveryTime, setAverageDeliveryTime] = useState('60');
  const [deviceToken, setDeviceToken] = useState('');

  const [alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [modalActived, setModalActived] = useState(false);

  async function getImage(mode) {
    const picker = await openPicker(mode);
    setModalActived(false);
    if (picker.cancelled) return;
    setUploading(true);

    const upload = await uploadImage(picker.path, 'avatar');
    setImage({ uri: upload });
    setUploading(false);
  }

  const maskNumber = (phoneToFormat) =>
    setWhatsapp(format(phoneToFormat, WhatsappFormat));

  const maskHour = (HourToFormat, to) => {
    if (to === 'opening') setOpening(format(HourToFormat, HourFormat));
    if (to === 'closure') setClosure(format(HourToFormat, HourFormat));
  };

  const checkHour = (hour, to) => {
    if (!hour || hour.length === 4) return;
    const arr = hour.split('');
    if (arr[0] > 2 || arr[0] + arr[1] > 23 || arr[2] > 5) {
      arr.pop();
      maskHour(arr.join(''), to);
    }
  };

  const getTokenDevice = async () => {
    const token = await messaging().getToken();
    setDeviceToken(token);
  };

  useEffect(() => {
    getTokenDevice();
  }, []);

  useEffect(() => {
    checkHour(opening.raw, 'opening');
    if (opening.formatted === '00:00')
      setOpening({ raw: '0001', formatted: '00:01' });
    checkHour(closure.raw, 'closure');
    if (closure.formatted === '00:00')
      setClosure({ raw: '2359', formatted: '23:59' });
  }, [opening, closure]);

  async function handleSignup() {
    setStatus('loading');

    const { data } = await api.post('signup', {
      avatar: image.uri,
      name,
      whatsapp: whatsapp.raw,
      email,
      password,
      operation: {
        opening: opening.formatted,
        closure: closure.formatted,
      },
      averageDeliveryTime,
      deviceToken,
    });

    if (data.error) {
      setStatus();
      setAlert(data.error);
      return;
    }

    await sign({
      avatar: image.uri,
      name,
      whatsapp: whatsapp.raw,
      email,
      token: data.token,
      store_id: data._id,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="nova conta" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>
        <Text style={[styles.title, { marginBottom: 16 }]}>Crie uma conta</Text>

        <Avatar
          image={image}
          title={name}
          subtitle={whatsapp.formatted}
          icon="image"
          action={() => setModalActived(true)}
          loading={uploading}
          transparent={image.uri}
          isChangeable
        />

        <Input
          title="Nome da Loja"
          name="name"
          placeholder="Pizzaria do João"
          action={(e) => setName(e)}
          focus
          maxLength={30}
          error={alert}
        />

        <Input
          title="Whatsapp"
          name="whatsapp"
          placeholder="(01) 2 3456 7890"
          defaultValue={whatsapp.formatted}
          action={(number) => maskNumber(number, 'whatsapp')}
          keyboard="numeric"
          maxLength={16}
          error={alert}
        />

        <Input
          title="Email"
          name="email"
          placeholder="joao@pizzaria.com"
          action={(e) => setEmail(e.toLowerCase())}
          maxLength={30}
          capitalize="none"
          error={alert}
        />

        <InputPassword
          title="Senha"
          name="password"
          placeholder="* * * * * * * * * * *"
          action={(e) => setPassword(e)}
          error={alert}
        />

        <View style={{ flexDirection: 'row', flexShrink: 1 }}>
          <Input
            title="Abre"
            name="opening"
            defaultValue={opening.formatted}
            action={(e) => maskHour(e, 'opening')}
            keyboard="numeric"
            maxLength={5}
            style={{ marginRight: 8, flexGrow: 1 }}
            error={alert}
          />
          <Input
            title="Fecha"
            name="closure"
            defaultValue={closure.formatted}
            action={(e) => maskHour(e, 'closure')}
            keyboard="numeric"
            maxLength={5}
            style={{ marginLeft: 8, flexGrow: 1 }}
            error={alert}
          />
        </View>

        <Input
          title="Tempo de Entrega (minutos)"
          name="average"
          defaultValue={averageDeliveryTime}
          action={(e) => setAverageDeliveryTime(e)}
          keyboard="numeric"
          maxLength={3}
          style={{ flexGrow: 1 }}
          error={alert}
        />

        <Button
          action={handleSignup}
          title="Começar agora!"
          status={status}
          disabled={uploading}
          disabledText="Carregando Imagem..."
        />

        <ButtonTransparent
          action={() => navigate('Signin')}
          title="Já tenho uma conta"
          icon="login"
        />
      </ScrollView>
      <ChooseImageMode
        title="Escolha uma opção"
        actionClose={() => setModalActived(false)}
        actionCamera={() => getImage('camera')}
        actionGallery={() => getImage('gallery')}
        active={modalActived}
      />
    </SafeAreaView>
  );
}
