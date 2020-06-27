import React from 'react';
import { Text, Image, SafeAreaView, View } from 'react-native' ;
import { useNavigation } from '@react-navigation/native';
import img_business from '../../assets/illustrations/business.png'
import styles from '../../global';
import { Button } from '../../components/Button'

export default function Home() {

	const navigation = useNavigation();
	const navigateToSignin = () => navigation.navigate('Signin');

	return (

		<SafeAreaView style={styles.container}>
			
			<View style={[styles.column,{ marginTop: 40 }]}>
				<Text style={[styles.title, { marginBottom: 10 }]}>Seja bem-vindo ao Carpede!</Text>
				<Text style={styles.subtitle}>Proporcione aos seus clientes um atendimento personalizado</Text>
				<Image style={[styles.illustration, { marginTop: 50 }]} source={img_business} />
				<Button title={'Quero criar a minha Loja'} action={navigateToSignin} />
			</View>
			
		</SafeAreaView>
	)
}
