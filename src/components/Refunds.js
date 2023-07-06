import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylecomponents/Style'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../ReusableComponents/Header';

export default function Refunds(props) {
    return (
        <>
            <Header stackHeader={true} screenName={"Refunds"} rootProps={props} />


            <ScrollView>
                <View style={styles1.redundbody}>

                    <View style={styles1.refnndsbox}>
                        <View style={[styles1.dateprosr, styles.dflx]}>
                            <Text style={styles1.proserbtn}>In Progress</Text>
                            <Text style={{ fontSize: 11, color: '#000', }}>26 Jan 2022, 09:45pm</Text>
                        </View>
                        <View style={styles.rowflex1}>
                            <Text style={styles1.refundhed}>0AMIWBE12345</Text>
                            <Entypo name={'chevron-right'} size={25} color={'#FE4773'} />
                        </View>

                        <View style={styles.dflx}>
                            <Text style={[styles.mr2, styles1.itetext]}>17 Items</Text>
                            <Text style={[styles.mr2, styles1.itetext]}>₹337</Text>
                        </View>
                    </View>

                    <View style={styles1.refnndsbox}>
                        <View style={[styles1.dateprosr, styles.dflx]}>
                            <Text style={styles1.inuccess}>Success</Text>
                            <Text style={{ fontSize: 11, color: '#000', }}>26 Jan 2022, 09:45pm</Text>
                        </View>
                        <View style={styles.rowflex1}>
                            <Text style={styles1.refundhed}>0AMIWBE12345</Text>
                            <Entypo name={'chevron-right'} size={25} color={'#FE4773'} />
                        </View>

                        <View style={styles.dflx}>
                            <Text style={[styles.mr2, styles1.itetext]}>17 Items</Text>
                            <Text style={[styles.mr2, styles1.itetext]}>₹337</Text>
                        </View>
                    </View>

                    <View style={styles1.refnndsbox}>
                        <View style={[styles1.dateprosr, styles.dflx]}>
                            <Text style={styles1.inuccess}>Success</Text>
                            <Text style={{ fontSize: 11, color: '#000', }}>26 Jan 2022, 09:45pm</Text>
                        </View>
                        <View style={styles.rowflex1}>
                            <Text style={styles1.refundhed}>0AMIWBE12345</Text>
                            <Entypo name={'chevron-right'} size={25} color={'#FE4773'} />
                        </View>

                        <View style={styles.dflx}>
                            <Text style={[styles.mr2, styles1.itetext]}>17 Items</Text>
                            <Text style={[styles.mr2, styles1.itetext]}>₹337</Text>
                        </View>
                    </View>

                    <View style={styles1.refnndsbox}>
                        <View style={[styles1.dateprosr, styles.dflx]}>
                            <Text style={styles1.proserbtn}>In Progress</Text>
                            <Text style={{ fontSize: 11, color: '#000', }}>26 Jan 2022, 09:45pm</Text>
                        </View>
                        <View style={styles.rowflex1}>
                            <Text style={styles1.refundhed}>0AMIWBE12345</Text>
                            <Entypo name={'chevron-right'} size={25} color={'#FE4773'} />
                        </View>

                        <View style={styles.dflx}>
                            <Text style={[styles.mr2, styles1.itetext]}>17 Items</Text>
                            <Text style={[styles.mr2, styles1.itetext]}>₹337</Text>
                        </View>
                    </View>

                    <View style={styles1.refnndsbox}>
                        <View style={[styles1.dateprosr, styles.dflx]}>
                            <Text style={styles1.inuccess}>Success</Text>
                            <Text style={{ fontSize: 11, color: '#000', }}>26 Jan 2022, 09:45pm</Text>
                        </View>
                        <View style={styles.rowflex1}>
                            <Text style={styles1.refundhed}>0AMIWBE12345</Text>
                            <Entypo name={'chevron-right'} size={25} color={'#FE4773'} />
                        </View>

                        <View style={styles.dflx}>
                            <Text style={[styles.mr2, styles1.itetext]}>17 Items</Text>
                            <Text style={[styles.mr2, styles1.itetext]}>₹337</Text>
                        </View>
                    </View>

                    <View style={styles1.refnndsbox}>
                        <View style={[styles1.dateprosr, styles.dflx]}>
                            <Text style={styles1.proserbtn}>In Progress</Text>
                            <Text style={{ fontSize: 11, color: '#000', }}>26 Jan 2022, 09:45pm</Text>
                        </View>
                        <View style={styles.rowflex1}>
                            <Text style={styles1.refundhed}>0AMIWBE12345</Text>
                            <Entypo name={'chevron-right'} size={25} color={'#FE4773'} />
                        </View>

                        <View style={styles.dflx}>
                            <Text style={[styles.mr2, styles1.itetext]}>17 Items</Text>
                            <Text style={[styles.mr2, styles1.itetext]}>₹337</Text>
                        </View>
                    </View>


                </View>
            </ScrollView>
        </>
    )
}

const styles1 = StyleSheet.create({
    refnndsbox: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    redundbody: {
        backgroundColor: '#F3F3F3',
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    proserbtn: {
        backgroundColor: '#F2DAB4',
        color: '#CC6932',
        borderRadius: 8,
        fontSize: 11,
        paddingHorizontal: 5,
        marginRight: 8,
        paddingVertical: 4,

    },
    inuccess: {
        backgroundColor: '#CFF2B4',
        color: '#32CC4B',
        borderRadius: 8,
        fontSize: 11,
        paddingHorizontal: 5,
        marginRight: 8,
        paddingVertical: 4,
    },

    refundhed: {
        paddingVertical: 10,
        fontSize: 14,
        color: '#000',
        fontWeight: '600',
    },
    itetext: {
        fontSize: 11,
        color: '#000',
    }

})