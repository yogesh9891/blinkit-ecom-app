import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import { toastError, toastSuccess } from '../utils/toastError';
import { applyCouponApi, getCouponApi } from '../services/coupon.service';
import { getAuth } from '../utils/auth';
import { getCartApi } from '../services/cart.service';

export default function Applycoupon(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [couponArr, setCouponArr] = useState([]);
    const [description, setdescription] = useState("");
    const [code, setCode] = useState("");
    const [user, setUser] = useState("");
    const [cartArr, setCartArr] = useState("");
    const [total, setTotal] = useState("");
    const getUserCart = async () => {
        try {
          let {data: res} = await getCartApi();
          if (res && res?.success) {
            setCartArr(res.data);
          }
          return;
        } catch (error) {
          console.error(error);
          toastError(error);
        }
      };
    
      useEffect(() => {
        if (cartArr && cartArr.length > 0) {
          let carttotal = cartArr.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue.quantity * currentValue.price;
          }, 0);
    
          setTotal(carttotal);
        }
      }, [cartArr]);
    
      const authCheck = async () => {
        let tokenObj = await getAuth();
        if (tokenObj) {
          setUser(tokenObj.user);
        }
      };

    
    const handleApplyCoupon = async () => {
      
        try {
            if(code == ""){
                toastError("Please Enter Code")
            }
            let obj = {
                discountCode:code,
                total
            }
            let {data:res} = await applyCouponApi(obj);
            console.log(res,"meemememememememememememem")
            if(res.data && res.couponIsValid){
                toastSuccess(res.message);
                navigation.navigate("Cart")
            } else 
            {
                toastError(res.message) 
            }
          
        } catch (error) {
            toastError(error)
        }

    }


    const getCoupon = async () => {
        try {
          let {data:res} = await getCouponApi(`isGlobal=true&isActive=true`);
          if (res.data && res.data?.length > 0) {
            setCouponArr(res.data)
          }
        } catch (error) {
          toastError(error)
        }
      };
    useEffect(() => {
        if(isFocused){
            getCoupon();
            authCheck();
            getUserCart();
        }
      }, [isFocused]);
    return (
        <>
            <Header stackHeader={true} screenName={"Apply Coupon"} rootProps={props} />


            <ScrollView style={styles1.bgwhite}>
                <View>
                    <View style={styles1.cuponheader}>
                        <View style={[styles1.cponbox, styles1.rowflex1]}>
                            <TextInput placeholder='Enter Coupon Code' value={code} onChangeText={(val)=>setCode(val)} placeholderTextColor="#878ccc" style={styles1.cuponinput} />
                            <Pressable onPress={()=>handleApplyCoupon()}><Text style={styles1.aplytxt}> APPLY  </Text></Pressable>
                        </View>
                    </View>


                    <View style={[styles.pdlr, styles.mttop10]}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#000' }}>Available Coupons</Text>
                        {
                            couponArr &&  couponArr.map((coupo,index) => (
                                <View style={[styles.rowflex1, styles1.boxproductnoti, styles.mttop10]} key={index}>
                            <View style={styles1.leftpanleofr}>
                                <Text style={styles1.prodthedi}>{coupo.discountCode}</Text>
                                {/* <Text style={styles1.prodtsubhedin}>Get Cashback upto ₹100</Text>
                                
                                <View style={styles1.dflx}>
                                    <Text style={styles1.prodtsubhe}>Minimum assured cashback of ₹15 per Transaction</Text>
                                </View> */}
                                <Pressable onPress={() => { setdescription(coupo); setModalVisible(true)}}><Text style={styles1.viwdetls} >View Details</Text></Pressable>


                            </View>
                            <Pressable style={styles1.rightpanel} onPress={() => setCode(coupo.discountCode)}>
                                <Text style={styles1.aplybtn} >Apply</Text>
                            </Pressable>
                        </View>
                            ))
                        }
                        
                    </View>
                </View>



                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }} style={styles1.modelpostion}>
                    <View style={styles1.centeredView}>
                        <View style={styles1.modalView}>
                            <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Text style={{ fontSize: 12, fontWeight: '600', color: "#667080", }}>Coupon Details</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 13, fontWeight: '600', color: '#000', }}>{description?.discountCode}</Text>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#000', marginBottom: 12, }}>{description?.description}</Text>
                                {/* <View style={styles1.modelflex}>
                                    <AntDesign name={'checksquare'} size={10} color={'#8ED16F'} />
                                    <Text style={styles1.modaltext}>Total value of items must be ₹249 or more</Text>
                                </View>
                                <View style={styles1.modelflex}>
                                    <AntDesign name={'checksquare'} size={10} color={'#8ED16F'} />
                                    <Text style={styles1.modaltext}>Minimum assured cashback of ₹10 per transaction</Text>
                                </View>
                                <View style={styles1.modelflex}>
                                    <AntDesign name={'checksquare'} size={10} color={'#8ED16F'} />
                                    <Text style={styles1.modaltext}>Offer can be available thrice per customer</Text>
                                </View>
                                <View style={styles1.modelflex}>
                                    <AntDesign name={'checksquare'} size={10} color={'#8ED16F'} />
                                    <Text style={styles1.modaltext}>Offer only vaild with Mobikwik wallet</Text>
                                </View>
                                <View style={styles1.modelflex}>
                                    <AntDesign name={'checksquare'} size={10} color={'#8ED16F'} />
                                    <Text style={styles1.modaltext}>Offer vaild till 30th September 22</Text>
                                </View>
                                <View style={styles1.modelflex}>
                                    <AntDesign name={'checksquare'} size={10} color={'#8ED16F'} />
                                    <Text style={styles1.modaltext}>Other TnCs may Apply</Text>
                                </View> */}

                            </View>
                            <Pressable style={[styles1.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <AntDesign name={'closecircle'} size={20} color={'#000'} />
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* <Pressable style={[styles.button, styles.buttonOpen]}>
            <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}

                <View style={{ marginBottom: 100. }}></View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
            <Image  style={{ width: wp(100), height:hp(11) }} source={require('../../assets/img/footeraddbgimg1.png')} />
            </View>
        </>
    )
}
const styles1 = StyleSheet.create({
    cuponheader: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        shadowColor: "#000",
        paddingVertical: 15,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    cuponinput: {
        backgroundColor: '#EDF0FF',
        padding: 10,
        borderRadius: 5,
        width: wp(70)
    },
    rowflex1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    aplytxt: {
        fontWeight: '700',
        color: '#EB3C24',
        marginLeft: 15,
        fontSize: 14,

    },
    bgwhite: {
        backgroundColor: '#fff',
        flex: 1,

    },
    boxproductnoti: {
        backgroundColor: '#EDF0FF',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    leftpanleofr: {
        width: wp(55)
    },
    prodthedi: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
        marginBottom: 5
    },
    prodtsubhedin: {
        fontSize: 11,
        fontWeight: '500',
        color: '#000',
        marginBottom: 3

    },
    prodtsubhe: {
        fontSize: 10,
        color: '#667080',
        fontWeight: '400',
        lineHeight: 15,
        marginBottom: 4,
        width: wp(40)
    },
    prodtdate: {
        fontWeight: '700',
        color: '#667080',
        fontSize: 11,

    },
    dflx: {
        display: 'flex',
        flexDirection: 'row',

    },
    aplybtn: {
        color: '#EB3C24',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    viwdetls: {
        fontSize: 11,
        marginLeft: 5,
        fontWeight: '700',
        color: '#EB3C24',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 15,
        width: wp(90),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modaltext: {
        fontSize: 11,
        marginLeft: 5,
    },
    modelflex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7
    },
    modelpostion: {
        position: 'relative',

    },
    buttonClose: {
        position: 'absolute',
        top: -30,
        right: 0,
    }


})