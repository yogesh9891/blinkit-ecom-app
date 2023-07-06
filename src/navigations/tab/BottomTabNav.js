import { View, Text, StyleSheet } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../components/Home';
import Categories from '../../components/Categories';
import Subscription from '../../components/Subscription';
import StationeryHome from '../../components/StationeryHome';
import Octicons from "react-native-vector-icons/Octicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { storeCategoryFromLocal } from '../../utils/localStorage';
import { getServiceApi } from '../../services/category.service';
import { toastError } from '../../utils/toastError';
import { generalModelStatuses } from '../../utils/constant';
const Tab = createBottomTabNavigator();
export default function BottomTabNav(props) {

    const [serviceArr, setServiceArr] = useState([]);

    useEffect(() => {
        getService();
      }, []);
  

      const getService = async () => {
        try {
          let {data:res} = await getServiceApi(`status=${generalModelStatuses.APPROVED}`);
          if (res.data && res.data?.length > 1) {

            console.log(res.data.slice(0,2),"res.data.slice(0,2)res.data.slice(0,2)res.data.slice(0,2)")
            setServiceArr(res.data.slice(0,2));
          }
        } catch (error) {
          toastError(error)
        }
    
      };
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#EB8E24',
            }}>
            <Tab.Screen options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Octicons name="home" color={color} size={15} />
                ),
            }} 
            name="Home" component={Home}  />

            {
                serviceArr && serviceArr.length == 2 && serviceArr.map((el,index) => (
                    <Tab.Screen key={index} options={{
                        headerShown: false,
                        tabBarLabel: el.name,
                       
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="appstore-o" color={color} size={15} />
                        ),
                   
                    }} 
                    
                    name={el.name} initialParams={{service:el}} component={StationeryHome}  />
                ))
            }

            <Tab.Screen options={{
                headerShown: false,

                tabBarLabel: 'Subscription',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="calendar-clock-outline" color={color} size={15} />
                ),
            }} 
            name="Subscription" component={Subscription} />
        
        </Tab.Navigator>
    )
}
