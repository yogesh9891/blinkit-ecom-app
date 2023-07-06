import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginApi} from '../services/user.service';
import jwtDecode from 'jwt-decode';

export const getStoreAuth = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@store_key');

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Store Error', e);
    return null;
  }
};

export const storeStoreId = async storeId => {
  try {
    // const jsonValue = JSON.stringify(value)
    console.log(storeId, 'storeIdstoreIdstoreIdstoreIdstoreId-------------------------------------------------');
    await AsyncStorage.setItem('@store_Id_Key', storeId);
    return storeId;
  } catch (e) {
    console.error('Auth Error', e);
  }
};

export const getStoreId = async () => {
  try {
    const storeId = await AsyncStorage.getItem('@store_Id_Key');
    return storeId;
  } catch (e) {
    console.error('Auth Error', e);
  }
};

export const storeStore = async store => {
  try {
    const jsonValue = JSON.stringify(store);
    await AsyncStorage.setItem('@store_Key', jsonValue);
    return jsonValue;
  } catch (e) {
    console.error('Auth Error', e);
  }
};

export const getStore = async () => {
  try {
    const store = await AsyncStorage.getItem('@store_Key');
    return jsonValue != null ? JSON.parse(store) : null;
  } catch (e) {
    console.error('Auth Error', e);
  }
};
