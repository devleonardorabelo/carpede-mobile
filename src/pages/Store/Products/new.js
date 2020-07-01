import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import apiReq from '../../../services/reqToken';
import AuthContext from '../../../contexts/auth';
import { openPicker } from '../../../utils/ImagePicker';
import { uploadImage } from '../../../services/uploadImage';

import styles from '../../../global';
import { Header } from '../../../components/Header';
import { PreviewImage } from '../../../components/Image';
import { Input, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ChooseImageMode } from '../../../components/Modal';

export default function NewProduct() {

    const { params } = useRoute();
    const navigation = useNavigation();
    const { store } = useContext(AuthContext);

    const [ image, setImage ] = useState({});
    const [ uploading, setUploading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ category, setCategory ] = useState({});
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ alert, setAlert ] = useState('');
    const [ status, setStatus ] = useState(false);
    const [ modalActived, setModalActived ] = useState(false);

    async function getImage(mode) {
        let picker = await openPicker(mode);
        setModalActived(false);
        if(picker.cancelled) return;
        setUploading(true);

        const upload = await uploadImage(picker.path, store.store_id);
        setImage({ uri: upload })
        setUploading(false);
    }

    async function handleNewProduct() {

        setStatus('loading');
        
        let { data } = await apiReq.post('products/new',{
            image: image.uri,
            name,
            description,
            price,
            category
        })

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        setStatus('done');

        setTimeout(() => { navigation.navigate('StoreProducts', {
            method: 'create', 
            product: data.product
        }) }, 500);

    }

    const navigateToSelectCategory = () => navigation.navigate('StoreLoadCategory', { type: 'add' });

    useEffect(() => {
        function handleSelectCategory() {
            if(params) {
                setCategory(params.category)
            }
        }    
        handleSelectCategory();
    },[params])

    return(
        <SafeAreaView style={styles.container}>
            <Header title='novo produto' />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>
                
                <PreviewImage
                    image={image}
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
                <Input
                    title={'Descrição'}
                    name={'description'}
                    action={e => setDescription(e)}
                    maxLength={100}
                    error={alert}
                />
                <View style={{
                    flexDirection: 'row'
                }}>

                    <Input
                        style={{
                            marginRight: 16,
                            width: 120,
                            height: 50
                        }}
                        title={'Preço'}
                        name={'price'}
                        keyboard={'numeric'}
                        action={e => setPrice(e)}
                        maxLength={8}
                        error={alert}
                    />

                    <Select
                        style={{ flexGrow: 1 }}
                        title='Categoria'
                        name={'category'}
                        text={category.name}
                        action={navigateToSelectCategory}
                        error={alert}
                    />
                
                </View>
                
                <Button 
                    action={handleNewProduct} 
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