import React from 'react';
import { Text, Image, SafeAreaView, View, StatusBar } from 'react-native' ;
import { useNavigation } from '@react-navigation/native';
import styles from '../../global';
import { Button } from '../../components/Button'

export default function Home() {

	const navigation = useNavigation();
	const navigateToSignin = () => navigation.navigate('Signin');

	return (

		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="#FDFDFD" barStyle='dark-content' />
			<View style={[styles.column,{ marginTop: 40 }]}>
				<Text style={[styles.title, { marginBottom: 10 }]}>Seja bem-vindo ao Carpede!</Text>
				<Text style={[styles.subtitle,{ marginBottom: 32 }]}>Proporcione aos seus clientes um atendimento personalizado</Text>
				<Button title={'Quero criar a minha Loja'} action={navigateToSignin} />
			</View>
			
		</SafeAreaView>
	)
}
