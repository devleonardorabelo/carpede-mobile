import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import apiReq from '../../../services/reqToken'

import { treatPrice } from '../../../utils/treatString';

import styles from '../../../global';
import { CardItem, Checkout } from '../../../components/Item';
import { Header } from '../../../components/Header';
import { LinearButton } from '../../../components/Button';


export default function Show() {

    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const order = route.params.order;

    async function handleUpdate() {

        setLoading('loading');

        Alert.alert(
            'Confirmar Entrega',
            'Confirmar que o pedido saiu para entrega?',
            [
                { text: 'Cancelar', onPress: () => { return }, style: 'cancel' },
                //{ text: 'Entregar e notificar', onPress: () => { return }, style: 'cancel' },
                { text: 'Entregar', onPress: async () => {
                    const { data } = await apiReq.post('orders/edit', { id: order._id, status: 'done', date: order.date });
                    if(data) navigation.navigate('StoreOrders', {
                        method: 'update',
                        order: data.order
                    });   
                }}
            ]
        )
    }

    async function handleDelete() {  
    
        Alert.alert(
            'Apagar Pedido',
            'Deseja mesmo apagar este pedido? Pedidos apagados não poderão ser mais recuperados.',
            [
                { text: 'Cancelar', onPress: () => { return }, style: 'cancel' },
                { text: 'Apagar', onPress: async () => {
                    const { data } = await apiReq.post('orders/delete', { id: order._id })
                    if(data) navigation.navigate('StoreOrders', {
                        method: 'destroy',
                        order: data.order
                    });  
                }}
            ]
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header title={`#${order.order_id}`}>
                <LinearButton icon={'trash-can-outline'} action={handleDelete}/>
            </Header>

            <View style={[styles.column,{ marginBottom: 0 }]}>
                <Text style={styles.subtitle}>Detalhes do pedido:</Text> 
                <Text style={[styles.textBold,{ color: '#639DFF' }]}>
                    {order.time} - 
                    {order.status == 'waiting' && ` Aguardando entrega`}
                    {order.status == 'done' && ` Pedido entregue`}
                </Text>
            </View>
                
            <FlatList
                style={styles.orderList}
                data={order.products}
                keyExtractor={product => String(product._id)}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                renderItem={({ item: product }) => (
                    <CardItem
                        amount={product.quantity}
                        title={product.product.name}
                        price={product.product.price}
                    />
                )}
                ListFooterComponent={
                    <View style={{ marginTop: 16 }}>
                        <Text style={styles.text}>Total:</Text>
                        <Text style={styles.subtitle}>{treatPrice(order.value)}</Text>    
                    </View>
                }
            />    

            <Checkout data={order} action={handleUpdate} />

        </SafeAreaView>
    )
}