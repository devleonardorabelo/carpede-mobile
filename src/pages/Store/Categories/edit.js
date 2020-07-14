/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import apiReq from '../../../services/reqToken';
import AuthContext from '../../../contexts/auth';
import { openPicker } from '../../../utils/ImagePicker';
import { uploadImage } from '../../../services/uploadImage';

import styles from '../../../global';
import { Header } from '../../../components/Header';
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button, LinearButton } from '../../../components/Button';
import { ChooseImageMode } from '../../../components/Modal';

export default function EditCategory() {
  const route = useRoute();
  const { category } = route.params;
  const navigation = useNavigation();
  const { store } = useContext(AuthContext);

  const [image, setImage] = useState({ uri: category.image });
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(category.name);
  const [alert, setAlert] = useState();
  const [status, setStatus] = useState(false);
  const [modalActived, setModalActived] = useState(false);

  async function getImage(mode) {
    const picker = await openPicker(mode);
    setModalActived(false);
    if (picker.cancelled) return;
    setUploading(true);
    setImage({ preview: picker.path });

    const upload = await uploadImage(picker.path, store.store_id);
    setImage({ uri: upload, preview: picker.path });
    setUploading(false);
  }

  async function handleUpdate(id) {
    setStatus('loading');

    const { data } = await apiReq.post('categories/edit', {
      id,
      image: image.uri,
      name,
    });

    if (data.error) {
      setStatus();
      setAlert(data.error);
      return;
    }

    setStatus('done');

    setTimeout(
      () =>
        navigation.navigate('StoreCategories', {
          method: 'update',
          category: data.category,
        }),
      500
    );
  }

  async function handleDelete(id) {
    Alert.alert(
      'Apagar Pedido',
      'Deseja mesmo apagar esta categoria? Categorias apagadas não poderão ser mais recuperadas e todos os produtos relacionados com esta categorias serão apagados.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Apagar',
          onPress: async () => {
            setStatus('loading');
            const { data } = await apiReq.post('categories/delete', { id });
            if (data)
              navigation.navigate('StoreCategories', {
                method: 'destroy',
                category: data.category,
              });
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="EDITAR CATEGORIA">
        <LinearButton
          icon="trash-can-outline"
          action={() => handleDelete(category._id)}
        />
      </Header>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>
        <PreviewImage
          image={image.preview ? { uri: image.preview } : { uri: image.uri }}
          action={() => setModalActived(true)}
          icon="image-outline"
          loading={uploading}
        />

        <Input
          title="Nome"
          name="name"
          defaultValue={category.name}
          action={(e) => setName(e)}
          maxLength={40}
          error={alert}
        />

        <Button
          action={() => handleUpdate(category._id)}
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
