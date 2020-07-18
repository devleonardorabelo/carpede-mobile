import React, { useContext } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { format } from '@buttercup/react-formatted-input';
import AuthContext from '../../../contexts/auth';

import { WhatsappFormat } from '../../../utils/treatString';

import styles from '../../../global';
import { NavItem, Avatar } from '../../../components/Item';
import { CustomHeader } from '../../../components/Header';

export default function Panel() {
  const { store, signOut } = useContext(AuthContext);
  const whatsapp = format(store.whatsapp, WhatsappFormat);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FDFDFD" barStyle="dark-content" />
      <CustomHeader icon="logout" action={signOut} />

      <Avatar
        image={{ uri: store.avatar }}
        title={store.name}
        subtitle={whatsapp.formatted}
      />

      <View style={styles.column}>
        <NavItem
          action={() => navigation.navigate('StoreOrders')}
          icon="bike"
          title="Pedidos"
          subtitle="Lista de pedidos ativos"
        />
        <NavItem
          action={() => navigation.navigate('StoreProducts')}
          icon="package-variant-closed"
          title="Produtos"
          subtitle="Lista de produtos"
        />
        <NavItem
          action={() => navigation.navigate('StoreCategories')}
          icon="tag-outline"
          title="Categorias"
          subtitle="Categoria dos pedidos"
        />
        <NavItem
          action={() => navigation.navigate('StoreOnSale')}
          icon="sale"
          title="Promoções"
          subtitle="Produtos em promoção"
        />
        <NavItem
          action={() => navigation.navigate('StoreProfile')}
          icon="account-circle-outline"
          title="Perfil"
          subtitle="Informações da Loja"
        />
      </View>
    </SafeAreaView>
  );
}
