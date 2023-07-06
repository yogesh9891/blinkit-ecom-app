import {FlatList, Image, ImageBackground, TouchableOpacity, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import styles from '../stylecomponents/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import {getChildCategoryByParentIdApi, getNestedCategoriesApi, getParentCategoriesApi, getServiceApi} from '../services/category.service';
import {toastError} from '../utils/toastError';
import {generateFilePath} from '../utils/file';
import {getBrandApi, getHomeApi, getHomePageApi, getOffersApi, getSalessApi} from '../services/home.service';
import {getAllProductByUser} from '../services/product.service';
import {getStoreId, storeStore, storeStoreId,storeStoreData} from '../utils/store';
import { StoreContext } from '../../App';

export default function Home(props) {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [category, setCategory] = useState('');
  const [subCategoryArr, setSubCategoryArr] = useState([]);
  const [OfferArr, setOfferArr] = useState([]);
  const [SalesArr, setSalesArr] = useState([]);
  const [BrandArr, setBrandArr] = useState([]);
  const [trendingProductArr, settrendingProductArr] = useState([]);
  const [subMainCategoryArr, setMainSubCategoryArr] = useState([]);
  const [subRestCategoryArr, setRestSubCategoryArr] = useState([]);
  const [storeId, setStoreid] = useState('');
  const [hompePage, setHompePage] = useState('');
  const [cateoryArr, setCateoryArr] = useState([]);
  const [firstcategory, setFirstcategory] = useState('');
  const [secondcategory, setSecondcategory] = useState('');
  const [thirdcategory, setThirdcategory] = useState('');
  const [restParentCategory, setRestParentCategory] = useState([]);
  const [beatOfSeasonArr, setBeatOfSeasonArr] = useState([]);
  const [otherSeasonArr, setOtherSeasonArr] = useState([]);
  const [otherTrenArr, setTrenSeasonArr] = useState([]);
  const [storeIdContext, setstoreIdContext] = useContext(StoreContext);

  
const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    getOffers();
    getSales();
    getBrands();

  }, []);
  useEffect(() => {
    if (storeIdContext && focused) {
      console.log(storeIdContext, 'getHomePagegetHomePage');
      getHomePage(storeIdContext);
    }
  }, [storeIdContext,focused]);
  useEffect(() => {
    if (hompePage && focused) {
      if (hompePage?.categoryArr) {
        setCateoryArr(hompePage?.categoryArr);
      }
      if (hompePage?.trendingProduct) {
        console.log(JSON.stringify(hompePage?.trendingProduct, null, 2), '-------------------------------------------------------------------');
        settrendingProductArr(hompePage?.trendingProduct);
      }
      if (hompePage?.seasonProduct) {
        setBeatOfSeasonArr(hompePage?.seasonProduct);
      }
      if (hompePage?.otherProdcuts) {
        setOtherSeasonArr(hompePage?.otherProdcuts);
      }
    }
  }, [hompePage, focused]);


  



  const getHomePage = async (storeIe) => {
    try {
      console.log("res.dataresres.dataresAPIIIAIPPAA")
      let {data: res} = await getHomeApi(storeIe);
      if (res.data) {
        console.log(res.data,"res.datares.datares.datares.data")
        setHompePage(res.data);
      } 
    } catch (error) {
      toastError(error);
    }
  };
  useEffect(() => {
    if(focused){
      getLocalStoreId()
    }
  }, [focused]);

  useEffect(() => {
    if (cateoryArr) {
      let first = cateoryArr.find(el => el.position == '1');
      let second = cateoryArr.find(el => el.position == '2');
      let third = cateoryArr.find(el => el.position == '3');
      let restcategory = cateoryArr.filter(el => el.position > '3');
      if (first) {
        setFirstcategory(first);
      }
      if (second) {
        setSecondcategory(second);
      }
      if (third) {
        setThirdcategory(third);
      }

      setRestParentCategory(restcategory);
      // setMaincateoryArr(cate);
      // setRestSubCategoryArr(restCate);
    }
  }, [cateoryArr]);

  const handleGetTrendingProduct = async () => {

    try {
      let {data: res} = await getHomeApi(storeId,'isTrending=true');
      if (res.data && res.data) {
        let hompePage = res.data;
        if (hompePage?.trendingProduct) {
          setProductArr(hompePage?.trendingProduct);
    navigation.navigate("ProductList",{productArr:hompePage?.trendingProduct})

        } else {
          setProductArr([])
    navigation.navigate("ProductList",{productArr:[]})

        }
      }
    } catch (error) {
      toastError(error);
    } 

  }


  const getLocalStoreId = async id => {
    try {
      let storeId = await getStoreId()
      console.log(storeId,"storeIdstoreIdstoreId")
      if (storeId) {
        setstoreIdContext(storeId)
        setStoreid(storeId)
      }
      return;
    } catch (error) {
      toastError(error);
    }
  };

  const getOffers = async () => {
    try {
      let {data: res} = await getOffersApi();
      if (res && res?.success) {
        setOfferArr(res.data);
      }
      return;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };


  const getSales = async () => {
    try {
      let {data: res} = await getSalessApi();
      if (res && res?.success) {
        setSalesArr(res.data);
      }
      return;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  const getBrands = async () => {
    try {
      let {data: res} = await getBrandApi();
      if (res && res?.success) {
        setBrandArr(res.data);
      }
      return;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  // -----------------------------------------------------------------------------

  const [producbannerslideArr, setproducbannerslideArr] = useState([
    {
      imageSource1: require('../../assets/img/frame1.png'),
    },

    {
      imageSource1: require('../../assets/img/frame2.png'),
    },
    {
      imageSource1: require('../../assets/img/frame3.png'),
    },
    {
      imageSource1: require('../../assets/img/frame4.png'),
    },
  ]);

  const tophomeslide = ({item, index}) => {
    return (
      <View style={styles1.datesubcirption}>
        <Image source={{uri: generateFilePath(item.imageUrl)}} style={styles1.sliderheight} />
      </View>
    );
  };

  //   ------------------------------------------------------------------
  const trandingproduct = ({item, index}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ProductDetails', {
            productStockId: item._id,
            category: null,
          })
        }
        style={styles1.inrtrandingbox}>
        <View
          style={{
            width: wp(20),
            backgroundColor: '#F2F2F2',
            paddingVertical: 7,
            borderRadius: 5,
          }}>
          <Image
            style={{
              width: wp(15),
              height: hp(8),
              textAlign: 'center',
              alignSelf: 'center',
            }}
            source={{uri: generateFilePath(item?.productObj?.mainImage)}}
          />
        </View>
        <View style={styles1.rightproctname}>
          <Text style={styles1.prodname}>{item.name}</Text>
          <Text style={[styles1.contenti, styles1.mttp2]}>{item.contity}</Text>
          {/* <Text style={styles1.cutpric}>{item.prductcutprice}</Text> */}
          <View style={styles.rowflex1}>
            <Text style={styles1.finalpric}>{item.sellingPrice}</Text>
            <AntDesign name={'plus'} size={20} color={'#EB8E24'} />
          </View>
        </View>
        {/* <View style={{ position: 'absolute', top: 0, right: 3 }}>
                    <Image style={{ width: wp(7), height: hp(3) }} source={item.freeimg} />
                </View> */}
      </Pressable>
    );
  };



  const restSubCategoryCategory = ({item, index}) => {
    return (
      <Pressable onPress={() => navigation.navigate('SubCategories', {subcategory: item.category})} style={[styles.prductcategory, styles1.prductcategory]}>
        <Image source={{uri: generateFilePath(item?.category?.categoryImage)}} style={styles1.catryimgabs} resizeMode="contain" />
        <Text style={styles.namecategry}>{item?.category?.name}</Text>
      </Pressable>
    );
  };

  const renderBrands = ({item, index}) => {
    return (
      <View style={styles1.brandbox}>
        <Image source={{uri: generateFilePath(item.logoUrl)}} style={[styles1.logosrl, styles1.responsivelogo]} resizeMode="contain" />
        <Image source={require('../../assets/img/bgboximg01.png')} style={styles1.bgboximg} />
        <Text style={styles1.ofrtext}>{item.offerText}</Text>
        <Image source={{uri: generateFilePath(item.imageUrl)}} style={[styles1.brandprodt, styles1.responsivproduct]} resizeMode="contain" />
      </View>
    );
  };

  //   ------------------------------------------------------------------

  const trandinfruits = ({item, index}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ProductDetails', {
            productStockId: item._id,
            category: null,
          })
        }
        style={styles1.inrtrandingbox}>
        <View
          style={{
            width: wp(20),
            backgroundColor: '#F2F2F2',
            borderRadius: 5,
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={{uri: generateFilePath(item?.productObj?.mainImage)}} resizeMode="contain" style={styles1.imgresponsive} />
        </View>
        <View style={styles1.rightproctname}>
          <Text style={styles1.prodname}>{item.name}</Text>
          <Text style={[styles1.contenti, styles1.mttp2]}>{item.contity}</Text>
          {/* <Text style={styles1.cutpric}>{item.prductcutprice}</Text> */}
          <View style={styles.rowflex1}>
            <Text style={styles1.finalpric}>{item.sellingPrice}</Text>
            <AntDesign name={'plus'} size={20} color={'#EB8E24'} />
          </View>
        </View>
        <View style={{position: 'absolute', top: 0, right: 0}}>
          <Image style={{width: wp(7), height: hp(3)}} source={item.freeimg} />
        </View>
      </Pressable>
    );
  };

  //   ----------------------------------------------------------------



  //   -----------------------------------------------------------------


  //   ---------------------------------------------------------

  const producbannerslide = ({item, index}) => {
    return (
      <View style={{  marginBottom:10}}>
        <Image
          style={{
            width: wp(80),
            height: hp(18),
            marginRight: 5,
          
            borderRadius: 5,
          }}
          source={{uri: generateFilePath(item.imageUrl)}}
        />
      </View>
    );
  };

  const saleBanenerSlide = ({item, index}) => {
    return (
      <View style={styles.mttop5}>
        <Image source={{uri: generateFilePath(item.imageUrl)}} style={{width: wp(92), height: hp(18)}} resizeMode="contain" />
      </View>
    );
  };
  // -------------------------------------------------------------------------

  const snacks = ({item, index}) => {
    return (
      <View style={styles1.inrtrandingbox}>
        <View
          style={{
            width: wp(20),
            backgroundColor: '#F2F2F2',
            borderRadius: 5,
            borderRadius: 5,
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
           <Image source={{uri: generateFilePath(item?.productObj?.mainImage)}} resizeMode="contain" style={styles1.imgresponsive} />
        </View>
        <View style={styles1.rightproctname}>
          <Text style={styles1.prodname}>{item.name}</Text>
          <Text style={[styles1.contenti, styles1.mttp2]}>{item.contity}</Text>
          {/* <Text style={styles1.cutpric}>{item.prductcutprice}</Text> */}
          <View style={styles.rowflex1}>
            <Text style={styles1.finalpric}>{item.sellingPrice}</Text>
            <AntDesign name={'plus'} size={20} color={'#EB8E24'} />
          </View>
        </View>
        <View style={{position: 'absolute', top: 0, right: 0}}>
          <Image source={item.freeimg} />
        </View>
      </View>
    );
  };

  return (
    <>
      <Header addressLine={true} searchBar={true} rootProps={props} />

      {hompePage && hompePage?._id ? (
        // <ScrollView >

        // <View  style={[styles1.brands, styles.mttop20, styles.pdlr]}>
        //   <View style={styles1.brandrow}>
        <FlatList
          // style={{paddingTop:90}}
          contentContainerStyle={styles1.bgcolor}
          ListHeaderComponent={
            <>
              <View style={[styles.img15, {width: wp(100)}]}>
                <Image style={{width: wp(100), height: hp(8)}} source={require('../../assets/img/headerimg.png')} />
              </View>

              <View style={styles1.topslid}>
                <FlatList style={styles.mttop10} contentContainerStyle={{}} data={OfferArr} horizontal renderItem={tophomeslide} keyExtractor={(item, index) => `${index}`} />
              </View>
              <View style={styles.pdlr}>
                <View style={[styles.rowflex1, styles.mttop10]}>
                  <Text style={[styles.fontw6, styles.colorblck]}>Trending Near You</Text>
                  <Pressable onPress={() => handleGetTrendingProduct()} style={styles.rowflex}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#EB8E24',
                      }}>
                      See more
                    </Text>
                    <Entypo name={'chevron-right'} size={20} color={'#EB8E24'} />
                  </Pressable>
                </View>

                <View style={styles1.boxtrandign}>
                  <FlatList style={styles.mttop10} contentContainerStyle={{}} data={trendingProductArr} horizontal renderItem={trandingproduct} keyExtractor={(item, index) => `${index}`} />
                </View>

                <View>
                  {firstcategory && firstcategory?._id && (
                    <Pressable
                      onPress={() =>
                        navigation.navigate('SubCategories', {
                          subcategory: firstcategory?.category,
                        })
                      }
                      style={styles.mttop10}>
                      <Image
                        style={{width: wp(92), height: hp(25)}} resizeMode="contain"
                        source={{
                          uri: generateFilePath(firstcategory?.category?.categoryImage),
                        }}
                      />
                    </Pressable>
                  )}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: wp(90),
                      marginTop: 20,
                    }}>
                    {secondcategory && secondcategory?._id && (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('SubCategories', {
                            subcategory: secondcategory.category,
                          })
                        }
                        style={{
                          width: wp(45),
                          height: hp(19),
                        }}>
                        <Image
                          style={{width: '100%', height: '100%'}}
                          resizeMode="contain"
                          source={{
                            uri: generateFilePath(secondcategory?.category?.categoryImage),
                          }}
                        />
                      </Pressable>
                    )}
                    {thirdcategory && thirdcategory?._id && (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('SubCategories', {
                            subcategory: thirdcategory.category,
                          })
                        }
                        style={{
                          width: wp(45),
                          height: hp(19),
                        }}>
                        <Image
                          style={{width: '100%', height: '100%'}}
                          source={{
                            uri: generateFilePath(thirdcategory?.category?.categoryImage),
                          }}
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
                <View style={[styles.mttop20]}>
                  <FlatList data={restParentCategory} numColumns={3} columnWrapperStyle={{justifyContent: 'space-between'}} renderItem={restSubCategoryCategory} keyExtractor={(item, index) => `${index}`} />
                </View>

                <Text style={[styles.fontw6, styles.colorblck, styles.mbbotom10, styles.pdlr]}>Super Sale</Text>
                <FlatList style={styles.mttop5} contentContainerStyle={{}} data={SalesArr} renderItem={saleBanenerSlide} keyExtractor={(item, index) => `${index}`} />
              </View>
              {}
              <View style={styles1.seasonbg}>
                <View style={{paddingHorizontal: 15}}>
                  <Text
                    style={{
                      fontSize: 17,
                      marginTop: 15,
                      fontWeight: '600',
                      color: '#000',
                    }}>
                    Best For The Season
                  </Text>
                  {beatOfSeasonArr &&
                    beatOfSeasonArr?.length > 0 &&
                    beatOfSeasonArr.map((besat, inde) => (
                      <View key={inde}>
                        <View style={[styles.rowflex1, styles.mttop5]}>
                          <Text style={[styles.fontw6, styles.colorblck]}>{besat?.name}</Text>
                          <View style={styles.rowflex}>
                            <Pressable
                              onPress={() =>
                                navigation.navigate('SubCategories', {
                                  subcategory: besat,
                                })
                              }>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: '600',
                                  color: '#EB8E24',
                                }}>
                                {' '}
                                See more{' '}
                              </Text>
                            </Pressable>
                            <Entypo name={'chevron-right'} size={20} color={'#EB8E24'} />
                          </View>
                        </View>
                        <FlatList style={styles.mttop10} contentContainerStyle={{}} data={besat?.prodcutArr} horizontal renderItem={trandinfruits} keyExtractor={(item, index) => `${index}`} />
                      </View>
                    ))}
                </View>
              </View>
              {otherSeasonArr &&
                otherSeasonArr?.length > 0 &&
                otherSeasonArr.map((other, inrde) => (
                  <View key={inrde}>
                    <View style={[styles.rowflex1, styles.mttop10, styles.pdlr]}>
                      <Text style={[styles.fontw6, styles.colorblck]}>{other?.name}</Text>
                      <View style={styles.rowflex}>
                        <Pressable
                          onPress={() =>
                            navigation.navigate('SubCategories', {
                              subcategory: other,
                            })
                          }>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '600',
                              color: '#EB8E24',
                            }}>
                            See more
                          </Text>
                        </Pressable>
                        <Entypo name={'chevron-right'} size={20} color={'#EB8E24'} />
                      </View>
                    </View>
                    <FlatList style={styles.mttop10} contentContainerStyle={{}} data={other?.prodcutArr} horizontal renderItem={snacks} keyExtractor={(item, index) => `${index}`} />
                  </View>
                ))}

              <View style={[styles.rowflex1, styles.pdlr, {paddingVertical: 50}]}>
                <Text style={[styles.fontw6, styles.colorblck]}>Brands In Focuse</Text>
                <View style={styles.rowflex}>
                  <Text style={{fontSize: 14, fontWeight: '600', color: '#EB8E24'}}>See more</Text>
                  <Entypo name={'chevron-right'} size={20} color={'#EB8E24'} />
                </View>
              </View>
            </>
          }
          data={BrandArr}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={renderBrands}
          ListFooterComponent={<FlatList style={styles.mttop10} contentContainerStyle={{}} data={producbannerslideArr} horizontal renderItem={producbannerslide} keyExtractor={(item, index) => `${index}`} />}
          keyExtractor={(item, index) => `${index}`}
        />
      ) : (
        //   </View>
        // </View>

        // </ScrollView>
        <Text style={styles1.btnfontwipes}>Add</Text>
      )}
    </>
  );
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
    width: wp(80),
  },
  topslid: {
    paddingHorizontal: 10,
  },
  sliderheight: {
    marginHorizontal: 5,
    textAlign: 'center',
    alignSelf: 'center',
    width: wp(35),
    height: hp(10),
  },
  proheight: {
    marginHorizontal: 5,
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
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

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
    marginTop: 5,
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
  seasonbg: {
    backgroundColor: '#FADCDC',
    paddingVertical: 20,
  },
  brandrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandbox: {
    backgroundColor: '#FFEED7',
    minHeight: 150,
    position: 'relative',
    width: wp(29),
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,
  },
  logosrl: {
    position: 'absolute',
    top: -40,
    textAlign: 'center',
    zIndex: 2,
  },
  bgboximg: {
    position: 'absolute',
    top: 10,
    width: wp(28),
    height: hp(12),
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
    color: '#000',
  },
  brandprodt: {
    position: 'absolute',
    bottom: 5,
  },
  boxwips: {
    backgroundColor: '#EAEEFF',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 15,
    padding: 5,
    minHeight: 150,
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
  margintiobotm5: {
    marginVertical: 5,
  },
  laundrybox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    minHeight: 150,
    width: wp(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
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
  catryimgabs: {
    position: 'relative',
    top: -20,
    textAlign: 'center',
    alignSelf: 'center',
    width: wp(24),
    height: hp(9),
  },
  imgresponsive: {
    width: wp(15),
    height: hp(8),
    textAlign: 'center',
    alignSelf: 'center',
  },
  responsivelogo: {
    width: wp(20),
    height: hp(10),

    textAlign: 'center',
    alignSelf: 'center',
  },
  responsivproduct: {
    width: wp(25),
    height: hp(8),

    textAlign: 'center',
    alignSelf: 'center',
  },
  napkisnprot: {
    width: wp(40),
    height: hp(12),

    textAlign: 'center',
    alignSelf: 'center',
  },
  prductcategory: {
    marginVertical: 10,
  },
});
