import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../stylecomponents/Style'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { toastError } from '../utils/toastError';
import { generateFilePath } from '../utils/file';
import { getAuth } from '../utils/auth';
import { getParentCategoriesApi } from '../services/category.service';
import { removeCategoryFromLocal } from '../utils/localStorage';

export default function Categorypage() {


  const navigate = useNavigation()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getParentCategories();
    // removeCategoryFromLocal()
  }, []);

  const mainCategory = ({ item, index }) => {
    return (
      <Pressable onPress={() =>navigate.navigate('BottomTabNav',{screen: "Home",category:item})} key={index}>
      <Image source={{uri:generateFilePath(item.categoryImage)}} style={[styles.mttop10, styles1.imgsmalwitd]} />
     </Pressable>
    );
};



const getParentCategories = async () => {

  try {
  let {data:res} = await getParentCategoriesApi();
    if (res && res?.success) {
      console.log(res.data,"categories")
      setCategories(res?.data)
    }
   return

  } catch (error) {
    console.error(error)
    toastError(error)
  }
}

  return (
    <>
      <View style={[styles.bgbodycolor, styles.flexbodycolorone, styles.prletive]}>
        <Image source={require('../../assets/img/login-bg-img.png')} style={styles.imglogcentr} />

        <View style={styles.logoabsl}>
          <Image source={require('../../assets/img/logo.png')} style={[styles.logocenter, { width: widthPercentageToDP(40), height: 50 }]} resizeMode="contain" />
        </View>
        <View style={[styles.categorybox, styles.otpsection]}>

        <FlatList
                      
                        contentContainerStyle={{}}
                        data={categories}
                        vertical
                        renderItem={mainCategory}
                        keyExtractor={(item, index) => `${index}`}
                    />
          {/* <Pressable onPress={() => navigate.navigate('BottomTabNav')}>

            <Image source={require('../../assets/img/category1.png')} style={[styles.mttop10, styles1.imgsmalwitd]} />
          </Pressable>
          <Pressable onPress={() => navigate.navigate('BottomTabNav', { screen: "StationeryHome" })}>
            <Image source={require('../../assets/img/category2.png')} style={[styles.mttop10, styles1.imgsmalwitd]} />
          </Pressable> */}
          {/* {
            categories && categories.map((category,index) => 
              // <Pressable onPress={() => (index ==0) ? navigate.navigate('BottomTabNav',{screen: "Home",category:category}): navigate.navigate('BottomTabNav', { screen: "StationeryHome" })} key={index}>
         
            
          } */}
        </View>


        {/* <Image source={require('../../assets/img/footerimg.png')} style={styles.ftrimgabslot} /> */}
      </View>
    </>
  )
}
const styles1 = StyleSheet.create({
  imgsmalwitd: {
    width: wp(70),
    height: hp(35)
  }

})