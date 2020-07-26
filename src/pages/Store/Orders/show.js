/* eslint-disable no-underscore-dangle */
import React from 'react';
import { SafeAreaView, View, Text, FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import apiReq from '../../../services/reqToken';

import { treatPrice } from '../../../utils/treatString';

import styles from '../../../global';
import { CardItem, Checkout } from '../../../components/Item';
import { Header } from '../../../components/Header';
import { LinearButton } from '../../../components/Button';

export default function Show() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { order } = params;

  async function handleUpdate() {
    Alert.alert(
      'Confirmar Entrega',
      'Confirmar que o pedido saiu para entrega?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        // { text: 'Entregar e notificar', onPress: () => { return }, style: 'cancel' },
        {
          text: 'Entregar',
          onPress: async () => {
            const { data } = await apiReq.post('orders/edit', {
              id: order._id,
              status: 'done',
              date: order.date,
            });
            if (data)
              navigation.navigate('StoreOrders', {
                method: 'update',
                order: data.order,
              });
          },
        },
      ]
    );
  }

  async function handleDelete() {
    Alert.alert(
      'Apagar Pedido',
      'Deseja mesmo apagar este pedido? Pedidos apagados não poderão ser mais recuperados.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Apagar',
          onPress: async () => {
            const { data } = await apiReq.post('orders/delete', {
              id: order._id,
            });
            if (data)
              navigation.navigate('StoreOrders', {
                method: 'destroy',
                order: data.order,
              });
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`#${order.order_id}`}>
        <LinearButton icon="trash-can-outline" action={handleDelete} />
      </Header>

      <View style={[styles.column, { marginBottom: 0 }]}>
        <Text style={styles.subtitle}>Detalhes do pedido:</Text>
        <Text style={[styles.textBold, { color: '#FF4700' }]}>
          {order.time} -{order.status === 'waiting' && ` Aguardando entrega`}
          {order.status === 'done' && ` Pedido entregue`}
        </Text>
      </View>

      <FlatList
        style={styles.orderList}
        data={order.products}
        keyExtractor={(product) => String(product._id)}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={({ item: product }) => (
          <CardItem
            amount={product.quantity}
            title={product.product.name}
            price={product.product.onSaleValue}
          />
        )}
        ListFooterComponent={
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={[styles.box, styles.column, { marginRight: 8 }]}>
              <Text style={styles.text}>Entrega</Text>
              <Text style={styles.textBold}>
                {treatPrice(order.fees.delivery)}
              </Text>
            </View>
            <View style={[styles.box, styles.column, { marginRight: 8 }]}>
              <Text style={styles.text}>Taxas</Text>
              <Text style={styles.textBold}>
                {treatPrice(order.fees.payment)}
              </Text>
            </View>
            <View style={[styles.box, styles.column, { flexGrow: 1 }]}>
              <Text style={styles.text}>Total</Text>
              <Text style={styles.textBold}>{treatPrice(order.value)}</Text>
            </View>
          </View>
        }
      />

      <Checkout data={order} action={handleUpdate} />
    </SafeAreaView>
  );
}
