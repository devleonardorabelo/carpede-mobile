import React, { useState, useContext } from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../../services/api';
import AuthContext from '../../../contexts/auth';

import { openPicker, uploadImage } from '../../../utils/ImagePicker';
import { format } from '@buttercup/react-formatted-input';
import { WhatsappFormat } from '../../../utils/treatString';

import styles from '../../../global';
import { Header } from '../../../components/Header';
import { Input, InputPassword } from '../../../components/Input';
import { Button, ButtonTransparent } from '../../../components/Button';
import { Avatar } from '../../../components/Item';


export default function Signup(){
    
    const navigation = useNavigation();
    const { sign } = useContext(AuthContext);

    const [ image, setImage ] = useState({});
    const [ uploading, setUploading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState(''); 
    const [ whatsapp, setWhatsapp ] = useState({});
    const [ password, setPassword ] = useState('');
    const [ alert, setAlert ] = useState();
    const [ status, setStatus ] = useState();


    async function getImage() {
        let picker = await openPicker();
        if(picker.cancelled) return;
        setUploading(true);
        const upload = await uploadImage(picker.path, 'avatar');
        setImage({ uri: upload })
        setUploading(false);
    }

    async function handleSignup() {

        setStatus('loading');

        const { data } = await api.post('signup', {
            avatar: image.uri,
            name,
            whatsapp: whatsapp.raw,
            email,
            password
        });

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        await sign({
            avatar: image.uri,
            name,
            whatsapp: whatsapp.raw,
            email,
            token: data.token,
            store_id: data._id
        });

        return;

    }

    const navigateToSignin = () => navigation.navigate('Signin');

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'nova conta'}/>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>
                
                <Text style={[styles.title,{ marginBottom: 16 }]}>Criar uma conta</Text>

                <Avatar
                    image={image}
                    title={name}
                    subtitle={whatsapp.formatted}
                    icon={'image'}
                    action={getImage}
                    loading={uploading}
                    transparent={image.uri}
                    isChangeable
                />

                <Input
                    title={'Nome da Loja'}
                    name={'name'}
                    placeholder={'Pizzaria do João'}
                    action={e => setName(e)}
                    focus={true}
                    maxLength={30}
                    error={alert}
                />

                <Input
                    title={'Whatsapp'}
                    name={'whatsapp'}
                    placeholder={'01234567890'}
                    action={e => setWhatsapp(format(e, WhatsappFormat))}
                    keyboard={'numeric'}
                    maxLength={11}
                    error={alert}
                />

                <Input
                    title={'Email'}
                    name={'email'}
                    placeholder={'email@email.com'}
                    action={e => setEmail(e.toLowerCase())}
                    maxLength={30}
                    capitalize={'none'}
                    error={alert}
                />

                <InputPassword
                    title={'Senha'}
                    name={'password'}
                    placeholder={'* * * * * * * *'}
                    action={e => setPassword(e)}
                    error={alert}
                />

                <Button 
                    action={handleSignup}
                    title={'Começar agora!'}
                    status={status}
                    disabled={uploading} 
                    disabledText='Carregando Imagem...'
                />

                <ButtonTransparent
                    action={navigateToSignin}
                    title={'Já tenho uma conta'}
                    icon={'login'}
                />    

            </ScrollView>           
        </SafeAreaView>
    )
}