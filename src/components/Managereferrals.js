import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../stylecomponents/Style'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-paper';
import Header from '../ReusableComponents/Header';

export default function Managereferrals(props) {
    return (
        <>

            <Header stackHeader={true} screenName={"Manage Referrals"} rootProps={props} />

            <ScrollView>

                <View style={styles1.redundbody}>

                    <View style={styles1.redeemarea}>
                        <Text style={[styles.textcenter, styles.fontw6, styles.colorblck, styles1.font12, styles.mbbotom10]}>Have a referral code?</Text>
                        <Pressable onPress={() => navigate.navigate('Otpverification')} style={{ width: '100%', marginTop: 20, }}>
                            <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                                <Text style={styles.textsubcript}>Buy Now</Text>
                            </LinearGradient>
                        </Pressable>


                    </View>


                    <View style={[styles1.sharecodebox, styles1.shadowinput, { marginTop: 12, }]}>
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, }}>
                            <Image style={{width:wp(62), height:hp(30)}} source={require('../../assets/img/manage-img1.png')} />

                        </View>
                        <Text style={{ color: '#000', fontSize: 17, fontWeight: '500', lineHeight: 23, textAlign: 'center' }}>Invite a friend to Fasto and get <Text style={{ color: '#F56D17' }}> 25% off </Text> on next purchase</Text>
                        <Text style={{ borderBottomWidth: .7, borderBottomColor: '#ccc', width: wp(80), marginBottom: 15, }}></Text>
                        <Text style={{ textAlign: 'center', color: '#000', fontSize: 17, fontWeight: '500', marginBottom: 15, }}>Share your code</Text>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <View style={styles1.copybox}>
                                <Text style={{ width: wp(40), textAlign: 'center', fontSize: 16, color: '#000', fontWeight: '500' }}>XHOAN34</Text>
                                <Icon style={[styles1.iconcopybox, { width: wp(18) }]} size={22} name="filetext1" color="#F56D17" />
                            </View>

                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <View style={styles1.socaliconwithd}>
                                <Entypo style={styles1.socalbox} size={30} name="facebook-with-circle" color="#017996" />
                                <FontAwesome style={styles1.socalbox} size={30} name="whatsapp" color="#0ACF83" />
                                <Entypo style={styles1.socalbox} size={30} name="linkedin-with-circle" color="#074169" />
                            </View>
                        </View>
                    </View>

                    <View style={[styles1.redeemarea, { paddingHorizontal: 39, }]}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#000' }}>Your Referrals</Text>
                        <Text style={{ textAlign: 'center', color: '#868686', marginTop: 10 }}>No referrals yet. Share with friends to start saving!</Text>
                    </View>




                </View>
            </ScrollView>

        </>
    )
}

const styles1 = StyleSheet.create({
    redundbody: {
        backgroundColor: '#F3F3F3',
        flex: 1,

        paddingTop: 10,
    },
    redeemarea: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    font12: {
        fontSize: 14,
    },
    sharecodebox: {
        backgroundColor: '#fff',
        textAlign: 'center',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,

    },
    shadowinput: {
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,

        elevation: 9,
    },
    iconcopybox: {
        backgroundColor: '#DEEBFC',
        borderRadius: 5,
        textAlign: 'center',
        paddingVertical: 13,
    },
    socalbox: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        shadowColor: "#bbb",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,

    },
    socaliconwithd: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(60),
        marginTop: 25,
    },
    copybox: {
        backgroundColor: '#fff',
        width: wp(60),
        paddingLeft: 20,

        borderRadius: 8,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 1.22,

        elevation: 2,
    },
})