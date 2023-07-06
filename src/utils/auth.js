import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginApi} from '../services/user.service';
import jwtDecode from 'jwt-decode';

export const storeAuthData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@auth_key', jsonValue);
    return jsonValue;
  } catch (e) {
    console.error('Auth Error', e);
  }
};

export const getAuth = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@auth_key');

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Auth Error', e);
    return null;
  }
};

export const checkAuth = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@auth_key');
    return jsonValue != null ? true : false;
  } catch (e) {
    console.error('Auth Error', e);
  }
};

export const loginUser = async formData => {
  try {
    let {data: response} = await loginApi(formData);
    if (response) {
      console.log(response);
      let decodedToken = await jwtDecode(response.token);
      let authToken = {
        ...response.data,
        token: response.token,
        role: decodedToken.role,
        userId: decodedToken.userId,
        user: decodedToken.user,
      };
      await storeAuthData(authToken);
      return authToken;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('@auth_key');
  
  return true;
};
