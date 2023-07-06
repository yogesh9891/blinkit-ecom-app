import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../stylecomponents/Style'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-paper';
import Header from '../ReusableComponents/Header';

export default function Generalinfo(props) {
    return (
        <>
            <Header stackHeader={true} screenName={"General Info"} rootProps={props} />



            <View style={styles1.redundbody}>
                <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                    <View style={styles.dflexone}>
                        <AntDesign name={'filetext1'} size={20} color={'#42D0BC'} style={styles.mr2} />
                        <Text style={styles.setingtext}>Terms & Conditions</Text>
                    </View>
                    <Text>
                        <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                    </Text>
                </View>

                <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                    <View style={styles.dflexone}>
                        <Feather name={'lock'} size={20} color={'#D04242'} style={styles.mr2} />
                        <Text style={styles.setingtext}>Terms & Conditions</Text>
                    </View>
                    <Text>
                        <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                    </Text>
                </View>

                <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                    <View style={styles.dflexone}>
                        <Ionicons name={'newspaper-outline'} size={20} color={'#D0A042'} style={styles.mr2} />
                        <Text style={styles.setingtext}>Open Source Licenses</Text>
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