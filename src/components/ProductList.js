import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, Image, Pressable, ImageBackground } from 'react-native'
import React, { useState,useEffect } from 'react'
import ExternalStyles from '../stylecomponents/Style'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../ReusableComponents/Header';
import { getChildCategoryByParentIdApi } from '../services/category.service';
import { toastError } from '../utils/toastError';
import { getAllProductByUser, getAllProducts } from '../services/product.service';
import { generateFilePath } from '../utils/file';
import { getStoreId } from '../utils/store';
export default function ProductList(props) {

    // console.log(props.route.params,"props.route.params")
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [productArr, setProductArr] = useState([]);
    const [storeId, setStoreid] = useState();
    
    useEffect(() => {

    if (props.route.params?.productArr && props.route.params.productArr?.length > 0) {

        console.log(JSON.stringify(props.route.params?.productArr, null, 2),"prprprprprprpr+++++++++===========------"),
        setProductArr(props.route.params.productArr)
    }
  }, [props.route.params.productArr])
 
    const renderProducts = ({ item, index }) => {

        return (
            <Pressable onPress={() => navigation.navigate("ProductDetails",{productStockId:item?.productStockId,category:category?category:search})} style={styles.productItemContainer}>
                <ImageBackground source={require("../../assets/img/productBg.png")} style={{ height: 100, width: "90%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} resizeMode="contain">
                    <Image source={{uri:generateFilePath(item.productObj?.mainImage)}} resizeMode="contain" style={{ marginTop: -30, marginLeft: -10, height: 70, width: 70 }} />
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
            <Header stackHeaderAtTop={true} screenName={search} searchBar={true} rootProps={props} />

            <View style={styles.flexRowInternal}>
                {/* {
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
                } */}
            
            <View style={styles.mainContentContainer}>
                    {
                        productArr && productArr.length > 0 ? (

                            <FlatList
                        
                            data={productArr}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={renderProducts}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
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