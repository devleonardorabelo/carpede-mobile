import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({ signed: false });

export const AuthProvider = ({ children }) => {

    const [ store, setStore ] = useState(null);

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
    
    return (
        <AuthContext.Provider value={{ signed: !!store , store, sign, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;