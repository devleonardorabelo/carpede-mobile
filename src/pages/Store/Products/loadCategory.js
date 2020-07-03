import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import apiReq from '../../../services/reqToken';

import styles from '../../../global';
import { Header } from '../../../components/Header';
import Skeleton from '../../../components/Skeleton';
import { Card } from '../../../components/Item';
import { FilterButton } from '../../../components/Button';

export default function Categories() {

    const navigation = useNavigation();
    const { params } = useRoute();

    const [ categories, setCategories ] = useState([]);
    const [ sort, setSort ] = useState(1);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loadedPage, setLoadedPage ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    async function loadCategories() {

        if(loading) return

        if(total > 0 && categories.length === total) return

        setLoading(true);

        const { data, headers } = await apiReq.get('categories',{ 
            params: { page },
        });

        if(loadedPage === false) setLoadedPage(true);

        if(data.length) {
            setCategories([...categories, ...data]);
            setTotal(headers['x-total-count']);
            setPage(page + 1);    
        }
        
        setLoading(false);
    }

    function sortCategories() {
        categories.sort((a, b) => {
            if(sort == 1) {
                if(a.name < b.name) return 1;
                if(a.name > b.name) return -1;    
            }
            if(sort == -1) {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1; 
            }
            return 0;
        });
        setCategories([...categories])
    }

    const navigateToEditProduct = category => navigation.navigate('StoreProductEdit', { category });

    const navigateToNewProduct = category => navigation.navigate('StoreProductNew', { category })

    useEffect(() => {
        loadCategories();
    },[])

    return(

        <SafeAreaView style={styles.container}>
            <Header title={'SELECIONE UMA CATEGORIA'}>
                <FilterButton
                    action={() => {
                        if(sort != 1) {
                            setSort(1);
                            sortCategories();
                        } else{
                            setSort(-1);
                            sortCategories();
                        }
                    }}
                    icon='filter-outline'
                    subIcon={sort == 1 ? 'alpha-z-box' : 'alpha-a-box'}
                />
            </Header>
            
            <FlatList
                    style={styles.column}
                    data={categories}
                    keyExtractor={categories => String(categories._id)}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadCategories}
                    onEndReachedThreshold={0.3}
                    numColumns={1}
                    renderItem={({ item: categories }) => (
                        
                        <Card
                            action={() => {
                                params.type == 'edit' ?
                                navigateToEditProduct(categories)
                                :
                                navigateToNewProduct(categories)
                                
                            }}
                            image={categories.image}
                            title={categories.name}
                            price={categories.price}
                        />
                    )}
                    ListEmptyComponent={
                    
                        loading &&
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
                        
                    } 
                />

        </SafeAreaView>
    )
}