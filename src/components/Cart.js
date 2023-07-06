import {FlatList, Image, ImageBackground, TouchableOpacity, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import styles from '../stylecomponents/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import {addQuantityinToCartApi, getCartApi, removeQuantityinToCartApi} from '../services/cart.service';
import {toastError} from '../utils/toastError';
import {getAuth} from '../utils/auth';
import {getUserAddresses} from '../services/userAddress.service';
import {createOrderApi} from '../services/order.service';
import {generateFilePath} from '../utils/file';
import {getStoreAuth} from '../utils/store';
export default function Cart(props) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cartArr, setCartArr] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [pageName, setPageName] = useState('');
  const isFocused = useIsFocused();
  const [discountObj, setDiscountObj] = useState("");

  const getUserCart = async () => {
    try {
      let {data: res} = await getCartApi();
      console.log('discountObj++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log(JSON.stringify(res.discountObj,null,2),"")
      console.log('discountObj__________________________________________________________________________________');
      if (res && res?.success) {
        setCartArr(res.data);
        setDiscountObj(res.discountObj)
      }
      return;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  useEffect(() => {
    if (cartArr && cartArr.length > 0) {
      let carttotal = cartArr.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.quantity * currentValue.price;
      }, 0);

      if(discountObj && discountObj?.value && carttotal){
        carttotal -= discountObj?.value;
      }
      if(carttotal >= 0 ){
       setTotal(carttotal);

      }
    } else {
      setTotal(0);

    }
  }, [cartArr, discountObj]);

  const authCheck = async () => {
    let tokenObj = await getAuth();
    if (tokenObj) {
      setUser(tokenObj.user);
    }
  };

  useEffect(() => {
    if(isFocused){
      authCheck();
      getUserCart();
    }
  }, [isFocused]);

  const handleQuantityAdd = async id => {
    try {
      if (id) {
        let {data: res} = await addQuantityinToCartApi(id);
        if (res && res?.success) {
          getUserCart();
        } else {
          toastError(res.message);
        }
      }

      return;
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };
  const handleQuantityMinus = async id => {
    try {
      if (id) {
        let {data: res} = await removeQuantityinToCartApi(id);
        if (res && res?.success) {
          getUserCart();
        } else {
          toastError(res.message);
        }
      }

      return;
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };
  const handleUserAddress = async (userId) => {
    try {
      let query = 'defaultAddress=true';
      if (user) {
        query += '&userId=' + userId;
      }
      // let query =
      let {data: res} = await getUserAddresses(query);
      if (res && res?.success) {
        if (res.data.length > 0) {
          console.log(res.data[0], 'categuser Addressssssories');

          setUserAddress(res.data[0]);
        } else {
          if (pageName != 'Addressmap') {
            // toastError("Please Add Location");
            // navigation.navigate("Addressmap")
            return;
          }
          return;
        }
      }
      return;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  useEffect(() => {
    if(user && user?._id){
    handleUserAddress(user?._id);

    }
  }, [user]);

  const [categoryArr, setCategoryArr] = useState([
    {
      imageSource: require('../../assets/img/arcticons_atalk1.png'),
      hedingmain: 'No Contact Delivery',
      desripit: 'Delivery partner will leave your order at your door',
    },
    {
      imageSource: require('../../assets/img/bell1.png'),
      hedingmain: 'Do Not Ring The Bell',
      desripit: 'Delivery partner will not ring the bell',
    },
    {
      imageSource: require('../../assets/img/foot1.png'),
      hedingmain: 'Beware Of Pets',
      desripit: 'Delivery partner will be informed about the presence of pet(s)',
    },
  ]);

  const createOrder = async () => {
    navigation.navigate('PaymentOption');

    //         try {

    //             let token = await getAuth()
    // console.log(token,"tokentokentoken")
    //       let obj = {
    //         status:"pending",
    //         userAddress,
    //         userId:token?.userId
    //       }
    //             // let query =
    //             let {data:res} = await createOrderApi(obj);
    //               if (res && res?.success) {
    //                 setModalVisible(true)

    //                 setTimeout(() => {
    //                         navigation.navigate("Orderprosser")
    //                 }, 2000);
    //               }
    //              return

    //             } catch (error) {
    //               console.error(error)
    //               toastError(error)
    //             }
  };

  const deliverysta = ({item, index}) => {
    console.log(item, 'item');

    return (
      <View style={styles1.datesubcirption}>
        <View>
          <View style={styles1.rowflex1}>
            <Image style={{width: wp(5), height: hp(3)}} source={item.imageSource} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontWeight: '700', color: '#000', fontSize: 11}}>{item.hedingmain}</Text>
              <Text style={{fontWeight: '400', color: '#000', fontSize: 10}}>{item.desripit}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header stackHeader={true} screenName={'Check Out'} rootProps={props} />

      <ScrollView>
        <View style={[styles.img15, {width: wp(100)}]}>
          <Image style={{width: wp(100), height: hp(8)}} source={require('../../assets/img/headerimg.png')} />
        </View>
        <View style={[styles.bgwhite, styles.pdlr]}>
          <View style={[styles.rowflex1, styles.mttop10]}>
            <View>
              <Text style={[styles.fontw6, styles.textblack, styles.fntsize]}>Order Summary</Text>
            </View>
          </View>
          <Text style={{marginTop: 10, color: '#212529', fontSize: 11}}>We sent an email to orders@ebslon.com with your order confirmation and bill. </Text>
          <Text style={[styles.fontw6, styles.textblack, styles.mttop20, styles.mbbotom10, styles.font22]}>{cartArr.length} items in the order</Text>
          {cartArr &&
            cartArr.map((cart, inde) => (
              <View key={inde} style={styles.productdetlsbox}>
                <View style={styles.prodctimgwidt}>
                  <Image style={{width: wp(18), height: hp(9)}} source={{uri: generateFilePath(cart.productImageUrl)}} />
                </View>
                <View>
                  <Text style={[styles.prodctname]}>{cart?.name}</Text>
                  <View style={[styles1.rowflex1]}>
                    <View>
                      <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                      <Text style={styles.prctext}>₹{cart?.price}</Text>
                    </View>

                    <View>
                      <Text style={styles.txtp}>Weight </Text>
                      <Text style={[styles.prctext]}>{cart?.attribute?.name}</Text>
                    </View>

                    <View style={{textalign: 'right'}}>
                      <LinearGradient
                        start={{x: 0.0, y: 0.0}}
                        end={{x: 1.0, y: 0.0}}
                        colors={['#F03893', '#F7A149']}
                        style={[
                          styles.boxplusmines,
                          {
                            display: 'flex',
                            marginLeft: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          },
                        ]}>
                        <Pressable style={{padding: 10}} onPress={() => handleQuantityMinus(cart?.productStockId)}>
                          <Icon size={18} name="minus" color="#fff" />
                        </Pressable>
                        <Text style={{color: '#fff', padding: 10}}>{cart.quantity}</Text>
                        <Pressable style={{padding: 10}} onPress={() => handleQuantityAdd(cart?.productStockId)}>
                          <Icon size={18} name="plus" color="#fff" />
                        </Pressable>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </View>
            ))}

          {/* 
                    <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                            <Image style={{width:wp(18), height:hp(9)}} source={require('../../assets/img/bananan1.png')} />
                        </View>
                        <View>
                            <Text style={[styles.prodctname]}>Banana</Text>
                            <View style={[styles1.rowflex1,]}>
                                <View>
                                    <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                    <Text style={styles.prctext}>₹82</Text>
                                </View>

                                <View>
                                    <Text style={styles.txtp}>Weight </Text>
                                    <Text style={[styles.prctext]}>1kg</Text>
                                </View>

                                <View style={{ textalign: 'right' }}>
                                    <LinearGradient
                                        start={{ x: 0.0, y: 0.0 }}
                                        end={{ x: 1.0, y: 0.0 }}
                                        colors={['#F03893', '#F7A149']}
                                        style={[styles.boxplusmines, {
                                            display: 'flex', marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                        },]}>
                                        <Pressable>
                                            <Icon size={18} name="minus" color="#fff" style={styles1.iconpding} />
                                        </Pressable>
                                        <Text style={{ color: '#fff' }} >1</Text>
                                        <Pressable>
                                            <Icon size={18} name="plus" color="#fff" style={styles1.iconpding} />
                                        </Pressable>
                                    </LinearGradient>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                        <Image style={{width:wp(18), height:hp(9)}} source={require('../../assets/img/bananan1.png')} />
                        </View>
                        <View>
                            <Text style={[styles.prodctname]}>Banana</Text>
                            <View style={[styles1.rowflex1,]}>
                                <View>
                                    <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                    <Text style={styles.prctext}>₹82</Text>
                                </View>

                                <View>
                                    <Text style={styles.txtp}>Weight </Text>
                                    <Text style={[styles.prctext]}>1kg</Text>
                                </View>

                                <View style={{ textalign: 'right' }}>
                                    <LinearGradient
                                        start={{ x: 0.0, y: 0.0 }}
                                        end={{ x: 1.0, y: 0.0 }}
                                        colors={['#F03893', '#F7A149']}
                                        style={[styles.boxplusmines, {
                                            display: 'flex', marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                        },]}>
                                        <Pressable>
                                            <Icon size={18} name="minus" color="#fff" style={styles1.iconpding} />
                                        </Pressable>
                                        <Text style={{ color: '#fff' }} >1</Text>
                                        <Pressable>
                                            <Icon size={18} name="plus" color="#fff" style={styles1.iconpding} />
                                        </Pressable>
                                    </LinearGradient>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={styles.productdetlsbox}>
                        <View style={styles.prodctimgwidt}>
                        <Image style={{width:wp(18), height:hp(9)}} source={require('../../assets/img/bananan1.png')} />
                        </View>
                        <View>
                            <Text style={[styles.prodctname]}>Banana</Text>
                            <View style={[styles1.rowflex1,]}>
                                <View>
                                    <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                                    <Text style={styles.prctext}>₹82</Text>
                                </View>

                                <View>
                                    <Text style={styles.txtp}>Weight </Text>
                                    <Text style={[styles.prctext]}>1kg</Text>
                                </View>

                                <View style={{ textalign: 'right' }}>
                                    <LinearGradient
                                        start={{ x: 0.0, y: 0.0 }}
                                        end={{ x: 1.0, y: 0.0 }}
                                        colors={['#F03893', '#F7A149']}
                                        style={[styles.boxplusmines, {
                                            display: 'flex', marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                        },]}>
                                        <Pressable>
                                            <Icon size={18} name="minus" color="#fff" style={styles1.iconpding} />
                                        </Pressable>
                                        <Text style={{ color: '#fff' }} >1</Text>
                                        <Pressable>
                                            <Icon size={18} name="plus" color="#fff" style={styles1.iconpding} />
                                        </Pressable>
                                    </LinearGradient>
                                </View>

                            </View>
                        </View>
                    </View> */}
        </View>
        {
           discountObj && cartArr && cartArr.length > 0 ? (
           
            <Pressable onPress={() => navigation.navigate('Applycoupon')} style={[styles1.offertap, styles.rowflex1]}>
            <View style={styles.rowflex1}>
              <Image style={{width: wp(8), height: hp(4)}} source={require('../../assets/img/bxs_offer1.png')} />
              <Text style={{fontSize: 13, fontWeight: '600', marginLeft: 10, color: '#000'}}> {discountObj?.discountCode}  ( ₹ { discountObj?.value} )</Text>
            </View>

            <Entypo size={22} name="chevron-right" color="#EB8E24" style={styles1.iconpding} />
          </Pressable>
          ) :(
            <Pressable onPress={() => navigation.navigate('Applycoupon')} style={[styles1.offertap, styles.rowflex1]}>
            <View style={styles.rowflex1}>
              <Image style={{width: wp(8), height: hp(4)}} source={require('../../assets/img/bxs_offer1.png')} />
              <Text style={{fontSize: 13, fontWeight: '600', marginLeft: 10, color: '#000'}}>Avail Offers / Coupons</Text>
            </View>
            <Entypo size={22} name="chevron-right" color="#EB8E24" style={styles1.iconpding} />
          </Pressable>
          )
        }
      
        <View style={styles1.paymntarea}>
          <View style={styles.rowflex1}>
            <View style={styles1.leftcnntt}>
              <Text style={{fontWeight: '600', color: '#000', fontSize: 13}}>{userAddress ? userAddress.addressType : 'No Address'}</Text>
              <Text style={{fontWeight: '400', color: '#000', fontSize: 11}}>{userAddress ? userAddress.addressName : 'No Address'}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Showaddress')} style={[styles.rowflex1, styles1.righticson, {marginRight: 15}]}>
              <Entypo size={20} name="location" color="#EB8E24" style={styles1.iconpding} />
              <Text style={{fontWeight: '600', color: '#000', fontSize: 11, color: '#EB3C24'}}>Change Address</Text>
            </Pressable>
          </View>

          <View style={[styles.rowflex1, styles.mttop10, styles.mbbotom10]}>
            <View style={{flex: 1}}>
              <Text style={{fontWeight: '600', color: '#000', fontSize: 13}}>₹{total}</Text>
              <Text style={{fontWeight: '400', color: '#C4C4C4', fontSize: 11}}>VIEW BILL</Text>
            </View>
            {cartArr && cartArr.length > 0 ? (
              <View style={[styles.rowflex1, {flex: 1}]}>
                <Pressable style={{width: '100%', marginTop: 20}}>
                  <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                    <Text style={styles1.textsubcript} onPress={() => createOrder()}>
                      Continue To Payment
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            ) : (
              <View style={[styles.rowflex1, {flex: 1}]}>
                <Pressable style={{width: '100%', marginTop: 20}}>
                  <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                    <Text style={styles1.textsubcript} onPress={() => navigation.navigate('Home')}>
                      Buy Now
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            )}
          </View>
          <View style={{position: 'absolute', bottom: 0}}>
            <Image style={{width: wp(100), height: hp(2)}} source={require('../../assets/img/Rectangle-img1.png')} />
          </View>
        </View>

        <View style={styles1.deliverybox}>
          <Text style={{fontSize: 13, color: '#000', fontWeight: '600'}}>Delivery Instructions</Text>
          <Text style={{fontSize: 11, color: '#000', fontWeight: '500'}}>Delivery partner will be notified</Text>

          <FlatList style={styles.mttop10} contentContainerStyle={{}} data={categoryArr} horizontal renderItem={deliverysta} keyExtractor={(item, index) => `${index}`} />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles1.modelpostion}>
          <View style={styles1.centeredView}>
            <View style={styles1.modalView}>
              <Image source={require('../../assets/img/successful.png')} />

              {/* <Pressable style={[styles1.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <AntDesign name={'closecircle'} size={20} color={'#000'} />
                            </Pressable> */}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}

const styles1 = StyleSheet.create({
  iconpding: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  rowflex1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: wp(58),
    marginTop: 5,
  },
  offertap: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  paymntarea: {
    padding: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  leftcnntt: {
    width: wp(50),
  },
  righticson: {
    width: wp(30),
  },
  textsubcript: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  deliverybox: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  datesubcirption: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: wp(55),
    paddingVertical: 5,
    paddingVertical: 15,
    marginBottom: 10,

    marginRight: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  rowflex1: {
    display: 'flex',
    flexDirection: 'row',
    width: wp(40),
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: wp(95),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modelpostion: {
    position: 'relative',
  },
  buttonClose: {
    position: 'absolute',
    top: -30,
    right: 0,
  },
});
