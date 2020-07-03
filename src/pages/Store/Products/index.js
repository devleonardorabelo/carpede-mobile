import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import apiReq from '../../../services/reqToken';
import Gradient from 'react-native-linear-gradient';

import styles from '../../../global';
import Skeleton from '../../../components/Skeleton';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Item';
import { ActionButton, FilterButton, Button } from '../../../components/Button';

import img_more from '../../../assets/illustrations/more.png'

export default function Products() {

    const navigation = useNavigation();
    const { params } = useRoute();
    let route = params;

    const [ products, setProducts ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ category, setCategory ] = useState({});
    const [ sort, setSort ] = useState(1);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    async function loadProducts() {

        if(loading) return

        if(total > 0 && products.length === total) return

        setLoading(true);

        const { data, headers } = await apiReq.get('products',{ 
            params: { page, category: category._id },
        });   

        setProducts([...products, ...data.products]);

        setTotal(headers['x-total-count']);
        setPage(page + 1);

        setCategories(data.categories);

        setLoading(false);
    }

    function loadProductWithParams(selectCategory) {
        if(selectCategory != category && !loading) {
            setTotal(0);
            setProducts([]);
            setPage(1);
            setSort(1);
            setCategory(selectCategory)    
        }
        return;
    }

    function sortProducts() {
        products.sort((a, b) => {
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
        setProducts([...products])
    }
    const navigateToNewCategory = () => navigation.navigate('StoreCategoryNew', { action: 'goBack' });

    const navigateToEdit = product => navigation.navigate('StoreProductEdit', { product });

    const navigateToNewProduct = () => navigation.navigate('StoreProductNew', { category });

    useEffect(() => {
        loadProducts();
    },[category])

    useEffect(() => {
        
        if(route && route.product) {
            
            let index = products.findIndex(( obj => obj._id === route.product._id ))

            if(index != -1 && route.method == 'destroy') {
                products.splice(index, 1)
                setProducts([...products]);
                route = {};
                return;
            } 
            else if (index != -1 && route.method == 'update') {
                products[index] = route.product
                if(category._id != route.product.category._id && category._id != null) products.splice(index, 1)
                setProducts([...products]);
                route = {};
                return;
            } 
            else if (index == -1 && route.method == 'create' && category._id == route.product.category._id || !category._id ) {
                setProducts([...products, route.product]);
                route = {};
                return;
            }
 
        }
        else if (route && route.category) {
            setCategories([...categories, route.category])
            setCategory(route.category)
            route = {};
            return;
        }

    }, [route])

    return(

        <SafeAreaView style={styles.container}>

            <Header title={'produtos'}>
                <FilterButton
                    action={() => {
                        if(sort != 1) {
                            setSort(1);
                            sortProducts();
                        } else{
                            setSort(-1);
                            sortProducts();
                        }
                    }}
                    icon='filter-outline'
                    subIcon={sort == 1 ? 'alpha-z-box' : 'alpha-a-box'}
                />
            </Header>

            <View >
                <FlatList
                    style={{ marginBottom: 8 }}
                    data={categories}
                    keyExtractor={category => String(category._id)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    renderItem={({ item: thisCategory }) => (
                        <TouchableOpacity onPress={() => loadProductWithParams(thisCategory)}>
                            <Gradient
                                style={styles.buttonTag}
                                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                                colors={category._id == thisCategory._id ? ['#FF7239', '#FF4700'] : ['#E2E2E2', '#E2E2E2']}
                            >
                                <Text
                                    style={[
                                        styles.textSemiBold,
                                        category._id == thisCategory._id && { color: '#FFFFFF' }
                                    ]}
                                >{thisCategory.name}</Text>    
                            </Gradient>    
                        </TouchableOpacity>
                    )}
                    ListHeaderComponent={
                        categories.length !== 0 &&
                        <TouchableOpacity onPress={() => loadProductWithParams({})}>
                            <Gradient
                                style={[styles.buttonTag, { marginLeft: 16 }]}
                                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                                colors={!category._id ? ['#FF7239', '#FF4700'] : ['#E2E2E2', '#E2E2E2']}
                            >
                                <Text
                                    style={[
                                        styles.textSemiBold,
                                        !category._id && { color: '#FFFFFF' }
                                    ]}
                                >Todos</Text>
                            </Gradient>
                        </TouchableOpacity>    
                    }
                    ListEmptyComponent={<>
                        {loading &&
                        <Skeleton style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.buttonTag, { backgroundColor: '#E2E2E2' }]} />
                            <TouchableOpacity style={[styles.buttonTag, { backgroundColor: '#E2E2E2' }]} />
                            <TouchableOpacity style={[styles.buttonTag, { backgroundColor: '#E2E2E2' }]} />
                            <TouchableOpacity style={[styles.buttonTag, { backgroundColor: '#E2E2E2' }]} />
                            <TouchableOpacity style={[styles.buttonTag, { backgroundColor: '#E2E2E2' }]} />
                        </Skeleton>}     
                    </>}
                    ListFooterComponent={
                        categories.length > 0 &&
                        <TouchableOpacity
                            style={[
                                styles.buttonTag,
                                { borderColor: '#FF4700', borderWidth: 3, backgroundColor: 'none', marginRight: 16 }
                            ]}
                            onPress={navigateToNewCategory}
                        >
                            <Text
                                style={[
                                    styles.textSemiBold,
                                    { color: '#FF4700' }
                                ]}
                            >+ Adicionar</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
                

            <FlatList
                style={styles.column}
                data={products}
                keyExtractor={product => String(product._id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadProducts}
                onEndReachedThreshold={0.3}
                numColumns={1}
                renderItem={({ item: product }) => (
                    <Card
                        action={() => navigateToEdit(product)}
                        image={product.image}
                        title={product.name}
                        price={product.price}
                    />
                )}
                ListEmptyComponent={
                    loading ?
                        <Skeleton>
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                            <Card style={{ backgroundColor: '#F5F5F5', minHeight: 84 }} />
                        </Skeleton>
                    :
                    !loading && categories.length === 0 && page !=1 ?
                        <View style={{ paddingTop: 16 }}>
                            <Text style={[styles.subtitle, { marginBottom: 10 }]}>Adicione sua primeira Categoria</Text>
                            <Text style={styles.text}>As categorias servem para organizar a lista dos seus produtos. Clique abaixo e adicione sua primeira categoria.</Text>
                            <Image style={styles.illustration} source={img_more}/>
                            <Button title='Adicionar agora' action={navigateToNewCategory}/>
                        </View>
                    :
                    !loading && products.length === 0 && page !=1 &&
                        <View style={{ paddingTop: 16 }}>
                            <Text style={styles.subtitle}>Nenhum Produto nessa categoria. Clique no botão abaixo "+" e adicione!</Text>
                        </View>
                }                
            />
            
            <View style={styles.absoluteBottomRight}>
                {category.name && <ActionButton icon={'plus'} action={navigateToNewProduct}/>}
            </View>        
                
            
        </SafeAreaView>
    )
}