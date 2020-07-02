import ImagePicker from 'react-native-image-crop-picker';

const openPicker = async mode => {
    switch (mode) {
        case 'camera':
            let uploadedByCamera = await ImagePicker.openCamera({
                width: 800,
                height: 800,
                cropping: true,
                mediaType: 'photo'
            }).catch(err => {
                return {
                    cancelled: true,
                    error: err,
                };
            });
            if(uploadedByCamera) return uploadedByCamera;
            break;
        case 'gallery':
            let uploadedByGallery = await ImagePicker.openPicker({
                width: 800,
                height: 800,
                cropping: true,
                mediaType: 'photo',
            }).catch(err => {
                return {
                    cancelled: true,
                    err: err,
                };
            });
            if(uploadedByGallery) return uploadedByGallery;
            break;
    }
    
}

export {
    openPicker
}