import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../ReusableComponents/Header';
export default function Address(props) {
    const navigate = useNavigation()

    return (
        <>
            <Header stackHeader={true} screenName={"Subscription Plan"} rootProps={props} />

            <View style={styles.bodycentertext} >
                <Image source={require('../../assets/img/shopping_img.png')} />
                <Text style={{ textAlign: 'center', fontSize: 22, marginTop: 20, color: '#000', fontWeight: '600' }}>No Subscription Added</Text>
                <Text style={{ color: '#959494', textAlign: 'center', marginTop: 12, fontSize: 15, }}>To see the saved Subscription here, add your Subscription Products</Text>

                <Pressable onPress={() => navigate.navigate('Addvacation')} style={{ width: '100%', marginTop: 20, }}>
                    <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                        <Text style={styles.textsubcript}>Add Subscription</Text>
                    </LinearGradient>
                </Pressable>
            </View>

        </>


    )
}