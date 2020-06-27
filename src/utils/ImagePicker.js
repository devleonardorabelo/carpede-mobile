import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const openPicker = async () => {
    const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true
    }).catch(err => {
        return message = {
            cancelled: err,
        };
    });
    return image;
}

const uploadImage = async (image, directory) => {

    const file = image.substring(image.lastIndexOf('/') + 1);
    const randomNumber = Math.floor(Math.random() * Math.floor(99999));
    const filename = randomNumber + file;
    const refNewImage = `${directory}/${filename}`

    await auth().signInAnonymously();
    
    const upload = await storage()
        .ref(refNewImage)
        .putFile(image);

    if(upload) {
        const uploaded = await storage().ref(refNewImage).getDownloadURL();
        return uploaded;
    } else {
        return null;
    } 

}

export {
    openPicker,
    uploadImage
}