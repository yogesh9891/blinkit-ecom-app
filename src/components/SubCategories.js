import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, Image, Pressable, ImageBackground } from 'react-native'
import React, { useState,useEffect } from 'react'
import ExternalStyles from '../stylecomponents/Style'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../ReusableComponents/Header';
import { getChildCategoryByParentIdApi } from '../services/category.service';
import { toastError } from '../utils/toastError';
import { getAllProductByUser, getAllProducts } from '../services/product.service';
import { generateFilePath } from '../utils/file';
import { getStoreId } from '../utils/store';
export default function SubCategories(props) {

    // console.log(props.route.params,"props.route.params")
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [subCategoryArr, setSubCategoryArr] = useState([]);
    const [productArr, setProductArr] = useState([]);
    const [storeId, setStoreid] = useState("");
    const focused = useIsFocused();

    useEffect(() => {

    if (props.route.params.subcategory) {
        getStoreLocalId();
        setCategory(props.route.params.subcategory);
    } else {
        navigation.navigate("Home")
    }
  }, [focused])


  useEffect(() => {

    if (category && storeId) {
        let parentCategoryId = category._id;
        getChildCategories(parentCategoryId)
        handleGetproducts(parentCategoryId);
    }
  }, [category,storeId])


  const getStoreLocalId = async () => {
    let localStoreid = await getStoreId();
    if (localStoreid) {
        setStoreid(localStoreid);
    } 
 
}
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
const handleGetproducts = async (categoryid) => {
    
   let   query = `categoryId=${categoryid}&page=${page}&orderedToId=${storeId}`

    try {
      let { data: res } = await getAllProductByUser(query)
      console.log(res.data,"res.datares.datares.datares.datares.data")

      if (res.data.length) {

        setPage(previ => previ + 1)
        // let newProduct = [...productArr, ...res.data];
        // let prod = newProduct.filter(el)
        setProductArr([...productArr, ...res.data]);
      }
    }
    catch (err) {
      toastError(err)
      console.error(err)
    }
  }
 

    const [selectedCategory, setSelectedCategory] = useState({
        name: "Milk",
        image: require("../../assets/img/milk-white.png")
    });

    const renderCategories = ({ item, index }) => {
        return (
            <View style={styles.categoryItemContainer}>
                {
                    item.name == selectedCategory.name ?
                        <Pressable>
                            <LinearGradient style={styles.categoryCard} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} >
                                <Image source={{uri:generateFilePath(item.categoryImage)}} style={{height:hp(5), width:wp(10)}} resizeMode='contain' />
                            </LinearGradient>
                        </Pressable>
                        :
                        <Pressable onPress={() => setSelectedCategory(item)} style={styles.categoryCard}>
                            <Image source={{uri:generateFilePath(item.categoryImage)}} style={{height:hp(5), width:wp(10)}}  resizeMode='contain' />
                        </Pressable>
                }
                <Text style={styles.CategoryHeading}>{item.name}</Text>
            </View >
        )
    }

    const renderProducts = ({ item, index }) => {

        return (
            <Pressable onPress={() => navigation.navigate("ProductDetails",{productStockId:item?.productStockId,category:category})} style={styles.productItemContainer}>
                <ImageBackground source={require("../../assets/img/productBg.png")} style={{ height: 100, width: "90%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} resizeMode="contain">
                    <Image source={{uri:generateFilePath(item.productImageUrl)}} resizeMode="contain" style={{ marginTop: -30, marginLeft: -10, height: 70, width: 70 }} />
                </ImageBackground>
                <Text style={styles.CategoryHeading}>{item.name}</Text>
                <View style={[styles.flexRowInternal, { width: "100%", paddingHorizontal: 10, marginTop: 10 }]}>
                    <Text style={{ fontWeight: "500", color: "black", fontSize: 11, marginTop: -2 }}>₹{item?.price}</Text>
                    <Text style={{ fontWeight: "500", color: "black",  fontSize: 11, }}>{item.quantity}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate("ProductDetails")} style={styles.buttonStyle}>
                    <LinearGradient style={styles.linearGradientButton} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} >
                        {/* <Text style={styles.buttonText}>ADD</Text> */}
                    </LinearGradient>
                </Pressable>
            </Pressable>
        )
    }

    const navigation = useNavigation();
    return (
        <>
            <Header stackHeaderAtTop={true} screenName={category && category.name} searchBar={true} rootProps={props} />

            <View style={styles.flexRowInternal}>
                {
                    subCategoryArr && subCategoryArr.length > 0 && (
                        <View style={styles.sideBar}>
                        <FlatList
                            data={subCategoryArr}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={renderCategories}
                            scrollEnabled
                            style={{ maxHeight: hp(85), width: "100%" }}
                            contentContainerStyle={{ paddingVertical: 25 }}
                        />
                    </View>
                    )
                }
            
                <View style={styles.mainContentContainer}>
                    {
                        productArr && productArr.length > 0 ? (

                            <FlatList
                            ListHeaderComponent={
                                <>
                                {
                                    category.bannerImage && category.bannerImage != "" &&
                                    <Image style={[styles.bannerImage, { marginBottom: 20 }]} source={{uri:generateFilePath(category.bannerImage)}}  />
                                }
                                </>
                            }
                            data={productArr}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={renderProducts}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                            style={{ maxHeight: hp(84), width: "87%",marginTop:10}}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    ) : ( 
                    <View style={{height:hp(90), width:wp(100), display:'flex', alignItems:'center', justifyContent:'center', }}>
                        <Text style={{fontSize: 30, color:'#000', fontWeight:'600'}}>Product Not Found</Text>
                    </View>
                        )


                    }
         
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    flexRowInternal: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sideBar: {
        backgroundColor: "white",
        // minHeight: hp(90),
        borderTopRightRadius: 10,
        zIndex: 150,
        flex: 1,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    mainContentContainer: {
        flex: 3,
        display: "flex",
        alignItems: "center"
    },

    categoryItemContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    categoryCard: {
        backgroundColor: "#EDF0FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    CategoryHeading: { fontSize: 10, paddingTop: 10, fontWeight: "500", color: "black" },

    //////products side

    bannerImage: { height: 140, width: wp(65), marginTop: 15, borderRadius: 10 },

    productItemContainer: {
        minHeight: 200,
        borderRadius: 10,
        backgroundColor: "white",
        width: wp(28),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonStyle: { width: "90%", marginVertical: 10 },
    linearGradientButton: { paddingVertical: 6, paddingHorizontal:5, borderRadius: 10, display: "flex", alignItems: 'center', justifyContent: "center" },
    buttonText: { color: "white", fontWeight: "500", },
})