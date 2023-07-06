import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Categorypage from '../../components/Categorypage';
import Otpverification from '../../components/Otpverification';
import SingIn from '../../components/SingIn';

const Stack = createNativeStackNavigator();
export default function UnAuthorisedStack() {
    return (

        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                }}
                name="SingIn" component={SingIn}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                }}
                name="Otpverification" component={Otpverification} />

        </Stack.Navigator>
    )
};