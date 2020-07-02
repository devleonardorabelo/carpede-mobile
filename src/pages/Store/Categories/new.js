import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import apiReq from '../../../services/reqToken';
import AuthContext from '../../../contexts/auth';
import { openPicker } from '../../../utils/ImagePicker';
import { uploadImage } from '../../../services/uploadImage';

import styles from '../../../global';
import { Header } from '../../../components/Header';
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ChooseImageMode } from '../../../components/Modal';

export default function NewCategory() {

    const navigation = useNavigation();
    const { store } = useContext(AuthContext);
    const { params } = useRoute();
    
    const [ image, setImage ] = useState({});
    const [ uploading, setUploading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ alert, setAlert ] = useState('');
    const [ status, setStatus ] = useState(false);
    const [ modalActived, setModalActived ] = useState(false);

    async function getImage(mode) {
        let picker = await openPicker(mode);
        setModalActived(false);
        if(picker.cancelled) return;
        setUploading(true);
        setImage({ preview: picker.path })

        const upload = await uploadImage(picker.path, store.store_id);
        setImage({ uri: upload, preview: picker.path })
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

        if(params && params.action == 'goBack') {
            setTimeout(() => { navigation.navigate('StoreProducts', {
                method: 'create', 
                category: data.category
            }) }, 500);
            return; 
        }
        

        setTimeout(() => { navigation.navigate('StoreCategories', {
            method: 'create', 
            category: data.category
        }) }, 500);
        return;

    }

    return(
        <SafeAreaView style={styles.container}>

            <Header title='nova categoria' />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>

                <PreviewImage
                    image={image.preview ? { uri: image.preview } : { uri: image.uri }}
                    action={() => setModalActived(true)}
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
            <ChooseImageMode 
                title='Escolha uma opção' 
                actionClose={() => setModalActived(false)}
                actionCamera={() => getImage('camera')}
                actionGallery={() => getImage('gallery')}
                active={modalActived}
            />
        </SafeAreaView>
    )
}