import { FlatList, Image, ImageBackground,TouchableOpacity,  Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Savenewaddress() {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Showaddress")
}, 2000);
  }, [])
  return (
    <Pressable onPress={()=> navigation.navigate("Showaddress")} style={styles.bodycentertext}>
        <Image style={{width:wp(45), height:hp(25)}} source={require('../../assets/img/saveimgadd.png')} />

        <Text style={{marginTop:20, fontWeight:'600', color:'#000', fontSize:20}}>Your address has been saved</Text>
    </Pressable>
  )
}
