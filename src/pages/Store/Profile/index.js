import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { format } from '@buttercup/react-formatted-input';
import apiReq from '../../../services/reqToken';
import AuthContext from '../../../contexts/auth';
import { openPicker } from '../../../utils/ImagePicker';
import { uploadImage } from '../../../services/uploadImage';
import {
  WhatsappFormat,
  HourFormat,
  PhoneFormat,
} from '../../../utils/treatString';

import styles from '../../../global';
import Loading from '../../../components/Loading';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { Avatar } from '../../../components/Item';
import { Button } from '../../../components/Button';
import { ChooseImageMode } from '../../../components/Modal';

export default function Profile() {
  const navigation = useNavigation();
  const { store, sign } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState({});
  const [whatsapp, setWhatsapp] = useState({});
  const [phone, setPhone] = useState({});
  const [opening, setOpening] = useState({});
  const [closure, setClosure] = useState({});
  const [averageDeliveryTime, setAverageDeliveryTime] = useState('0');

  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState();
  const [loadedPage, setLoadedPage] = useState(false);
  const [status, setStatus] = useState();
  const [modalActived, setModalActived] = useState(false);

  async function getImage(mode) {
    const picker = await openPicker(mode);
    setModalActived(false);
    if (picker.cancelled) return;
    setUploading(true);

    const upload = await uploadImage(picker.path, 'avatar');
    setAvatar({ uri: upload });
    setUploading(false);
  }

  async function loadProfile() {
    const { data } = await apiReq.get('profile');

    if (data.avatar) setAvatar({ uri: data.avatar });
    setName(data.name);
    setWhatsapp(format(data.whatsapp, WhatsappFormat));
    setPhone(format(data.phone, PhoneFormat));
    setOpening(format(data.operation.opening, HourFormat));
    setClosure(format(data.operation.closure, HourFormat));
    setAverageDeliveryTime(data.averageDeliveryTime);
    setLoadedPage(true);
  }

  async function handleUpdate() {
    setStatus('loading');

    const { data } = await apiReq.post('profile', {
      avatar: avatar.uri,
      name,
      whatsapp: whatsapp.raw,
      phone: phone.raw,
      operation: {
        opening: opening.formatted,
        closure: closure.formatted,
      },
      averageDeliveryTime,
    });

    if (data.error) {
      setStatus();
      setAlert(data.error);
      return;
    }

    setStatus('done');

    await sign({
      avatar: avatar.uri,
      name,
      whatsapp: whatsapp.raw,
      email: store.email,
      token: store.token,
      store_id: store.store_id,
    });

    setTimeout(() => {
      navigation.navigate('StorePanel');
    }, 1000);
  }

  const maskNumber = (phoneToFormat, to) => {
    if (to === 'whatsapp') setWhatsapp(format(phoneToFormat, WhatsappFormat));
    if (to === 'phone') setPhone(format(phoneToFormat, PhoneFormat));
  };
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

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    checkHour(opening.raw, 'opening');
    if (opening.formatted === '00:00')
      setOpening({ raw: '0001', formatted: '00:01' });
    checkHour(closure.raw, 'closure');
    if (closure.formatted === '00:00')
      setClosure({ raw: '2359', formatted: '23:59' });
  }, [opening, closure]);

  if (!loadedPage) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="perfil" />

      <ScrollView style={styles.column} showsVerticalScrollIndicator={false}>
        <Avatar
          image={avatar}
          title={name}
          subtitle={whatsapp.formatted}
          action={() => setModalActived(true)}
          icon="image"
          loading={uploading}
          transparent={avatar.uri}
          isChangeable
        />
        <Input
          title="Nome da Loja"
          name="name"
          defaultValue={name}
          action={(e) => setName(e)}
          error={alert}
        />
        <Input
          title="Whatsapp"
          name="whatsapp"
          defaultValue={whatsapp.formatted}
          action={(number) => maskNumber(number, 'whatsapp')}
          keyboard="phone-pad"
          maxLength={16}
          error={alert}
        />
        <Input
          title="Telefone"
          defaultValue={phone.formatted}
          action={(number) => maskNumber(number, 'phone')}
          keyboard="numeric"
          maxLength={16}
        />

        <View style={{ flexDirection: 'row', flexShrink: 1 }}>
          <Input
            title="Abre"
            name="opening"
            defaultValue={opening.formatted}
            action={(e) => maskHour(e, 'opening')}
            keyboard="numeric"
            maxLength={5}
            style={{ marginRight: 16, flexGrow: 1 }}
            error={alert}
          />
          <Input
            title="Fecha"
            name="closure"
            defaultValue={closure.formatted}
            action={(e) => maskHour(e, 'closure')}
            keyboard="numeric"
            maxLength={5}
            style={{ marginRight: 16, flexGrow: 1 }}
            error={alert}
          />
          <Input
            title="T. Médio(min)"
            name="average"
            defaultValue={averageDeliveryTime}
            action={(e) => setAverageDeliveryTime(e)}
            keyboard="numeric"
            maxLength={3}
            style={{ flexGrow: 1 }}
            error={alert}
          />
        </View>

        <Button
          action={handleUpdate}
          title="Salvar"
          status={status}
          disabled={uploading}
          disabledText="Carregando Imagem..."
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
