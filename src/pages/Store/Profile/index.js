import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { format } from '@buttercup/react-formatted-input';
import apiReq from '../../../services/reqToken';
import AuthContext from '../../../contexts/auth';
import { openPicker } from '../../../utils/ImagePicker';
import { uploadImage } from '../../../services/uploadImage';
import { WhatsappFormat } from '../../../utils/treatString';

import styles from '../../../global';
import Loading from '../../../components/Loading';
import { Header } from '../../../components/Header';
import { Input, TextArea } from '../../../components/Input';
import { Avatar } from '../../../components/Item';
import { Button } from '../../../components/Button';
import { ChooseImageMode } from '../../../components/Modal';

export default function Profile() {
  const navigation = useNavigation();
  const { store, sign } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState({});
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState('');
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
    setDescription(data.description);
    setWhatsapp(format(data.whatsapp, WhatsappFormat));
    setPhone(data.phone);
    setTags(data.tags);
    setLoadedPage(true);
  }

  async function handleUpdate() {
    setStatus('loading');

    const { data } = await apiReq.post('profile', {
      avatar: avatar.uri,
      name,
      description,
      whatsapp: whatsapp.raw,
      phone,
      tags,
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

  const maskWhatsapp = (phoneToFormat) =>
    setWhatsapp(format(phoneToFormat, WhatsappFormat));

  useEffect(() => {
    loadProfile();
  }, []);

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
        <TextArea
          title="Descrição"
          defaultValue={description}
          action={(e) => setDescription(e)}
        />
        <Input
          title="Whatsapp"
          name="whatsapp"
          defaultValue={whatsapp.raw}
          action={(number) => maskWhatsapp(number)}
          keyboard="phone-pad"
          maxLength={11}
          error={alert}
        />
        <Input
          title="Telefone"
          defaultValue={phone}
          action={(e) => setPhone(e)}
          keyboard="numeric"
          maxLength={10}
        />
        <TextArea
          title="Principais Produtos"
          defaultValue={tags}
          action={(e) => setTags(e)}
          placeholder="ex:  sapato, camisa, meia, tênis, calça, bermuda"
        />

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
