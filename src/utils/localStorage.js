import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeCategoryFromLocal = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@category_data', jsonValue);
    return jsonValue;
  } catch (e) {
    console.error('Category Error', e);
  }
};

export const getCategoryFromLocal = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@category_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Category Error', e);
    return null;
  }
};

export const removeCategoryFromLocal = async () => {
  try {
    const jsonValue = await AsyncStorage.removeItem('@category_data');
    return true;
  } catch (e) {
    console.error('Category Error', e);
    return null;
  }
};

export const saveStoreLocal = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@category_data', jsonValue);
    return jsonValue;
  } catch (e) {
    console.error('Store Error', e);
  }
};

export const getStoreFromLocal = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@Store_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Store Error', e);
    return null;
  }
};

export const removeStoreFromLocal = async () => {
  try {
    const jsonValue = await AsyncStorage.removeItem('@Store_data');
    return true;
  } catch (e) {
    console.error('Store Error', e);
    return null;
  }
};

export const getCoordinatesFromLocal = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@Coordinates_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Coordinates Error', e);
    return null;
  }
};
export const saveCoordinatesLocal = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@Coordinates_data', jsonValue);
    return jsonValue;
  } catch (e) {
    console.error('Coordinates Error', e);
  }
};
export const removeCoordinatesFromLocal = async () => {
  try {
    const jsonValue = await AsyncStorage.removeItem('@Coordinates_data');
    return true;
  } catch (e) {
    console.error('Store Error', e);
    return null;
  }
};
