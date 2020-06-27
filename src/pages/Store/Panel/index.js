import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../../contexts/auth';
import apiReq from '../../../services/reqToken';
import messaging from '@react-native-firebase/messaging';

import { format } from '@buttercup/react-formatted-input';
import { WhatsappFormat } from '../../../utils/treatString';

import styles from '../../../global';
import { NavItem, Avatar } from '../../../components/Item';
import { CustomHeader } from '../../../components/Header';
import { AlertNotification } from '../../../components/Alert';

export default function Panel() {

	const { store, signOut, notification } = useContext(AuthContext);
	const whatsapp = format(store.whatsapp, WhatsappFormat)
	const navigation = useNavigation();

	const loadToken = async () => {
		const { data } = await apiReq.get('panel');
		const token = await messaging().getToken();
		if(!data || data != token) {
			const { data } = await apiReq.post('panel', { token })
			console.log(data)
		}
	}

	const navigate = screen => navigation.navigate(screen);

	useEffect(() => {
		loadToken();
	}, []);
	
    return(

		<SafeAreaView style={styles.container}>

			<CustomHeader icon={'logout'} action={signOut} />

			<AlertNotification
				title={notification.title}
				text={notification.text}
				show={notification.show}
			/>
			
			<Avatar
				image={{ uri: store.avatar}}
				title={store.name}
				subtitle={whatsapp.formatted}
			/>	

			<View style={styles.column}>

				<NavItem
					action={() => navigate('StoreOrders')}
					icon='bike'
					title='Pedidos'
					subtitle='Lista de pedidos ativos'
				/>
				<NavItem
					action={() => navigate('StoreProducts')}
					icon='package-variant-closed'
					title='Produtos'
					subtitle='Lista de produtos'
				/>
				<NavItem
					action={() => navigate('StoreCategories')}
					icon='tag-outline'
					title='Categorias'
					subtitle='Categoria dos pedidos'
				/>	
				<NavItem
					action={() => navigate('StoreProfile')}
					icon='account-circle-outline'
					title='Perfil'
					subtitle='Informações da Loja'
				/>
			</View>

		</SafeAreaView>

	)
	
}