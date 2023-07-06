import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import React, { useState, useEffect, useContext,createContext } from 'react';
export const TokenContext = createContext();
export const LoaderContext = createContext();
export const LocationContext = createContext();
export const StoreContext = createContext();
import Root from './src/navigations/Stack/Root';
import { getAuth } from './src/utils/auth';
import axios from 'axios';
import Toast from 'react-native-toast-message';
export const axiosApiInstance = axios.create();
const App = () => {
  const [locationObj, setLocationObj] = useState(null);
  const [storeIdContext, setstoreIdContext] = useState("");
  const [isAuthorised, setIsAuthorised] = useState(false);
  return (
    <>

      <TokenContext.Provider value={[isAuthorised, setIsAuthorised]}>
      <LocationContext.Provider value={[locationObj, setLocationObj]}>
      <StoreContext.Provider value={[storeIdContext, setstoreIdContext]}>
        <Root />
        <Toast/>
        </StoreContext.Provider>
        </LocationContext.Provider>
      </TokenContext.Provider>



      {/* <SingIn /> */}
      {/* <Otpverification /> */}
      {/* <Categorypage /> */}
      {/* <Profilesetting /> */}
      {/* <Categories /> */}
      {/* <ProductDetails /> */}
      {/* <Profile /> */}


    </>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
