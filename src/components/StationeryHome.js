import { FlatList, Image, ImageBackground, TouchableOpacity, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import { toastError } from '../utils/toastError';
import { getNestedCategoriesApi } from '../services/category.service';
import { generateFilePath } from '../utils/file';
export default function StationeryHome(props) {
    const navigation = useNavigation()

const [servce, setServce] = useState("");
const [categoryArr, setCategoryArr] = useState([]);

    useEffect(() => {
        if (props.route.params.service) {
            setServce(props.route.params.service);
        }
      }, [props.route.params.service])


      useEffect(() => {
        if (servce) {

            getServiceCategoryis(`service=${servce?._id}`)
        }
      }, [servce])


      const getServiceCategoryis = async (query) => {
        try {
            let {data:res} = await getNestedCategoriesApi(query);
            if(res.data){
                setCategoryArr(res.data);
            }   
        } catch (error) {
            toastError(error)
        }
      }



    //   -------------------------------------------------------- frouts


    // -----------------------------------------------------------------------------

    //   ------------------------------------------------------------------
    // const trandingproduct = ({ item, index }) => {
    //     console.log(item, 'item');
    //     return (
    //         <View style={styles1.inrtrandingbox}>
    //             <View style={{
    //                 width: wp(20),  backgroundColor: '#F2F2F2', height:70, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    //                 alignSelf: 'center',
    //             }}>
    //                 <Image source={item.imageSource1} resizeMode='contain' style={styles1.imgresponsive} />
    //             </View>
    //             <View style={styles1.rightproctname}>
    //                 <Text style={styles1.prodname}>{item.prductname}</Text>
    //                 <Text style={[styles1.contenti, styles1.mttp2]}>{item.contity}</Text>
    //                 <Text style={styles1.cutpric}>{item.prductcutprice}</Text>
    //                 <View style={styles.rowflex1}>
    //                     <Text style={styles1.finalpric}>{item.fainalprice}</Text>
    //                     <AntDesign name={'plus'} size={20} color={'#EB8E24'} />
    //                 </View>
    //             </View>
    //             <View style={{ position: 'absolute', top: 0, right: 0 }}>
    //                 <Image style={{width:wp(7), height:hp(3)}} source={item.freeimg} />
    //             </View>
    //         </View>
    //     );
    // };




    const _renderItem = ({ item, index }) => {
        return (
            <Image
                source={item.file}
                style={{ height: hp(25), width: wp(95), textAlign: 'center', alignSelf: 'center', borderRadius: 10 }}
            />
        );
    }

    const restSubCategoryCategory = ({item, index}) => {
        return (
                   <Pressable onPress={() => navigation.navigate('SubCategories', {subcategory: item})} style={[styles1.boxstatery,styles.mttop20]}>
                            <Image source={{uri: generateFilePath(item?.categoryImage)}}style={styles1.imgtopitem}  resizeMode='contain' />
                            <Text style={styles1.itemname}>{item?.name}</Text>
                        </Pressable>
        );
      };


    return (
        <>
            <Header addressLine={true} searchBar={true} rootProps={props} />

            <ScrollView style={styles1.bgcolor}>
            <View style={[styles.img15, { width: wp(100) }]}>
                    <Image style={{ width: wp(100), height:hp(8) }} source={require('../../assets/img/headerimg.png')} />
                </View>

                <View style={styles.pdlr}>
                    <View style={[styles.rowflex1, styles.mttop10]}>
                        <Text style={[styles.fontw6, styles.colorblck]}>Trending Near You</Text>
                        <View style={styles.rowflex}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#EB8E24' }}>See more</Text>
                            <Entypo name={'chevron-right'} size={20} color={'#EB8E24'} />
                        </View>
                    </View>

                    {/* <View style={styles1.boxtrandign}>

                        <FlatList
                            style={styles.mttop10}
                            contentContainerStyle={{}}
                            data={productArr}
                            horizontal
                            renderItem={trandingproduct}
                            keyExtractor={(item, index) => `${index}`} />
                    </View> */}

                    <View style={styles1.categorybox}>
                        <Text style={styles1.headinstaionery}>Categories</Text>
                    </View>

                </View>

                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
                    <Carousel
                        data={[
                            {
                                file: require('../../assets/img/stationerysliderimg1.png')
                            },
                            // {
                            //     file: require('../../assets/img/stationerysliderimg1.png')
                            // },
                            // {
                            //     file: require('../../assets/img/stationerysliderimg1.png')
                            // },
                            // {
                            //     file: require('../../assets/img/stationerysliderimg1.png')
                            // },
                            // {
                            //     file: require('../../assets/img/stationerysliderimg1.png')
                            // },

                        ]}
                        // activeSlideAlignment={'center'}
                        autoplay={true}
                        layout={'stack'}
                        layoutCardOffset={`18`}
                        autoplayDelay={300}
                        autoplayInterval={5000}
                        renderItem={_renderItem}
                        sliderWidth={wp(90)}
                        // sliderHeight={hp(20)}
                        itemWidth={wp(90)}
                    // itemHeight={wp(25)}
                    />
                </View>

                <View style={[styles.mttop20]}>
                  <FlatList data={categoryArr} numColumns={3} columnWrapperStyle={{justifyContent: 'space-between'}} renderItem={restSubCategoryCategory} keyExtractor={(item, index) => `${index}`} />
                </View>
               
            </ScrollView>
        </>
    )
}


const styles1 = StyleSheet.create({
    searheader: {
        padding: 15,
        backgroundColor: '#3740AA',
    },
    searinput: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    srchinput: {
        width: wp(80)
    },
    imageSource1: {
        textAlign: 'center',
        alignSelf: 'center',
    },
    inrtrandingbox: {
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        position: 'relative',
        width: wp(55),
        marginBottom: 5,
        marginRight: 10,
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    prodname: {
        fontSize: 11,
        fontWeight: '600',
        color: '#000',
    },
    contenti: {
        fontSize: 10,
        color: '#B3B3B3',
    },
    mttp2: {
        marginTop: 5
    },
    rightproctname: {
        marginLeft: 14,
        width: wp(25),
    },
    cutpric: {
        textDecorationLine: 'line-through',
        fontSize: 10,
        color: '#B3B3B3',
    },
    finalpric: {
        fontSize: 11,
        color: '#000',
        fontWeight: '600',
    },
    bgcolor: {
        backgroundColor: '#fff',
    },
    headinstaionery: {
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 8,
        color: '#000',

    },
    stationeryitem: {
        backgroundColor: '#F6F0FF',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    boxstatery: {
        backgroundColor: '#DDE3F3',
        minHeight: 75,
        position: 'relative',
        borderRadius: 10,
        width: wp(30),

    },
    itemname: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#000',
        fontSize: 11,
        fontWeight: '600',

    },
    imgtopitem: {
        position: 'absolute',
        top: -30,
        textAlign: 'center',
        alignSelf: 'center',
        width:wp(18), 
        height:hp(9), 
    },
    stationeryitemrow: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    brandrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    brandbox: {
        backgroundColor: '#EDDEF2',
        minHeight: 150,
        position: 'relative',
        width: wp(30),
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    logosrl: {
        position: 'absolute',
        top: -40,
        textAlign: 'center',
        zIndex: 2
    },
    bgboximg: {

        position: 'absolute',
        top: 10,
        width:wp(28),   
        height:hp(12),
    },
    ofrtext: {
        position: 'relative',
        marginTop: -25,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
        fontWeight: '600',
        fontSize: 12,
        color: '#000'
    },
    brandprodt: {
        position: 'absolute',
        bottom: 5
    },
    boxwips: {
        backgroundColor: '#D4EBEE',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 15,
        padding: 5,
        minHeight: 180,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        width: wp(30),
    },
    font11: {
        fontSize: 10,
    },
    wipesbox: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textwipes: {
        fontSize: 9,
        color: '#000',
        fontWeight: '500',
    },
    imgcenter: {
        textAlign: 'center',
        alignSelf: 'center',

    },
    btnfontwipes: {
        fontSize: 13,
        textAlign: 'center',
        color: '#fff',
        padding: 6,
    },
    wipesbtn: {
        borderRadius: 5,
    },
    margintiobotm: {
        marginVertical: 10,
    },

    laundrybox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        padding: 5,
        minHeight: 150,
        width: wp(30),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    cutprice: {
        textDecorationLine: 'line-through',
        color: '#868686',
        fontSize: 10,
        marginTop: 8,
    },

    kitchenbox: {
        backgroundColor: '#F8EAF6',
        padding: 5,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
        minHeight: 160,
        width: wp(30),
        borderBottomEndRadius: 8,
        borderBottomLeftRadius: 8,
    },
    notebookbox: {
        backgroundColor: '#DED4EE',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 15,
        padding: 5,
        minHeight: 180,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        width: wp(30),
    },
    colorusitemrow: {

        backgroundColor: '#D1DFEB',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 15,
        padding: 5,
        minHeight: 180,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        width: wp(30),
    },
    slide: {
        marginVertical: 30,

    },
    imgresponsive:{
        width:wp(15), 
        height:hp(8),  
        textAlign: 'center',
         alignSelf: 'center',
    },
    responsivelogo:{
        width:wp(20), 
        height:hp(10),
       
        textAlign: 'center',
         alignSelf: 'center',
    },
    responsivproduct:{
        width:wp(25), 
        height:hp(8),
       
        textAlign: 'center',
         alignSelf: 'center',
    },
    napkisnprot:{
        width:wp(40), 
        height:hp(12),
       
        textAlign: 'center',
         alignSelf: 'center',
    }

})