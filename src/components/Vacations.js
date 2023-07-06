import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../ReusableComponents/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Vacations(props) {
    const navigate = useNavigation()
    return (
        <>
            <Header stackHeader={true} screenName={"Address"} rootProps={props} />

            <View style={styles.bodycentertext} >
                <Image source={require('../../assets/img/add-imgcenter.png')} />
                <Text style={{ textAlign: 'center', fontSize: 22, marginTop: 20, color: '#000', fontWeight: '600' }}>No Vacation Added</Text>
                <Text style={{ color: '#959494', textAlign: 'center', marginTop: 12, fontSize: 15, }}>To see the saved Vacation here, add your Vacations</Text>

                <Pressable onPress={() => navigate.navigate('Addvacation')} style={{ width: '100%', marginTop: 20, }}>
                    <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                        <Text style={styles.textsubcript}>Add Vacation</Text>
                    </LinearGradient>
                </Pressable>
            </View>

            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                <Image style={{ width: wp(100) }} source={require('../../assets/img/footeraddbgimg.png')} />
            </View>

        </>


    )
}