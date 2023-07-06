import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import { useNavigation } from '@react-navigation/native';
import { create } from 'react-test-renderer';
import { toastError } from '../utils/toastError';
import { getUserSingleOrderApi } from '../services/order.service';
import { generateFilePath } from '../utils/file';

export default function Ordersummary(props) {
    const navigation = useNavigation()

    const [orderId, setOrderId] = useState("")
    const [orderObj, setOrderObj] = useState("")
    useEffect(() => {

        if (props.route.params.orderId) {
            setOrderId(props.route.params.orderId);
        }
      }, [props.route.params.orderId])



      useEffect(() => {

        if (orderId) {
            getSingleOrder(orderId)
        }
      }, [orderId])
    
      const getSingleOrder = async (id) => {
    
        try {
            let { data: res } = await getUserSingleOrderApi(id);
            if (res && res?.success) {
                console.log(res.data,"orderr")
                setOrderObj(res.data)
            }
            return
    
        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }
    return (
        <>
            <Header stackHeader={true} screenName={"Order"} rootProps={props} />

            <ScrollView>
                <View style={[styles.bgwhite, styles.pdlr, styles.p]}>
                    <View style={[styles.rowflex1, styles.mttop10]}>
                        <View>
                            <Text style={[styles.fontw6, styles.textblack, styles.fntsize]} >Order Summary</Text>
                            <Text style={{ fontSize: 11, marginTop: 4, fontWeight: '500', color: '#000' }}>Arrived at 01:45 pm</Text>
                        </View>

                        <Pressable onPress={() => navigation.goBack()}>
                            <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                                <Text style={[styles.textsubcript, styles.smalltext]}>Download PI</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                    <Text style={{ marginTop: 10, color: '#212529', fontSize: 11, }}>We sent an email to orders@ebslon.com with your order confirmation and bill. </Text>
                    <Text style={[styles.fontw6, styles.textblack, styles.mttop20, styles.mbbotom10, styles.font22]}>{orderObj.totalItems} items in the order</Text>
                    {
                        orderObj.items && orderObj.items.map(item =>   <View style={styles.productdetlsbox}>
                            <View style={styles.prodctimgwidt}>
                                <Image  style={styles1.cartboximg}  source={{uri:generateFilePath(item.productImageUrl)}} resizeMode='contain'  />
                            </View>
                            <View>
                                <Text style={[styles.prodctname]}>{item.name}</Text>
                                <View style={[styles.rowflex1, styles.pricesection]}>
                                    <View>
                                        <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                        <Text style={styles.prctext}>₹{item.price}</Text>
                                    </View>
    
                                    <View>
                                        <Text style={styles.txtp}>Weight </Text>
                                        <Text style={[styles.prctext]}>{item.attribute.name}</Text>
                                    </View>
    
                                </View>
                            </View>
                        </View>)
                    }
                  

                    {/* <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                            <Image  style={styles1.cartboximg} source={require('../../assets/img/vegetable3.png')} resizeMode='contain' />
                        </View>
                        <View>
                            <Text style={[styles.prodctname]}>Onion (Piyaaz)</Text>
                            <View style={[styles.rowflex1, styles.pricesection]}>
                                <View>
                                    <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                    <Text style={styles.prctext}>₹82</Text>
                                </View>

                                <View>
                                    <Text style={styles.txtp}>Weight </Text>
                                    <Text style={[styles.prctext]}>500ml</Text>
                                </View>

                            </View>
                        </View>
                    </View>

                    <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                            <Image style={styles1.cartboximg} source={require('../../assets/img/vegetable2.png')} resizeMode='contain' />
                        </View>
                        <View>
                            <View>
                                <Text style={[styles.prodctname]}>Amul Strawberry Ice-Cream</Text>
                            </View>
                            <View style={[styles.rowflex1, styles.pricesection]}>
                                <View>
                                    <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                    <Text style={styles.prctext}>₹135</Text>
                                </View>

                                <View>
                                    <Text style={styles.txtp}>Weight </Text>
                                    <Text style={[styles.prctext]}>1g</Text>
                                </View>

                            </View>
                        </View>
                    </View>

                    
                    <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                            <Image style={styles1.cartboximg} source={require('../../assets/img/stationeryitem08.png')} resizeMode='contain' />
                        </View>
                        <View>
                            <View>
                                <Text style={[styles.prodctname]}>Amul Strawberry Ice-Cream</Text>
                            </View>
                            <View style={[styles.rowflex1, styles.pricesection]}>
                                <View>
                                    <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                    <Text style={styles.prctext}>₹135</Text>
                                </View>

                                <View>
                                    <Text style={styles.txtp}>Weight </Text>
                                    <Text style={[styles.prctext]}>1g</Text>
                                </View>

                            </View>
                        </View>
                    </View> */}



                </View>
                <View style={[styles.stikybg, styles.mbbotom10]}>
                    <Text style={[styles.bildetlheding, styles.mb5]}>Bill Details</Text>

                    <View style={[styles.rowflex1, styles.mb5]}>
                        <Text style={styles.bilrate}>M.R.P.</Text>
                        <Text style={styles.bilrate}> {orderObj.totalPrice}</Text>
                    </View>

                    <View style={[styles.rowflex1, styles.mb5]}>
                        <Text style={styles.bilrate}>Product Discount</Text>
                        <Text style={styles.bilrate}>0</Text>
                    </View>

                    <View style={[styles.rowflex1, styles.mb5]}>
                        <Text style={styles.bilrate}>Delivery Charges</Text>
                        <Text style={styles.bilrate}>0</Text>
                    </View>

                    <View style={[styles.rowflex1, styles.mb5]}>
                        <Text style={[styles.bildetlheding]}>Bill Total</Text>
                        <Text style={[styles.bildetlheding]}> <FontAwesome name={'inr'} size={13} color={'#000'} /> {orderObj.totalPrice}</Text>
                    </View>
                    <View style={styles.stkybgimg}>
                        <Image source={require('../../assets/img/rectangle.png')} />
                    </View>
                </View>

                <View style={[styles.orddtails, styles.mbbotom10]}>
                    <Text style={[styles.bildetlheding, styles.mb5]}>Order Details</Text>

                    <View style={[styles.odrprosrer, styles.dflx]}>
                        <Text style={[styles.lftpnael, styles.mb5, styles.bilrate]}>Order ID</Text>
                        <Text style={[styles.mb5, styles.bilrate]}>{orderId}</Text>
                    </View>

                    <View style={[styles.odrprosrer, styles.dflx]}>
                        <Text style={[styles.lftpnael, styles.mb5, styles.bilrate]}>Payment</Text>
                        <Text style={[styles.mb5, styles.bilrate]}>Pay on delivery</Text>
                    </View>

                    <View style={[styles.odrprosrer, styles.dflx]}>
                        <Text style={[styles.lftpnael, styles.mb5, styles.bilrate]}>Deliver to</Text>
                        <Text style={{ fontSize: 12, color: '#212529', marginBottom: 5, display: 'flex', flexWrap: 'wrap', maxWidth: wp(65), }}>{orderObj?.userAddress?.addressName}</Text>
                    </View>

                    <View style={[styles.odrprosrer, styles.dflx]}>
                        <Text style={[styles.lftpnael, styles.mb5, styles.bilrate]}>Date</Text>
                        <Text style={[styles.mb5, styles.bilrate]}>{ new Date(orderObj.createdAt).toDateString()}</Text>
                    </View>
                    
                </View>

                <View style={styles.hlpcntr}>
                    <View style={[styles.dflx, styles.mbbotom15]}>
                        <Feather name={'phone-call'} size={27} color={'#46B3A5'} style={styles.lefthelp} />
                        <View>
                            <Text style={styles.bildetlheding}>Need Help With Your Order?</Text>
                            <Text style={styles.helptext}>Support is always available</Text>
                        </View>
                    </View>
                    <View style={[styles.dflx, styles.mbbotom10]}>
                        <Feather name={'message-square'} size={27} color={'#575A89'} style={styles.lefthelp} />
                        <View>
                            <Text style={styles.bildetlheding}>Need Help With Your Order?</Text>
                            <Text style={styles.helptext}>Support is always available</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </>
    )
}
const styles1 = StyleSheet.create({
    cartboximg:{
        width:wp(30),
        height:hp(9),
        textAlign: 'center',
        alignSelf: 'center',
    
    }
}) 