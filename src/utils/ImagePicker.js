import ImagePicker from 'react-native-image-crop-picker';

const openPicker = async mode => {
    switch (mode) {
        case 'camera':
            let uploadedByCamera = await ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true
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
                width: 300,
                height: 300,
                cropping: true
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