import React, {useState, useEffect, useContext, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getAuth} from '../../utils/auth';
import AuthorisedStack from './AuthorisedStack';
import UnAuthorisedStack from './UnAuthorisedStack';
import {axiosApiInstance, LocationContext, TokenContext} from '../../../App';

const Stack = createNativeStackNavigator();
export default function Root() {
  const [locationObj, setLocationObj] = useContext(LocationContext);
  const [isAuthorised, setIsAuthorised] = useContext(TokenContext);

  const authCheck = async () => {
    let tokenObj = await getAuth();
    if (tokenObj) {
      setIsAuthorised(true);
    } else {
      setIsAuthorised(false);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  useMemo(() => {

    axiosApiInstance.interceptors.request.use(
      async config => {
        const token = await getAuth();
     

        if (token) {
          config.headers['authorization'] = 'Bearer ' + token?.token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );
    axiosApiInstance.interceptors.response.use(
      res => {
        // Add configurations here
        return res;
      },
      async err => {
        console.log('INterceptor error++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(err,null,2),"")
        console.log('INterceptor error__________________________________________________________________________________');

        // await logoutUser()

        return Promise.reject(err);
      },
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthorised ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AuthorisedStack"
              component={AuthorisedStack}
            />
          </>
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
              gestureDirection: 'horizontal',
            }}
            name="UnAuthorisedStack"
            component={UnAuthorisedStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
