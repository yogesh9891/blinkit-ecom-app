import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
export default function ProductNotifiction(props) {
    return (
        <>
            <Header stackHeader={true} screenName="Notification" rootProps={props} />


            <ScrollView>
                <View style={styles1.bgcolorwhite}>
                    <View style={[styles.rowflex1, styles1.boxproductnoti, styles.mttop10]}>
                        <View style={styles1.leftpanleofr}>
                            <Text style={styles1.prodthedi}>PAYTM100</Text>
                            <Text style={styles1.prodtsubhedin}>Get Cashback upto ₹100</Text>
                            <View style={styles1.dflx}>
                                <Text style={styles1.prodtsubhe}>Minimum assured cashback of ₹15 per Transaction</Text>
                                <Text style={styles1.viwdetls}>View Details</Text>
                            </View>

                            <Text style={styles1.prodtdate}>Vaild Till: 22 Sep 2022</Text>
                        </View>
                        <View style={styles1.rightpanel}>
                            <Text style={styles1.aplybtn}>Apply</Text>
                        </View>
                    </View>

                    <View style={[styles.rowflex1, styles1.boxproductnoti, styles.mttop10]}>
                        <View style={styles1.leftpanleofr}>
                            <Text style={styles1.prodthedi}>Hot Deal</Text>
                            <Text style={styles1.prodtsubhedin}>15% OFF on Dahi</Text>
                            <Text style={styles1.prodtsubhe}>Enjoy 15% off on Ghar Jaisa Dahi.</Text>
                            <Text style={styles1.periodoffer}>Limited Period Offer.</Text>
                            <Text style={styles1.offercolor}>OFFER TILL 22 SEP 22</Text>
                        </View>
                        <View style={styles1.rightpanel}>
                            <Image style={styles1.notifactinimg} source={require('../../assets/img/notifacation-img1.png')}  resizeMode='contain' />
                            <Text style={styles1.aplybtn}>Apply</Text>
                        </View>
                    </View>

                    <View style={[styles.rowflex1, styles1.boxproductnoti, styles.mttop10]}>
                        <View style={styles1.leftpanleofr}>
                            <Text style={styles1.prodthedi}>MOBI100</Text>
                            <Text style={styles1.prodtsubhedin}>Get Cashback uptp ₹100</Text>
                            <View style={styles1.dflx}>
                                <Text style={styles1.prodtsubhe}>Minimum assured cashback of ₹15 per Transaction</Text>
                                <Text style={styles1.viwdetls}>View Details</Text>
                            </View>

                            <Text style={styles1.prodtdate}>Vaild Till: 22 Sep 2022</Text>
                        </View>
                        <View style={styles1.rightpanel}>
                            <Text style={styles1.aplybtn}>Apply</Text>
                        </View>
                    </View>

                    <View style={[styles.rowflex1, styles1.boxproductnoti, styles.mttop10]}>
                        <View style={styles1.leftpanleofr}>
                            <Text style={styles1.prodthedi}>Hot Deal</Text>
                            <Text style={styles1.prodtsubhedin}>15% OFF on Dahi</Text>
                            <Text style={styles1.prodtsubhe}>Enjoy 15% off on Taaza Paneer.</Text>
                            <Text style={styles1.periodoffer}>Limited Period Offer.</Text>
                            <Text style={styles1.offercolor}>OFFER TILL 22 SEP 22</Text>
                        </View>
                        <View style={styles1.rightpanel}>
                            <Image style={styles1.notifactinimg} source={require('../../assets/img/notifacation-img2.png')}  resizeMode='contain'  />
                            <Text style={styles1.aplybtn}>Apply</Text>
                        </View>
                    </View>

                    <View style={[styles.rowflex1, styles1.boxproductnoti, styles.mttop10]}>
                        <View style={styles1.leftpanleofr}>
                            <Text style={styles1.prodthedi}>MOBI100</Text>
                            <Text style={styles1.prodtsubhedin}>Get Cashback uptp ₹100</Text>
                            <View style={styles1.dflx}>
                                <Text style={styles1.prodtsubhe}>Minimum assured cashback of ₹15 per Transaction</Text>
                                <Text style={styles1.viwdetls}>View Details</Text>
                            </View>

                            <Text style={styles1.prodtdate}>Vaild Till: 22 Sep 2022</Text>
                        </View>
                        <View style={styles1.rightpanel}>
                            <Text style={styles1.aplybtn}>Apply</Text>
                        </View>
                    </View>

                    <View style={{ marginBottom: 60, }}></View>
                </View>

            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                <Image  style={{ width: wp(100), height:hp(11) }} source={require('../../assets/img/footeraddbgimg1.png')} />
            </View>
        </>
    )
}
const styles1 = StyleSheet.create({
    bgcolorwhite: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 10,
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
    viwdetls: {
        fontSize: 9,
        marginLeft: 5,
        fontWeight: '700',
        color: '#667080',
    },
    aplybtn: {
        color: '#EB3C24',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    offercolor: {
        color: '#EB3C24',
        fontWeight: '700',
        fontSize: 9
    },
    periodoffer: {
        color: '#667080',
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 5,
    },
    notifactinimg:{
        width:wp(24),
        height:hp(13)
    }

})