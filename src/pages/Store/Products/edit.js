/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import apiReq from '../../../services/reqToken';
import AuthContext from '../../../contexts/auth';
import { openPicker } from '../../../utils/ImagePicker';
import { uploadImage } from '../../../services/uploadImage';

import styles from '../../../global';
import { Header } from '../../../components/Header';
import { PreviewImage } from '../../../components/Image';
import { Input, Select, TextArea, CheckBox } from '../../../components/Input';
import { Button, LinearButton } from '../../../components/Button';
import { ChooseImageMode } from '../../../components/Modal';

export default function EditProduct() {
  const { params } = useRoute();
  const { product } = params;
  const productCategory = params.category;
  const navigation = useNavigation();
  const { store } = useContext(AuthContext);

  const [image, setImage] = useState({ uri: product.image });
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [onSale, setOnSale] = useState(product.onSale);
  const [onSaleValue, setOnSaleValue] = useState(product.onSaleValue);
  const [alert, setAlert] = useState();
  const [status, setStatus] = useState(false);
  const [modalActived, setModalActived] = useState(false);

  async function getImage(mode) {
    const picker = await openPicker(mode);
    setModalActived(false);
    if (picker.cancelled) return;
    setUploading(true);

    const upload = await uploadImage(picker.path, store.store_id);
    setImage({ uri: upload });
    setUploading(false);
  }

  async function handleUpdate(id) {
    setStatus('loading');

    const { data } = await apiReq.post('products/edit', {
      id,
      image: image.uri,
      name,
      description,
      price: String(price),
      category,
      onSale,
      onSaleValue: !onSaleValue ? String(price) : String(onSaleValue),
    });

    if (data.error) {
      setStatus();
      setAlert(data.error);
      return;
    }

    setStatus('done');

    if (params && params.goBack) {
      setTimeout(
        () =>
          navigation.navigate(`${params.goBack}`, {
            method: 'update',
            product: data.product,
          }),
        500
      );
    } else {
      setTimeout(
        () =>
          navigation.navigate('StoreProducts', {
            method: 'update',
            product: data.product,
          }),
        500
      );
    }
  }

  async function handleDelete(id) {
    Alert.alert(
      'Apagar Produto',
      'Deseja mesmo apagar este produto? Produtos apagados não poderão ser mais recuperados e serão excluidos permanentemente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Apagar',
          onPress: async () => {
            const { data } = await apiReq.post('products/delete', { id });
            if (data)
              navigation.navigate('StoreProducts', {
                method: 'destroy',
                product: data.product,
              });
          },
        },
      ]
    );
  }

  const navigateToSelectCategory = () =>
    navigation.navigate('StoreLoadCategory', { type: 'edit' });

  useEffect(() => {
    function handleSelectCategory() {
      if (productCategory) {
        setCategory(productCategory);
      }
    }

    handleSelectCategory();
  }, [productCategory]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header title="editar produto">
          <LinearButton
            icon="trash-can-outline"
            action={() => handleDelete(product._id)}
          />
        </Header>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>
          <PreviewImage
            image={image}
            action={() => setModalActived(true)}
            icon="image-outline"
            loading={uploading}
          />

          <Input
            title="Nome"
            name="name"
            defaultValue={product.name}
            action={(e) => setName(e)}
            maxLength={40}
            error={alert}
          />
          <TextArea
            title="Descrição"
            name="description"
            defaultValue={product.description}
            action={(e) => setDescription(e)}
            maxLength={100}
            error={alert}
          />
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Input
              style={{
                marginRight: 16,
                width: 120,
              }}
              title="Preço"
              name="price"
              keyboard="numeric"
              defaultValue={product.price}
              action={(e) => setPrice(e)}
              maxLength={8}
              error={alert}
            />

            <Select
              style={{ flexGrow: 1 }}
              title="Categoria"
              name="category"
              text={category.name}
              action={navigateToSelectCategory}
              error={alert}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Input
              style={{
                marginRight: 16,
                width: 120,
              }}
              title="Oferta"
              name="onsalevalue"
              keyboard="numeric"
              defaultValue={
                product.onSaleValue === product.price ? '' : product.onSaleValue
              }
              action={(e) => setOnSaleValue(e)}
              maxLength={8}
              error={alert}
            />
            <CheckBox
              action={() => setOnSale(!onSale)}
              title="Promoção"
              checked={onSale}
            />
          </View>

          <Button
            action={() => handleUpdate(product._id)}
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
    </>
  );
}
