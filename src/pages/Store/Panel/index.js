import React, { useContext, useEffect } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../../contexts/auth';
import apiReq from '../../../services/reqToken';
import messaging from '@react-native-firebase/messaging';

import { format } from '@buttercup/react-formatted-input';
import { WhatsappFormat } from '../../../utils/treatString';

import styles from '../../../global';
import { NavItem, Avatar } from '../../../components/Item';
import { CustomHeader } from '../../../components/Header';

export default function Panel() {

	const { store, signOut } = useContext(AuthContext);
	const whatsapp = format(store.whatsapp, WhatsappFormat)
	const navigation = useNavigation();

	const loadToken = async () => {
		const { data } = await apiReq.get('panel');
		const token = await messaging().getToken();
		if(!data || data != token) {
			const { data } = await apiReq.post('panel', { token })
		}
	}

	const navigate = screen => navigation.navigate(screen);

	useEffect(() => {
		loadToken();
	}, []);
	
    return(
		
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="#FDFDFD" barStyle='dark-content' />
			<CustomHeader icon={'logout'} action={signOut} />
			
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