import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';

export default function OrderId(props) {
    return (
        <>
            <Header stackHeader={true} screenName={"Order"} rootProps={props} />


            <ScrollView>
                <View style={[styles.bgwhite, styles.pdlr, styles.p]}>
                    <View style={[styles.rowflex1, styles.mttop10]}>
                        <View>
                            <Text style={[styles.fontw6, styles.textblack, styles.fntsize]} >Order Summary</Text>
                            <Text style={{ fontSize: 11, marginTop: 4, fontWeight: '500', color: '#000' }}>24/04/22 at 01:45am</Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, color: '#212529', fontSize: 11, }}>We sent an email to orders@ebslon.com with your order confirmation and bill. </Text>
                    <Text style={[styles.fontw6, styles.textblack, styles.mttop20, styles.mbbotom10, styles.font22]}>5 items in the order</Text>

                    <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                            <Image source={require('../../assets/img/banana.png')} />
                        </View>
                        <View>
                            <Text style={[styles.prodctname]}>Banana</Text>
                            <View style={[styles.rowflex1, styles.pricesection]}>
                                <View>
                                    <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                    <Text style={styles.prctext}>₹82</Text>
                                </View>

                                <View>
                                    <Text style={styles.txtp}>Weight </Text>
                                    <Text style={[styles.prctext]}>1kg</Text>
                                </View>

                            </View>
                        </View>
                    </View>

                    <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                            <Image source={require('../../assets/img/onion.png')} />
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
                            <Image source={require('../../assets/img/amul.png')} />
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
                            <Image source={require('../../assets/img/maggi.png')} />
                        </View>
                        <View>
                            <View>
                                <Text style={[styles.prodctname]}>Maggi Spicy Epice</Text>
                            </View>
                            <View style={[styles.rowflex1, styles.pricesection]}>
                                <View>
                                    <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                    <Text style={styles.prctext}>₹35</Text>
                                </View>

                                <View>
                                    <Text style={styles.txtp}>Weight </Text>
                                    <Text style={[styles.prctext]}>250g</Text>
                                </View>

                            </View>
                        </View>
                    </View>


                    <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                            <Image source={require('../../assets/img/lays.png')} />
                        </View>
                        <View>
                            <View>
                                <Text style={[styles.prodctname]}>Lay’s Classic</Text>
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

                </View>
                <View style={[styles.stikybg, styles.mbbotom10]}>
                    <Text style={[styles.bildetlheding, styles.mb5]}>Bill Details</Text>

                    <View style={[styles.rowflex1, styles.mb5]}>
                        <Text style={styles.bilrate}>M.R.P.</Text>
                        <Text style={styles.bilrate}>453</Text>
                    </View>

                    <View style={[styles.rowflex1, styles.mb5]}>
                        <Text style={styles.bilrate}>Product Discount</Text>
                        <Text style={styles.bilrate}>-133</Text>
                    </View>

                    <View style={[styles.rowflex1, styles.mb5]}>
                        <Text style={styles.bilrate}>Delivery Charges</Text>
                        <Text style={styles.bilrate}>+15</Text>
                    </View>

                    <View style={[styles.rowflex1, styles.mb5]}>
                        <Text style={[styles.bildetlheding]}>Bill Total</Text>
                        <Text style={[styles.bildetlheding]}> <FontAwesome name={'inr'} size={13} color={'#000'} /> 335</Text>
                    </View>
                    <View style={styles.stkybgimg}>
                        <Image source={require('../../assets/img/rectangle.png')} />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}