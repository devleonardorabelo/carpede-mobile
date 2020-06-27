import axios from 'axios';
import { API_DOMAIN } from '../constants/api';
import AsyncStorage from '@react-native-community/async-storage';

const apiReq = axios.create({
    baseURL: API_DOMAIN,
    timeout: 10000,
    headers: {
    'Content-type': 'application/json',
    },
});

apiReq.interceptors.request.use(
    
  async function(config) {
      
    const user = JSON.parse(await AsyncStorage.getItem('@Carpede:store'));
    const { token } = user;
    config.headers.authorization = `Bearer ${token}`;
    return config;

  },
  function(err) {
    return Promise.reject(err);
  }
);

export default apiReq;