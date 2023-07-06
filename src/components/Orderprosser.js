import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Header from '../ReusableComponents/Header';
import { toastError } from '../utils/toastError';
import { getUserOrderApi } from '../services/order.service';
import { getAuth } from '../utils/auth';
export default function Orderprosser(props) {
    const navigate = useNavigation()
      const focused = useIsFocused();

    const [orderArr, setOrderArr] = useState([]);
  const [user, setUser] = useState("");
  const [pageName, setPageName] = useState("");
    const getUserOrder = async (userID) => {
        try {

            let query = '';
            if(user){
                query += 'userId='+userID; 
            }
            let { data: res } = await getUserOrderApi(query);
            if (res && res?.success) {
                console.log(res.data,"orders")
                setOrderArr(res.data)
            }
            return

        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }

 

  const authCheck = async () => {
    let tokenObj = await getAuth();
    if (tokenObj) {
        setUser(tokenObj.user);
    } 
  };

  useEffect(() => {
    if(user && user?._id){
        getUserOrder(user?._id);
    }

  },[user])

  useEffect(() => {
    if(focused){
        authCheck();
    }

  },[focused])
    return (
        <>
            <Header stackHeader={true} screenName={"Order"} rootProps={props} />

            <ScrollView>
               <View style={[styles.pdlr, styles.bgbodyapp, styles.mttop10]}>
                {
                 orderArr && orderArr.map((order,inde) =>    <Pressable key={inde} onPress={() => navigate.navigate('Ordersummary',{orderId:order._id})} style={styles.boxoderproser}>
                    <View style={styles.leftordersie}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.bgyelow}>{`${order.status}`.toUpperCase()}</Text>
                            <Text style={styles.textblack}>{ new Date(order.createdAt).toDateString()}</Text>
                        </View>
                        <Text style={[styles.fontw6, styles.colorblck, styles.mttop10, styles.mbbotom10]}>{order._id}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={[styles.fontw6, styles.colorblck, styles.mr2]}>{order.totalItems} Items</Text>
                            <Text style={{ backgroundColor: '#000', width: 5, height: 5, borderRadius: 50, marginRight: 10, marginTop: 10, }}></Text>
                            <Text style={[styles.fontw6, styles.colorblck,]}>₹{order.totalPrice}</Text>
                        </View>
                    </View>
                    <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
                </Pressable> )
                }
                

                    {/* <Pressable onPress={() => navigate.navigate('Ordersummary')} style={styles.boxoderproser}>
                        <View style={styles.leftordersie}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>

                                <Pressable onPress={() => navigate.navigate('Ordersummary')}>
                                    <Text style={styles.bggreen}>Delivered</Text>
                                </Pressable>

                                <Text style={styles.textblack}>26 Jan 2022, 09:45pm</Text>
                            </View>
                            <Text style={[styles.fontw6, styles.colorblck, styles.mttop10, styles.mbbotom10]}>0AMIWBE12345</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.fontw6, styles.colorblck, styles.mr2]}>17 Items</Text>
                                <Text style={{ backgroundColor: '#000', width: 5, height: 5, borderRadius: 50, marginRight: 10, marginTop: 10, }}></Text>
                                <Text style={[styles.fontw6, styles.colorblck,]}>₹337</Text>
                            </View>
                        </View>
                        <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
                    </Pressable>

                    <View style={styles.boxoderproser}>
                        <View style={styles.leftordersie}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.bggray}>Cencenlled</Text>
                                <Text style={styles.textblack}>26 Jan 2022, 09:45pm</Text>
                            </View>
                            <Text style={[styles.fontw6, styles.colorblck, styles.mttop10, styles.mbbotom10]}>0AMIWBE12345</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.fontw6, styles.colorblck, styles.mr2]}>17 Items</Text>
                                <Text style={{ backgroundColor: '#000', width: 5, height: 5, borderRadius: 50, marginRight: 10, marginTop: 10, }}></Text>
                                <Text style={[styles.fontw6, styles.colorblck,]}>₹337</Text>
                            </View>
                        </View>
                        <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
                    </View>

                    <View style={styles.boxoderproser}>
                        <View style={styles.leftordersie}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.bggreen}>Delivered</Text>
                                <Text style={styles.textblack}>26 Jan 2022, 09:45pm</Text>
                            </View>
                            <Text style={[styles.fontw6, styles.colorblck, styles.mttop10, styles.mbbotom10]}>0AMIWBE12345</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.fontw6, styles.colorblck, styles.mr2]}>17 Items</Text>
                                <Text style={{ backgroundColor: '#000', width: 5, height: 5, borderRadius: 50, marginRight: 10, marginTop: 10, }}></Text>
                                <Text style={[styles.fontw6, styles.colorblck,]}>₹337</Text>
                            </View>
                        </View>
                        <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
                    </View>

                    <View style={styles.boxoderproser}>
                        <View style={styles.leftordersie}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.bgyelow}>Delivered</Text>
                                <Text style={styles.textblack}>26 Jan 2022, 09:45pm</Text>
                            </View>
                            <Text style={[styles.fontw6, styles.colorblck, styles.mttop10, styles.mbbotom10]}>0AMIWBE12345</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.fontw6, styles.colorblck, styles.mr2]}>17 Items</Text>
                                <Text style={{ backgroundColor: '#000', width: 5, height: 5, borderRadius: 50, marginRight: 10, marginTop: 10, }}></Text>
                                <Text style={[styles.fontw6, styles.colorblck,]}>₹337</Text>
                            </View>
                        </View>
                        <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
                    </View>

                    <View style={styles.boxoderproser}>
                        <View style={styles.leftordersie}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.bggreen}>Delivered</Text>
                                <Text style={styles.textblack}>26 Jan 2022, 09:45pm</Text>
                            </View>
                            <Text style={[styles.fontw6, styles.colorblck, styles.mttop10, styles.mbbotom10]}>0AMIWBE12345</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.fontw6, styles.colorblck, styles.mr2]}>17 Items</Text>
                                <Text style={{ backgroundColor: '#000', width: 5, height: 5, borderRadius: 50, marginRight: 10, marginTop: 10, }}></Text>
                                <Text style={[styles.fontw6, styles.colorblck,]}>₹337</Text>
                            </View>
                        </View>
                        <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
                    </View> */}


                </View>
            </ScrollView>

        </>
    )
}