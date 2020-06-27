import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import apiReq from '../../../services/reqToken';
import AuthContext from '../../../contexts/auth';
import { openPicker, uploadImage } from '../../../utils/ImagePicker';

import styles from '../../../global';
import { Header } from '../../../components/Header';
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export default function NewCategory() {

    const navigation = useNavigation();
    const { store } = useContext(AuthContext);
    
    const [ image, setImage ] = useState({});
    const [ uploading, setUploading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ alert, setAlert ] = useState('');
    const [ status, setStatus ] = useState(false);

    async function getImage() {
        let picker = await openPicker();
        if(picker.cancelled) return;
        setUploading(true);
        const upload = await uploadImage(picker.path, store.store_id);
        setImage({ uri: upload })
        setUploading(false);
    }

    async function handleNewCategory() {

        setStatus('loading');
        
        let { data } = await apiReq.post('categories/new',{
            image: image.uri,
            name,
        })

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        setStatus('done');

        setTimeout(() => { navigation.navigate('StoreCategories', {
            method: 'create', 
            category: data.category
        }) }, 500);

    }

    return(
        <SafeAreaView style={styles.container}>

            <Header title='nova categoria' />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>

                <PreviewImage
                    image={image}
                    action={getImage}
                    icon='image-outline'
                    loading={uploading}
                />
                
                <Input
                    title={'Nome'}
                    name={'name'}
                    action={e => setName(e)}
                    maxLength={40}           
                    error={alert}
                />
                
                <Button 
                    action={handleNewCategory} 
                    title={'Salvar'} 
                    status={status} 
                    disabled={uploading} 
                    disabledText='Carregando Imagem...'
                /> 

            </ScrollView>
        </SafeAreaView>
    )
}