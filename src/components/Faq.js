import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../stylecomponents/Style'

import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-paper';
import Header from '../ReusableComponents/Header';


export default function Faq(props) {
    return (
        <>

            <Header stackHeader={true} screenName={"Customer Support & FAQ"} rootProps={props} />


            <View style={styles1.redundbody}>
                <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                    <View style={styles.dflexone}>
                        <AntDesign name={'tago'} size={20} color={'#FE4773'} style={styles.mr2} />
                        <Text style={styles.setingtext}>Coupons & Offers</Text>
                    </View>
                    <Text>
                        <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                    </Text>
                </View>
                <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                    <View style={styles.dflexone}>
                        <MaterialIcons name={'support-agent'} size={20} color={'#3740AA'} style={styles.mr2} />
                        <Text style={styles.setingtext}>General Inquiry</Text>
                    </View>
                    <Text>
                        <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                    </Text>
                </View>

                <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                    <View style={styles.dflexone}>
                        <MaterialIcons name={'payment'} size={20} color={'#8ED16F'} style={styles.mr2} />
                        <Text style={styles.setingtext}>Payment Related</Text>
                    </View>
                    <Text>
                        <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                    </Text>
                </View>

                <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                    <View style={styles.dflexone}>
                        <Octicons name={'feed-person'} size={20} color={'#FFCD41'} style={styles.mr2} />
                        <Text style={styles.setingtext}>Feedback & Suggestions</Text>
                    </View>
                    <Text>
                        <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                    </Text>
                </View>

                <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                    <View style={styles.dflexone}>
                        <MaterialCommunityIcons name={'newspaper-variant-multiple'} size={20} color={'#A0616A'} style={styles.mr2} />
                        <Text style={styles.setingtext}>Order / Products Related</Text>
                    </View>
                    <Text>
                        <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                    </Text>
                </View>

            </View>
        </>
    )
}


const styles1 = StyleSheet.create({
    redundbody: {
        backgroundColor: '#F3F3F3',
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
})