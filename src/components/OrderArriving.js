import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Header from '../ReusableComponents/Header';
import { useNavigation } from '@react-navigation/native';
export default function OrderArriving(props) {
  const navigation = useNavigation()

  return (
    <>
      <Header stackHeader={true} screenName={"Order"} rootProps={props} />

    <ScrollView>
     
        <View style={styles1.bgwhite}>

    <View style={[styles.rowflex1, styles.pdlr, styles.mttop10, styles.mbbotom10]}>
<Image style={{width:wp(38), height:hp(10)}} source={require('../../assets/img/bikedevely1.png')} />
<CountdownCircleTimer
            isPlaying={true}
            duration={400}
            colors={['#F03893']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) =>
              <View style={{ backgroundColor: '#A5ACFF', height:165, width:165,zIndex:-1, borderRadius:100, display:"flex", justifyContent:"center", alignItems:"center" }}>
                <Text style={{fontSize:20, fontWeight:'500', color:'#fff'}}>ARRIVING IN</Text>
                <Text style={{fontSize:20, fontWeight:'500', color:'#fff'}}>{remainingTime}</Text>
              </View>}
          </CountdownCircleTimer>
    </View>
    <View style={styles.pdlr}>
      <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
        <Text style={{width: 6, height: 6, borderRadius:50,  backgroundColor: "#8ED16F"}}></Text>
        <Text style={{color:'#8ED16F', fontWeight:'600'}}>CONFIRMED</Text>
        <Text style={{width:30, height: 2, backgroundColor: "#8ED16F"}}></Text>
        <Text style={{width: 6, height: 6, borderRadius:50,  backgroundColor: "#8ED16F"}}></Text>
        <Text style={{color:'#8ED16F', fontWeight:'600'}}>ON THE WAY</Text>
        <Text style={{width:30, height: 2, backgroundColor: "#A2A2A2"}}></Text>
        <Text style={{width: 6, height: 6, borderRadius:50,  backgroundColor: "#A2A2A2"}}></Text>
        <Text style={{fontWeight:'600'}}>ARRIED</Text>
      </View>
      </View>


          <View style={[styles1.arvistatus, styles.mttop10,]}>
            <View style={[styles1.carduserhed, styles.rowflex1, styles.mbbotom10]}>
              <View style={styles.dflx}>
                <Image style={{width:wp(12), marginRight:10, height:hp(6)}} source={require('../../assets/img/userimg2.png')} />
                <View style={styles1}>
                  <Text style={{ fontWeight: '600', fontSize: 11, color: '#000' }}>Hi, I’m Pradeep</Text>
                  <Text style={{ fontSize: 9, fontWeight: '500', color: '#868686', }}>Your Delivert Partner</Text>
                </View>
              </View>
              <View>
                <View style={[styles1.vaccinabox, styles.dflx]}>
                  <Fontisto name={'injection-syringe'} size={16} color={'#3740AA'} style={styles1.vacciocn} />
                  <Text style={{ color: '#3740AA', fontSize: 11, fontWeight: '600' }}>Vaccinated</Text>
                </View>
              </View>
              <Feather name={'phone-call'} size={18} color={'#46B3A5'} style={styles1.callicon} />
            </View>

            <View style={[styles1.carduserhed, styles.rowflex1, styles.mbbotom10]}>
              <View style={styles.dflx}>
                <Ionicons name={'bicycle'} size={21} color={'#4E1D14'} style={styles.mr2} />
                <Text style={[styles1.f10, styles.colorblck]}>Avarage riding speed during delivery </Text>
              </View>
              <View style={styles.dflx}>
                <Text style={[styles.fontw6, styles.colorblck, styles1.f12,]}>22 kmph </Text>
              </View>
            </View>

            <View style={[styles1.carduserhed, styles.rowflex1, styles.mbbotom10]}>
              <View style={styles.dflx}>
                <AntDesign name={'checkcircleo'} size={21} color={'#8ED16F'} style={styles.mr2} />
                <Text style={[styles1.f10, styles.colorblck]}>Helping delivery partners stay safe </Text>
              </View>
              <View style={styles.dflx}>
                <Text style={[styles.fontw6, styles.colorblck, styles1.f12,]}>Know More<Entypo name={'chevron-right'} size={12} color={'#000'} style={{ marginTop: -10, }} /> </Text>
              </View>
            </View>

            <View style={[styles1.deliverto, styles.mbbotom10]}>

              <View style={[styles.rowflex1]}>
                <View style={[styles.dflx]} >
                  <FontAwesome5 name={'box'} size={23} color={'#3740AA'} style={[styles.mr2, styles.dflx]} />
                  <Pressable onPress={()=> navigation.navigate("Ordersummary")}>
                    <Text style={[styles.colorblck, styles.fontw6, styles1.f13]}>Order ID: JNJQWDN232</Text>
                    <View style={[styles.dflx, styles.mttop5]}>
                      <Text style={[styles.mr2, { fontSize: 9, color: '#868686', }]}>2 Items </Text>
                      <Text style={[styles.mr2, styles.fontw6, { fontSize: 9, color: '#868686', }]}>2 Items</Text>
                    </View>
                  </Pressable>
                </View>
                <Entypo name={'chevron-right'} size={25} color={'#EB8E24'} />
              </View>

              <View style={[styles.rowflex1, styles.mttop10, styles.bordrtop]}>
                <View style={[styles.dflx]} >
                  <Entypo name={'location'} size={23} color={'#FE4773'} style={[styles.mr2, styles.dflx]} />
                  <View>
                    <Text style={[styles.colorblck, styles.fontw6, styles1.f13, styles.mb5]}>Delivering To</Text>
                    <Text style={{ fontSize: 9, color: '#868686', }}>1207, D-mall, Netaji Subhash Place 408, Netaji Subhash...</Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable onPress={() => navigation.navigate('Faq')} style={[styles1.carduserhed, styles.rowflex1, styles.mbbotom10]}>
              <View style={styles.dflx}>
                <Feather name={'message-square'} size={21} color={'#575A89'} style={styles.mr2} />
                <Text style={[styles.fontw6, styles.colorblck, styles1.f12,]}>Customer Support & FAQ </Text>
              </View>
              <View style={styles.dflx}>
                <Text style={[styles.fontw6, styles.colorblck, styles1.f12,]}>Help<Entypo name={'chevron-right'} size={15} color={'#000'} style={{ marginTop: -10, }} /> </Text>
              </View>
            </Pressable>



            <View style={[styles1.fteriimmg, {marginBottom:30}]}>
              <Image style={{width:wp(90), height:hp(23)}} source={require('../../assets/img/ref-img1.png')} />
            </View>

          </View>
        </View>
      </ScrollView>

    </>
  )
}


const styles1 = StyleSheet.create({
  bgwhite: {
    backgroundColor: '#fff',
  },
  arvistatus: {
    backgroundColor: '#EDF0FF',
    paddingHorizontal: 15,
    paddingTop: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  carduserhed: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 10,
  },
  vaccinabox: {
    backgroundColor: '#C4E7E2',
    borderRadius: 50,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  vacciocn: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
    marginRight: 8,
  },
  callicon: {
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginTop: 3,
    width: 33,
    height: 33,
    borderColor: '#46B3A5',
  },
  f10: {
    fontSize: 11,
  },
  f12: {
    fontSize: 11,
  },
  f13: {
    fontSize: 12,
  },
  deliverto: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  bordrbotm: {
    borderBottomWidth: 0.9,
    borderColor: '#868686',
  },
  bordrtop: {
    borderTopColor: 'red',
    borderTopWidth: 2,
    height: 15,

  }


})