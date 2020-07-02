import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Image, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import apiReq from '../../../services/reqToken';

import styles from '../../../global';import Skeleton from '../../../components/Skeleton';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Item';
import { ActionButton, FilterButton } from '../../../components/Button';

import img_more from '../../../assets/illustrations/more.png'

export default function Categories() {

    const navigation = useNavigation();
    const { params } = useRoute();
    let route = params;
    
    const [ categories, setCategories ] = useState([]);
    const [ sort, setSort ] = useState(1);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    async function loadCategories() {

        if(loading) return

        if(total > 0 && categories.length === total) return

        setLoading(true);

        const { data, headers } = await apiReq.get('categories',{ 
            params: { page },
        });

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

    const navigateToEdit = category => navigation.navigate('StoreCategoryEdit', { category });

    const navigateToNew = () => navigation.navigate('StoreCategoryNew');

    useEffect(() => {
        loadCategories();
        if(route) {
            
            let index = categories.findIndex(( obj => obj._id === route.category._id ))

            if(index != -1 && route.method == 'destroy') {
                categories.splice(index, 1)
                setCategories([...categories]);
                route = {};
                return;
            } 
            if (index != -1 && route.method == 'update') {
                categories[index] = route.category
                setCategories([...categories]);
                route = {};
                return;
            } 
            if (index == -1 && route.method == 'create') {
                setCategories([...categories, route.category]);
                route = {};
                return;
            }
            
        }
    },[route])

    return(

        <SafeAreaView style={styles.container}>
            <Header title={'categorias'}>
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
                        action={() => navigateToEdit(categories)}
                        image={ categories.image }
                        title={categories.name}
                        price={categories.price}
                    />
                )}
                ListEmptyComponent={<>
                    
                    {loading &&
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
                    {!loading && categories.length == 0 &&
                        <View style={{ paddingTop: 16 }}>
                            <Text style={[styles.subtitle, { marginBottom: 10 }]}>Adicione sua primeira Categoria</Text>
                            <Text style={styles.text}>As categorias servem para organizar a lista dos seus produtos. Clique abaixo e adicione sua primeira categoria.</Text>
                            <Image style={styles.illustration} source={img_more}/>
                        </View>
                    }
                </>}  
            />

            <View style={styles.absoluteBottomRight}>
                <ActionButton icon={'plus'} action={navigateToNew}/>
            </View>                 

        </SafeAreaView>
       )
}