import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
const AuthContext = createContext({ signed: false });

export const AuthProvider = ({ children }) => {

    const [ store, setStore ] = useState(null);
    const [ notification, setNotification ] = useState({});

    useEffect(() => {
        async function checkSigned() {
            try {
              const current = await AsyncStorage.getItem('@Carpede:store');
              if(current) setStore(JSON.parse(current))  
            } catch (err) {
                console.log(err)
            }
        }
        checkSigned();
    },[])

    async function sign(store) {
        const { avatar, name, whatsapp, email, token, store_id } = store;

        setStore({
            avatar,
            name,
            whatsapp,
            email,
            token,
            store_id
        })
        try {
            await AsyncStorage.setItem('@Carpede:store', JSON.stringify(store));
        } catch (err) {
            console.log(err)
        }
        
    }

    async function signOut() {
        setStore(null);
        await AsyncStorage.clear();
    }

    messaging().onMessage(async remoteMessage => {

		setNotification({
			title: remoteMessage.notification.title,
			text: remoteMessage.notification.body,
			show: true
		});

		setTimeout(() => setNotification({}), 5000)
		
	});
    
    return (
        <AuthContext.Provider value={{ signed: !!store , store, sign, signOut, notification}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;