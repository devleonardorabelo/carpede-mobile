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

import imgCategory from '../../../assets/illustrations/category.png';

export default function Categories() {
  const navigation = useNavigation();
  const { params } = useRoute();
  let route = params;

  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState(1);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadCategories() {
    if (loading) {
      return;
    }

    if (total > 0 && categories.length === total) {
      return;
    }

    setLoading(true);

    const { data, headers } = await apiReq.get('categories', {
      params: { page },
    });

    if (data.length) {
      setCategories([...categories, ...data]);
      setTotal(headers['x-total-count']);
      setPage(page + 1);
    }

    setLoading(false);
  }

  function sortCategories() {
    categories.sort((a, b) => {
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
    setCategories([...categories]);
  }

  const navigateToEdit = (category) =>
    navigation.navigate('StoreCategoryEdit', { category });

  const navigateToNew = () => navigation.navigate('StoreCategoryNew');

  useEffect(() => {
    loadCategories();
    if (route) {
      const index = categories.findIndex(
        (obj) => obj._id === route.category._id
      );

      if (index !== -1 && route.method === 'destroy') {
        categories.splice(index, 1);
        setCategories([...categories]);
        route = {};
        return;
      }
      if (index !== -1 && route.method === 'update') {
        categories[index] = route.category;
        setCategories([...categories]);
        route = {};
        return;
      }
      if (index === -1 && route.method === 'create') {
        setCategories([...categories, route.category]);
        route = {};
      }
    }
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="categorias">
        <FilterButton
          action={() => {
            if (sort !== 1) {
              setSort(1);
              sortCategories();
            } else {
              setSort(-1);
              sortCategories();
            }
          }}
          icon="filter-outline"
          subIcon={sort === 1 ? 'alpha-z-box' : 'alpha-a-box'}
        />
      </Header>

      <FlatList
        style={styles.column}
        data={categories}
        keyExtractor={(item) => String(item._id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadCategories}
        onEndReachedThreshold={0.3}
        numColumns={1}
        renderItem={({ item }) => (
          <Card
            action={() => navigateToEdit(item)}
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
            {!loading && categories.length === 0 && (
              <View style={{ paddingTop: 16 }}>
                <Text style={[styles.title, { marginBottom: 10 }]}>
                  Categoria
                </Text>
                <Text style={styles.text}>
                  As categorias servem para organizar a lista dos seus produtos.
                  Clique abaixo e adicione sua primeira categoria.
                </Text>
                <Image
                  style={[styles.illustration, { marginTop: 64 }]}
                  source={imgCategory}
                />
              </View>
            )}
          </>
        }
      />

      <View style={styles.absoluteBottomRight}>
        <ActionButton icon="plus" action={navigateToNew} />
      </View>
    </SafeAreaView>
  );
}
