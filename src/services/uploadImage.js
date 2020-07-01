import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

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
        console.log(uploaded)
        return uploaded;
    } else {
        return null;
    } 

}

export {
    uploadImage
}