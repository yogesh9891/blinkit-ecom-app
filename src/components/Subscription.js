import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../ReusableComponents/Header';
import { getProductsForSubscriptionFromProductStockByStoreId } from '../services/product.service';
import { findNearStoreApi } from '../services/user.service';
import { getUserWalletApi } from '../services/wallet.service';
import ExternalStyles from '../stylecomponents/Style';
import { getAuth } from '../utils/auth';
import { generateFilePath } from '../utils/file';
import { getCoordinatesFromLocal } from '../utils/localStorage';
import { getStoreId, storeStore, storeStoreId } from '../utils/store';
import { toastError } from '../utils/toastError';
import { getNestedCategoriesApi, getParentCategoriesApi, getServiceApi } from '../services/category.service';
import { generalModelStatuses } from '../utils/constant';
export default function Subscription(props) {
  const [storeId, setStoreid] = useState('');
  const [user, setUser] = useState("");
  const [useWalletAmount, setuseWalletAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const isFocused = useIsFocused();
const [selectedService, setSelectedService] = useState("");
  const [mainCategoryArr, setMainCategoryArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([

  ]);

  const [serviceArr, setServiceArr] = useState([]);

 

      const getService = async () => {
        try {
          let {data:res} = await getServiceApi(`status=${generalModelStatuses.APPROVED}`);
          if (res.data && res.data?.length > 0) {

           
            setServiceArr(res.data.map((el,inde) => {
              if(inde  === 0){
                el.selected =true;
                   setSelectedService(el);
              } else {
                el.selected =false;
              }
              return el;
            }));
            
          }
        } catch (error) {
          toastError(error)
        }
    
      };

      const getParentCategories = async (serviceId) => {
        try {

          let {data:res} = await getNestedCategoriesApi(`service=${serviceId}`);

          if (res.data && res.data?.length > 0) {
            let cateAr = res.data.map((el,inde) => {
              el.selected =false;
            return el;
          });
          cateAr.unshift(  {
            name: 'All',
            selected: true,
          })
          setCategoriesArr(cateAr);
            
          }
        } catch (error) {
          toastError(error)
        }
    
      };
  const [productsArr, setProductsArr] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");






  const authCheck = async () => {
    let tokenObj = await getAuth();

    console.log(tokenObj, "tokenObjtokenObj")
    if (tokenObj) {
      setUser(tokenObj.user);
    }
  };
  const handleUserWallet = async (userId) => {
    try {
      let { data: res } = await getUserWalletApi(userId);
      if (res.data) {
        console.log(res.data, "transactionArrtransactionArrtransactionArr")
        setuseWalletAmount(res.data?.walletAmount)
      }
    } catch (error) {
      toastError(error);
    }
  }


  useEffect(() => {
    if(isFocused){
      getService();
       authCheck();
       getLocalStoreId()

    }
  }, [isFocused]);

  useEffect(() => {
    if (user) {
      handleUserWallet(user?._id);
    }
  }, [user]);

  useEffect(() => {
    if(selectedService) {
          getParentCategories(selectedService._id);
    }
  }, [selectedService]);

  const handleMainCategorySelect = (name, index) => {
    let mainArr = serviceArr.map((el, i) => {
      if (i == index) {
        el.selected = true;
        setSelectedService(el)
        setSelectedCategory("")
      } else {
        el.selected = false;
      }
      return el;
    });
    setServiceArr([...mainArr]);
  };

  const handleCategorySelect = (name, index) => {
    let mainArr = categoriesArr.map((el, i) => {
      if (i == index) {
        el.selected = true;
        if(el.name!="All"){
          setSelectedCategory(el)
        } else {
          setSelectedCategory("")

        }
      } else {
        el.selected = false;
      }
      return el;
    });
    setCategoriesArr([...mainArr]);
  };

  const getserviceProduct = async (id,query) => {
    try {
      const { data: res } = await getProductsForSubscriptionFromProductStockByStoreId(id,query);
      if (res) {
        setProductsArr(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLocalStoreId = async id => {
    try {
      let storeId = await getStoreId();

      if (storeId) {
         setStoreid(storeId);
      }  else {
        navigation.navigate("Home")
      }
      return;
    } catch (error) {
      toastError(error);
    }
  };

;

  useEffect(() => {
    if (storeId) {
     let querey = 'isSubscribed=true';
       if(selectedService && selectedService?._id){
          querey += `&serviceId=${selectedService?._id}`
       }
       if(selectedCategory && selectedCategory?._id){
        querey += `&categoryId=${selectedCategory?._id}`
       }
       console.log(querey,"quereyquereyquereyquereyquerey")
      getserviceProduct(storeId,querey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId,selectedService,selectedCategory]);



  const renderProducts = ({ item, index }) => {
    return (
      <View style={styles.productItemContainer}>
        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
          <Image source={{ uri: generateFilePath(item?.productObj?.mainImage) }} resizeMode="contain" style={{ height: 70, width: 70, backgroundColor: 'transparent' }} />
        </View>
        <View style={styles.flexRow}>
          <View style={[{ width: '65%', paddingHorizontal: 10, marginTop: 10 }]}>
            <Text style={styles.CategoryHeading}>{item?.name}</Text>
            <Text style={{ fontWeight: '400', color: 'rgba(0,0,0,0.4)', marginVertical: 12 }}></Text>
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginTop: -2 }}>₹{item?.sellingPrice}</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('ProductDetails', { subscription: true, productStockId: item?._id })} style={[styles.buttonStyle, { position: 'absolute', bottom: -10, right: -10, width: wp(25) }]}>
            <LinearGradient style={styles.linearGradientButton} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']}>
              <Text style={styles.buttonText}>ADD</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    );
  };

  const navigation = useNavigation();
  return (
    <>
      <Header addressLine={true} searchBar={true} rootProps={props} />
      <View style={[ExternalStyles.pdlr, { backgroundColor: 'white' }]}>
        <View style={styles.flexRowJustiyBetween}>
          <Text style={[ExternalStyles.hdingmain, ExternalStyles.mbbotom10, ExternalStyles.mttop10, { fontSize: 20 }]}>Subscription Product</Text>
          <View style={styles.WalletContainer}>
            <Entypo name={'wallet'} size={20} color={'#FF7373'} />
            <Text style={[ExternalStyles.textwhite, { fontSize: 12 }]}>₹{useWalletAmount.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ paddingBottom: 10 }}>
          <FlatList
            data={serviceArr}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => handleMainCategorySelect(item.name, index)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item?.selected ? (
                  <LinearGradient style={[styles.linearGradientButton, { padding: 2 }]} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']}>
                    <Text style={{ paddingVertical: 3, paddingHorizontal: 10, fontWeight: '700', color: 'white' }}>{item.name}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={{ padding: 10, fontWeight: '700' }}>{item.name}</Text>
                )}
              </Pressable>
            )}
          />
        </View>
        <View style={{ paddingBottom: 10 }}>
          <FlatList
            data={categoriesArr}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => handleCategorySelect(item.name, index)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.selected ? (
                  <LinearGradient style={[styles.linearGradientButton, { padding: 2 }]} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']}>
                    <Text style={{ paddingVertical: 3, paddingHorizontal: 10, fontWeight: '700', color: 'white' }}>{item.name}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={{ padding: 10, fontWeight: '700' }}>{item.name}</Text>
                )}
              </Pressable>
            )}
          />
        </View>

        <FlatList data={productsArr} keyExtractor={(item, index) => `${index}`} renderItem={renderProducts} style={{ marginVertical: 20 }} contentContainerStyle={{ paddingBottom: 300 }} />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowJustiyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productItemContainer: {
    width: wp(90),
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#EDF0FF',
    marginVertical: 15,
    borderRadius: 10,
    padding: 15,
    position: 'relative',
  },
  CategoryHeading: {
    color: '#000',
    fontSize: 10,
    fontWeight: '600',
  },
  WalletContainer: { marginVertical: 10, backgroundColor: '#FFB45E', display: 'flex', flexDirection: 'row', width: 100, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 },
  buttonStyle: { marginVertical: 10 },
  linearGradientButton: { padding: 10, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: 'white', fontWeight: '500' },
});
