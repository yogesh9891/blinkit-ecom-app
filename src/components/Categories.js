import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../ReusableComponents/Header';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getStoreId } from '../utils/store';
import { getCategoryFromLocal } from '../utils/localStorage';
import { toastError } from '../utils/toastError';
import { getChildCategoryByParentIdApi, getParentCategoriesApi } from '../services/category.service';
import { generateFilePath } from '../utils/file';
export default function Categories(props) {
    const navigation = useNavigation()
    const [categoryArr, setCategoryArr] = useState("");
    const [subCategoryArr, setSubCategoryArr] = useState([]);
    const [OfferArr, setOfferArr] = useState([]);
    const [SalesArr, setSalesArr] = useState([]);
    const [BrandArr, setBrandArr] = useState([]);
    const [trendingProductArr, settrendingProductArr] = useState([]);
    const [subMainCategoryArr, setMainSubCategoryArr] = useState([]);
    const [subRestCategoryArr, setRestSubCategoryArr] = useState([]);
    const [storeId, setStoreid] = useState("6391c3645ec66f432b165ff8");

    useEffect(() => {
        getCategory()
        // getStoreLocalId();
    }, [])


    const getStoreLocalId = async () => {
        let localStoreid = await getStoreId();
        if (localStoreid) {
            setStoreid(localStoreid);
        } 
        else {
            alert("No Store Found");
            // navigation.navigate("Addressmap")
        }
    }

    const getCategory = async () => {
    
       try {
        let {data:res} = await getParentCategoriesApi()
        if(res.data){
            setCategoryArr(res.data)
        }
       } catch (error) {
            toastError(error)
       }
    }

    // useEffect(() => {

    //     if (category) {
    //         let parentCategoryId = category._id;
    //         getChildCategories(parentCategoryId)
    //     }
    // }, [category])

    useEffect(() => {

        if (subCategoryArr) {
            let cate = subCategoryArr.filter(el => el.position != '0');
            let restCate = subCategoryArr.filter(el => el.position == '0');
            setMainSubCategoryArr(cate);
            setRestSubCategoryArr(restCate);
        }
    }, [subCategoryArr])


    const getChildCategories = async (id) => {

        try {
            let { data: res } = await getChildCategoryByParentIdApi(id);
            if (res && res?.success) {
                setSubCategoryArr(res.data)
            }
            return

        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }
    const categoryAccToPositions = ({ item, index }) => {
        console.log(item.name, "item", item.position)
        return (
            <View>
                {(item?.position == '1') ?
                    (<Pressable onPress={() => navigation.navigate("SubCategories", { subcategory: item })} style={styles.mttop10}><Image style={{ width: wp(92), height: hp(15) }} source={{ uri: generateFilePath(item.categoryImage) }} /></Pressable>)
                    :
                    <View style={{ display: "flex", flexDirection: "row" }}>

                        {(item.position == '2') && <Pressable onPress={() => navigation.navigate("SubCategories", { subcategory: item })}><Image style={{ width: wp(40), height: hp(19) }} source={{ uri: generateFilePath(item.categoryImage) }} /></Pressable>}
                        {(item.position == '3') && <Pressable onPress={() => navigation.navigate("SubCategories", { subcategory: item })}><Image style={{ width: wp(40), height: hp(19) }} source={{ uri: generateFilePath(item.categoryImage) }} /></Pressable>}

                    </View>
                }
            </View>
        );
    };

    const restSubCategoryCategory = ({ item, index }) => {
        return (
            <Pressable onPress={() => navigation.navigate("SubCategories", { subcategory: item })} style={[styles.prductcategory, styles1.prductcategory]}>
                <Image source={{ uri: generateFilePath(item.categoryImage) }} style={styles1.catryimgabs} resizeMode='contain' />
                <Text style={styles.namecategry}>{item.name}</Text>
            </Pressable>
        );
    };

    return (
        <>
            <ScrollView style={styles.bgcolorwhite}>
                <Header addressLine={true} searchBar={true} rootProps={props} />


                <View style={styles.pdlr}>
                    <Text style={[styles.hdingmain, styles.mbbotom10, styles.mttop10]}>Categories</Text>
                    {/* <Image source={require('../../assets/img/slider-img2.png')} /> */}
                    <View style={[styles.rowflex1, styles.mttop10]}>
                        <FlatList data={subMainCategoryArr} renderItem={categoryAccToPositions} keyExtractor={(item, index) => `${index}`} />
                    </View>
                    {/* <Pressable onPress={() => navigation.navigate("SubCategories")}>
                    <Image style={{ width: wp(92), height:hp(15) }} source={require('../../assets/img/headerbanner.png')} />
                    </Pressable> */}
                    {/* <View style={[styles.categorybx, styles.rowflex1, styles.mttop10]}>
                    <View >
                        <View style={[styles.categrycard, styles.mr2]}>
                            <View style={styles.categrycardbgclr}>
                                <Image source={require('../../assets/img/fruits.png')}  style={styles.imgbotmfix}/>
                            </View>
                            <Text>Fruits</Text>
                        </View>
                    </View>
                    <View>
                    <View style={[styles.categrycard,]}>
                            <View style={styles.categrycardbgclr}>
                                <Image source={require('../../assets/img/vegetables.png')}  style={styles.imgbotmfix}/>
                            </View>
                            <Text>Fruits</Text>
                        </View>
                    </View>
                </View> */}

                        <View style={[styles.rowflex1, styles.mttop20]}>
                        <FlatList data={categoryArr} numColumns={3} columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={restSubCategoryCategory} keyExtractor={(item, index) => `${index}`} />

                        {/* <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                            <Image source={require('../../assets/img/chips1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Munchies</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                            <Image source={require('../../assets/img/Sweet1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Sweet Cravings</Text>
                        </Pressable>

                        <View style={styles.prductcategory}>
                            <Image source={require('../../assets/img/biscuits1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Biscuits</Text>
                        </View> */}
                    </View>
                    {/* <View style={[styles.rowflex1, styles.mttop10]}>
                        <Pressable onPress={() => navigation.navigate("SubCategories")}>
                            <Image style={{ width: wp(45), height:hp(19) }} source={require('../../assets/img/fruits1.png')} />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("SubCategories")}>
                        <Image style={{ width: wp(45), height:hp(19) }} source={require('../../assets/img/vegetables1.png')} />
                        </Pressable>
                    </View>

                    <View style={[styles.rowflex1, styles.mttop20]}>
                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                        <Image source={require('../../assets/img/dairy-fread1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Dairy, Bread & Eggs</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                        <Image source={require('../../assets/img/drink1.png')} style={styles1.catryimgabs}   resizeMode='contain' />
                            <Text style={styles.namecategry}>Cold Drinks & Juices</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                        <Image source={require('../../assets/img/tea21.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Tea, Coffee & More</Text>
                        </Pressable>

                    </View>

                    <View style={[styles.rowflex1, styles.mttop20]}>
                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                            <Image source={require('../../assets/img/chips1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Munchies</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                            <Image source={require('../../assets/img/Sweet1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Sweet Cravings</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                            <Image source={require('../../assets/img/biscuits1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Biscuits</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.rowflex1, styles.mttop20, styles.mbbotom15]}>
                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                            <Image source={require('../../assets/img/homeneeds1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Home Needs</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                            <Image source={require('../../assets/img/Health1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Health & Baby Care</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("SubCategories")} style={styles.prductcategory}>
                            <Image source={require('../../assets/img/bathbody1.png')} style={styles1.catryimgabs} resizeMode='contain' />
                            <Text style={styles.namecategry}>Bath & Body</Text>
                        </Pressable>
                    </View>
 */}

                </View>
            </ScrollView >
        </>
    )
}
const styles1 = StyleSheet.create({
    catryimgabs:{
        position: 'relative',
        top: -20,
        textAlign: 'center',
        alignSelf: 'center',
        width:wp(24),
        height:hp(9), 
    },
    rowflex1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})