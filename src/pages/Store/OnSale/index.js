/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Image, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import apiReq from '../../../services/reqToken';

import styles from '../../../global';
import Skeleton from '../../../components/Skeleton';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Item';
import { ActionButton, FilterButton } from '../../../components/Button';

import imgSale from '../../../assets/illustrations/sale.png';

export default function OnSale() {
  const navigation = useNavigation();
  const { params } = useRoute();
  let route = params;

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(1);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadOnSale() {
    if (loading) {
      return;
    }

    if (total > 0 && products.length === total) {
      return;
    }

    setLoading(true);

    const { data, headers } = await apiReq.get('products', {
      params: { page, onSale: true },
    });

    if (data.products.length) {
      setProducts([...products, ...data.products]);
      setTotal(headers['x-total-count']);
      setPage(page + 1);
    }

    setLoading(false);
  }

  function sortOnSale() {
    products.sort((a, b) => {
      if (sort === 1) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
      }
      if (sort === -1) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      }
      return 0;
    });
    setProducts([...products]);
  }

  const navigateToEditProduct = (product) =>
    navigation.navigate('StoreProductEdit', { product, goBack: 'StoreOnSale' });

  useEffect(() => {
    loadOnSale();
    if (route) {
      const index = products.findIndex((obj) => obj._id === route.product._id);

      if (
        (index !== -1 && route.method === 'destroy') ||
        (index !== -1 && !route.product.onSale)
      ) {
        products.splice(index, 1);
        setProducts([...products]);
        route = {};
        return;
      }
      if (index !== -1 && route.method === 'update') {
        products[index] = route.product;
        setProducts([...products]);
        route = {};
        return;
      }
      if (index === -1 && route.method === 'create') {
        setProducts([...products, route.product]);
        route = {};
      }
    }
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="promoções">
        <FilterButton
          action={() => {
            if (sort !== 1) {
              setSort(1);
              sortOnSale();
            } else {
              setSort(-1);
              sortOnSale();
            }
          }}
          icon="filter-outline"
          subIcon={sort === 1 ? 'alpha-z-box' : 'alpha-a-box'}
        />
      </Header>

      <FlatList
        style={styles.column}
        data={products}
        keyExtractor={(item) => String(item._id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadOnSale}
        onEndReachedThreshold={0.3}
        numColumns={1}
        renderItem={({ item }) => (
          <Card
            action={() => navigateToEditProduct(item)}
            image={item.image}
            title={item.name}
            price={item.price}
          />
        )}
        ListEmptyComponent={
          <>
            {loading && (
              <Skeleton>
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
                <Card style={{ backgroundColor: '#F5F5F5', minHeight: 64 }} />
              </Skeleton>
            )}
            {!loading && products.length === 0 && (
              <View style={{ paddingTop: 16 }}>
                <Text style={[styles.title, { marginBottom: 10 }]}>
                  Promoções
                </Text>
                <Text style={styles.text}>
                  Você ainda não tem nenhuma promoção. Adicione uma na sua lista
                  de produtos clicando no item, definindo o valor promocional e
                  ativando a opção &quot;Promoção&quot;.
                </Text>
                <Image
                  style={[styles.illustration, { marginTop: 64 }]}
                  source={imgSale}
                />
              </View>
            )}
          </>
        }
      />
      <View style={styles.absoluteBottomRight}>
        <ActionButton
          icon="plus"
          action={() => navigation.navigate('StoreProducts')}
        />
      </View>
    </SafeAreaView>
  );
}
