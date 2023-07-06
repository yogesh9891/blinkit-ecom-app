import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../ReusableComponents/Header';

export default function Norefunds(props) {
  return (
    <>
      <Header stackHeader={true} screenName={"Order"} rootProps={props} />


      <View style={styles.bodycentertext} >
        <Image source={require('../../assets/img/refund-img.png')} />
        <Text style={{ textAlign: 'center', fontSize: 22, marginTop: 20, color: '#000', fontWeight: '600' }}>No Refunds</Text>
        <Text style={{ color: '#959494', textAlign: 'center', marginTop: 12, fontSize: 15, }}>You have no active or past refunds.</Text>

      </View>




    </>
  )
}