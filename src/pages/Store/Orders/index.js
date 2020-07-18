/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Gradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import apiReq from '../../../services/reqToken';

import styles from '../../../global';
import Skeleton from '../../../components/Skeleton';
import { Header } from '../../../components/Header';
import { CardOrder, Card } from '../../../components/Item';

import imgDelivery from '../../../assets/illustrations/fast-delivery.png';
import imgSadFace from '../../../assets/illustrations/confused.png';
import imgHappyFace from '../../../assets/illustrations/face.png';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('waiting');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { params } = useRoute();
  let route = params;

  async function loadOrders() {
    if (loading) return;

    if (total > 0 && orders.length === total) return;

    setLoading(true);

    const { data, headers } = await apiReq.get('orders', {
      params: { page, status },
    });

    setOrders([...orders, ...data]);
    setTotal(headers['x-total-count']);
    setPage(page + 1);

    setLoading(false);
  }

  function loadOrdersWithParams(selectStatus) {
    if (selectStatus !== status && !loading) {
      setTotal(0);
      setOrders([]);
      setPage(1);
      setStatus(selectStatus);
    }
  }

  const navigateToOrder = (order) =>
    navigation.navigate('StoreOrder', { order });

  useEffect(() => {
    loadOrders();

    if (route) {
      const index = orders.findIndex((obj) => obj._id === route.order._id);
      if (
        (index !== -1 && route.method === 'destroy') ||
        route.method === 'update'
      ) {
        orders.splice(index, 1);
        setOrders([...orders]);
        route = {};
        return;
      }
      if (index === -1 && route.method === 'create') {
        setOrders([...orders, route.order]);
        route = {};
      }
    }
  }, [route, status]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="pedidos" />
      <View>
        <ScrollView horizontal style={{ marginBottom: 8 }}>
          <TouchableOpacity onPress={() => loadOrdersWithParams('waiting')}>
            <Gradient
              style={[styles.buttonTag, { marginLeft: 16 }]}
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 0.5, y: 1.0 }}
              colors={
                status === 'waiting'
                  ? ['#FF7239', '#FF4700']
                  : ['#E2E2E2', '#E2E2E2']
              }
            >
              <Text
                style={[
                  styles.textSemiBold,
                  status === 'waiting' && { color: '#FFFFFF' },
                ]}
              >
                Aguardando
              </Text>
            </Gradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loadOrdersWithParams('done')}>
            <Gradient
              style={styles.buttonTag}
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 0.5, y: 1.0 }}
              colors={
                status === 'done'
                  ? ['#FF7239', '#FF4700']
                  : ['#E2E2E2', '#E2E2E2']
              }
            >
              <Text
                style={[
                  styles.textSemiBold,
                  status === 'done' && { color: '#FFFFFF' },
                ]}
              >
                Entregues
              </Text>
            </Gradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loadOrdersWithParams('lost')}>
            <Gradient
              style={[styles.buttonTag, { marginRight: 16 }]}
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 0.5, y: 1.0 }}
              colors={
                status === 'lost'
                  ? ['#FF7239', '#FF4700']
                  : ['#E2E2E2', '#E2E2E2']
              }
            >
              <Text
                style={[
                  styles.textSemiBold,
                  status === 'lost' && { color: '#FFFFFF' },
                ]}
              >
                Perdidos
              </Text>
            </Gradient>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        style={styles.column}
        data={orders}
        keyExtractor={(order) => String(order._id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadOrders}
        onEndReachedThreshold={0.3}
        numColumns={1}
        renderItem={({ item: order }) => (
          <CardOrder
            action={() => navigateToOrder(order)}
            title={`#${order.order_id}`}
            subtitle={order.customer.name}
            address={`${order.customer.address} ${order.customer.complement} ${order.customer.number}`}
            time={order.time}
            price={order.value}
            status={[status, order.date, order.deliveredAt]}
          />
        )}
        ListEmptyComponent={
          <>
            {loading && (
              <Skeleton>
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 50 }} />
              </Skeleton>
            )}
            {!loading &&
              orders.length === 0 &&
              status === 'waiting' &&
              page !== 1 && (
                <View style={{ paddingTop: 16 }}>
                  <Text style={[styles.subtitle, { marginBottom: 10 }]}>
                    Nenhum Pedido para Hoje ainda.
                  </Text>
                  <Text style={styles.text}>
                    Quando chegar um novo Pedido você será notificado, fique
                    atento!
                  </Text>
                  <Image style={styles.illustration} source={imgDelivery} />
                </View>
              )}
            {!loading &&
              orders.length === 0 &&
              status === 'done' &&
              page !== 1 && (
                <View style={{ paddingTop: 16 }}>
                  <Text style={[styles.subtitle, { marginBottom: 10 }]}>
                    Você ainda não entregou nenhum.
                  </Text>
                  <Text style={styles.text}>
                    Calma, você ainda não entregou nenhum pedido ainda mas é
                    temporário! Espalhe por ai que você tem um App de Delivery e
                    rapidamente você vai ter vários!
                  </Text>
                  <Image style={styles.illustration} source={imgSadFace} />
                </View>
              )}
            {!loading &&
              orders.length === 0 &&
              status === 'lost' &&
              page !== 1 && (
                <View style={{ paddingTop: 16 }}>
                  <Text style={[styles.subtitle, { marginBottom: 10 }]}>
                    Nenhum pedido foi perdido.
                  </Text>
                  <Text style={styles.text}>
                    Que ótimo! Você ainda não deixou passar nenhum pedido,
                    continue assim!
                  </Text>
                  <Image style={styles.illustration} source={imgHappyFace} />
                </View>
              )}
          </>
        }
      />
    </SafeAreaView>
  );
}
