import {FlatList, Image, ImageBackground, TouchableOpacity, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../stylecomponents/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import {getUserWalletApi} from '../services/wallet.service';
import {getAuth} from '../utils/auth';
import {getCartApi} from '../services/cart.service';
import {createOrderApi, paymentCallback} from '../services/order.service';
import {paymentOptions} from '../utils/constant';
import {getUserAddresses} from '../services/userAddress.service';
import {toastError} from '../utils/toastError';
import RazorpayCheckout from 'react-native-razorpay';

export default function PaymentOption(props) {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [useWalletAmount, setuseWalletAmount] = useState(0);
  const [cartArr, setCartArr] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [discountObj, setDiscountObj] = useState("");

  const authCheck = async () => {
    let tokenObj = await getAuth();

    console.log(tokenObj, 'tokenObjtokenObj');
    if (tokenObj) {
      setUser(tokenObj.user);
    }
  };

  const getUserCart = async () => {
    try {
      let {data: res} = await getCartApi();
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
      if(discountObj && discountObj?.value){
        carttotal -= discountObj?.value;
      }
      setTotal(carttotal);
    }
  }, [cartArr, discountObj]);

  const handleUserWallet = async userId => {
    try {
      let {data: res} = await getUserWalletApi(userId, 'transaction=true');
      if (res.data) {
        setuseWalletAmount(res.data?.walletAmount);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    authCheck();
    getUserCart();
  }, []);

  useEffect(() => {
    if (user) {
      handleUserWallet(user?._id);
      handleUserAddress();
    }
  }, [user]);
  const handleUserAddress = async () => {
    try {
      let query = 'defaultAddress=true';
      if (user) {
        query += '&userId=' + user._id;
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
  const handleOrder = async payment => {
    try {
      if (user) {
        let obj = {
          status: 'pending',
          userAddress,
          userId: user?._id,
          payment,
        };

        if (payment == paymentOptions.Wallet && parseInt(useWalletAmount) < parseInt(total)) {
          toastError('You Cannot pay with Wallet');
          return 0;
        }

        // let query =
        let {data: res} = await createOrderApi(obj);

        if (res.success) {
          if (res?.orderId) {
            await handleRedirect(res.data, res.orderId);
          } else {
            setModalVisible(true);

            setTimeout(() => {
              navigation.navigate('Orderprosser');
            }, 2000);
          }
          // alert(res.message)
        }
      } else {
        navigation.navigate('Login');
      }
    } catch (err) {
      if (err.response?.data.message) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
      } else {
        alert(err);
        console.error(err);
      }
    }
  };
  const handleRedirect = async (obj, orderId) => {
    try {
      console.log(JSON.stringify(obj, null, 2));
      console.log(JSON.stringify(obj, null, 2), 'object');
      let tempObj = obj;
      let OrderId = orderId;
      var options = {
        description: 'Order',
        image: 'https:i.imgur.com/3g7nmJC.png',
        currency: tempObj.currency,
        key: 'rzp_test_jOl57g4TNamtFW',
        amount: tempObj.amount,
        name: 'Order',
        order_id: tempObj.id,
        //   Replace this with an order_id created using Orders API.
        theme: {
          color: '#F84B4B',
        },
      };
      RazorpayCheckout.open(options)
        .then(async data => {
          //  handle success
          let Obj = {...data, amount: tempObj.amount};
          await handlePaymentCallBack(Obj, OrderId);
        })
        .catch(error => {
          //  handle failure console.error(error);

          if (error?.error?.description) {
            console.log(error, '  console.log( error);  console.log( error);');
            alert(error?.error?.description, 'saddfsfdfsd');
          } else {
            alert(`Error: ${error.code} | ${error.description}`);
          }
        });
    } catch (error) {
      console.error(error, 'jhgjgkkjhjkljhkljk;ljk;lk;lk;lkl;k;');
    }
  };
  const handlePaymentCallBack = async (obj, id) => {
    try {
      const serialize = function (obj) {
        var str = [];
        for (var p in obj)
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
        return str.join('&');
      };
      let {data: res, status: statusCode} = await paymentCallback(id, serialize(obj));
      if (statusCode == 200 || statusCode == 304) {
        setModalVisible(true);

        setTimeout(() => {
          navigation.navigate('Orderprosser');
        }, 2000);
      }
    } catch (error) {
      //console.error(error);
    }
  };
  return (
    <>
      <Header stackHeader={true} screenName={'Payment Options'} rootProps={props} />

      <ScrollView style={styles1.bggray}>
        <View style={[styles1.paymntheader, styles.pdlr, styles.rowflex1]}>
          <Text style={[styles.fontw6, styles.colorblck]}>Pay Amount</Text>
          <Text style={[styles.fontw6, styles.colorblck]}>₹ {total}</Text>
        </View>
        <View style={styles.pdlr}>
          <Text style={[styles.fontw6, styles.colorblck, styles.mttop10, styles.mbbotom10]}> Wallet</Text>

          {/* <View style={styles1.boxqr}>
                        <View style={styles1.paymentstyl3}>
                            <Pressable onPress={()=> navigation.navigate("Walletsuccessful")} style={styles1.widhtpaymnt}>
                                <Text style={styles1.iconpaymnt}>
                                    <Image style={styles1.iconpay} source={require('../../assets/img/gpay.png')} resizeMode='contain' />
                                    </Text>
                                <Text style={styles1.textpaymnt}>GPay</Text>
                            </Pressable>
                            <Pressable onPress={()=> navigation.navigate("Walletsuccessful")}  style={styles1.widhtpaymnt}>
                                <Text style={styles1.iconpaymnt}>
                                    <Image style={styles1.iconpay}  source={require('../../assets/img/ptm.png')} resizeMode='contain' /> </Text>
                                <Text style={styles1.textpaymnt}>Paytm</Text>
                            </Pressable>
                            <Pressable onPress={()=> navigation.navigate("Walletsuccessful")}  style={styles1.widhtpaymnt}>
                                <Text style={styles1.iconpaymnt}>
                                    <Image style={styles1.iconpay}  source={require('../../assets/img/phonepay.png')} resizeMode='contain' /> </Text>
                                <Text style={styles1.textpaymnt}>PhonePe</Text>
                            </Pressable>
                        </View>
                        <Text style={{ fontWeight: '600', color: '#EB8E24', marginTop: 16, }}>Other UPI Options</Text>
                    </View>
                    <Text style={{ fontWeight: '600', color: '#000', marginBottom: 10, }}>Cards</Text> */}

          <View style={[styles1.boxqr, styles.rowflex1]}>
            <Pressable onPress={() => handleOrder(paymentOptions.Wallet)} style={styles1.rowflex1}>
              <Image style={[styles1.imgsmall]} source={require('../../assets/img/wallet_img.png')} resizeMode="contain" />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 12, color: '#000', fontWeight: '600'}}>₹ {useWalletAmount}</Text>
                <Text style={{fontSize: 10, color: '#868686'}}>Amount</Text>
              </View>
            </Pressable>
            <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
          </View>

          <Text style={{fontWeight: '600', color: '#000', marginBottom: 10}}>Payment Options</Text>

          <Pressable onPress={() => handleOrder(paymentOptions.Razorpay)} style={[styles1.boxqr, styles.rowflex1]}>
            <View style={styles.rowflex}>
              <Image style={[styles1.imgsmall, {marginRight: 15}]} source={require('../../assets/img/paymnetkk.png')} resizeMode="contain" />
              <Text style={{fontSize: 12, color: '#000', fontWeight: '600'}}>Razorpay</Text>
            </View>
            <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
          </Pressable>

          {/* <Text style={{ fontWeight: '600', color: '#000', marginBottom: 10, }}>Wallet</Text>

                    <View style={[styles1.boxqr]}>
                        <Pressable onPress={()=> navigation.navigate("Walletsuccessful")}  style={[styles.rowflex1, { marginBottom: 5 }]}>
                            <View style={styles1.rowflex1}>
                                <Image  style={styles1.imgsmall} source={require('../../assets/img/ptm.png')} resizeMode='contain' />
                                <View style={{ marginLeft: 10, }}>
                                    <Text style={{ fontSize: 12, color: '#000', fontWeight: '600' }}>Paytm</Text>
                                    <Text style={{ fontSize: 10, color: '#868686', }}>Rs 50-500 CB (Scratch Card) on min Txn of Rs 1250 via Wallet/Postpaid.</Text>
                                </View>
                            </View>
                            <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
                        </Pressable>



                        <Pressable onPress={()=> navigation.navigate("Walletsuccessful")}  style={[styles.rowflex1, styles.mttop5, styles1.bordertop]}>
                            <View style={styles1.rowflex1}>
                                <Image style={styles1.imgsmall} source={require('../../assets/img/mmcard.png')} resizeMode='contain' />
                                <View style={{ marginLeft: 10, }}>
                                    <Text style={{ fontSize: 12, color: '#000', fontWeight: '600' }}>Mobikwik</Text>
                                    <Text style={{ fontSize: 10, color: '#868686', }}>Rs 50-500 Cashback on min Txn of Rs 1000.</Text>
                                </View>
                            </View>
                            <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
                        </Pressable>
                    </View>

                    <Text style={{ fontWeight: '600', color: '#000', marginBottom: 10, }}>Net Banking</Text>

                    <View style={styles1.boxqr}>
                        <View style={styles1.paymentstyl3}>
                            <Pressable onPress={()=> navigation.navigate("Walletsuccessful")}  style={styles1.widhtpaymnt}>
                                <Text style={styles1.iconpaymnt}>
                                    <Image style={styles1.iconpay}  source={require('../../assets/img/hdfc.png')} resizeMode='contain' /> </Text>
                                <Text style={styles1.textpaymnt}>HDCF</Text>
                            </Pressable>
                            <Pressable onPress={()=> navigation.navigate("Walletsuccessful")}  style={styles1.widhtpaymnt}>
                                <Text style={styles1.iconpaymnt}>
                                    <Image style={styles1.iconpay} source={require('../../assets/img/sbi.png')} resizeMode='contain' /> </Text>
                                <Text style={styles1.textpaymnt}>SBI</Text>
                            </Pressable>
                            <Pressable onPress={()=> navigation.navigate("Walletsuccessful")}  style={styles1.widhtpaymnt}>
                                <Text style={styles1.iconpaymnt}>
                                    <Image style={styles1.iconpay} source={require('../../assets/img/icic.png')} resizeMode='contain' /> </Text>
                                <Text style={styles1.textpaymnt}>ICICI</Text>
                            </Pressable>
                            <Pressable onPress={()=> navigation.navigate("Walletsuccessful")}  style={styles1.widhtpaymnt}>
                                <Text style={styles1.iconpaymnt}> 
                                <Image style={styles1.iconpay} source={require('../../assets/img/axis.png')} resizeMode='contain' /> </Text>
                                <Text  style={styles1.textpaymnt}>Axis</Text>
                            </Pressable>
                        </View>
                        <Text style={{ fontWeight: '600', color: '#EB8E24', marginTop: 16, }}>Other Bank</Text>
                    </View> */}
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
  paymntheader: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  bggray: {
    backgroundColor: '#F3F3F3;',
    flex: 1,
  },
  boxqr: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  paymentstyl3: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  widhtpaymnt: {
    width: wp(20),
  },
  iconpaymnt: {
    textAlign: 'center',
    alignSelf: 'center',
    width: 55,
    lineHeight: 45,
    height: 55,
    backgroundColor: '#fff',

    textAlign: 'center',

    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  textpaymnt: {
    fontSize: 11,
    marginTop: 5,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  rowflex1: {
    display: 'flex',
    flexDirection: 'row',
    width: wp(60),
  },
  bdrtp: {
    borderTopColor: '#868686',
    borderTopWidth: '0.6',
  },
  bordertop: {
    borderTopWidth: 0.5,
    borderTopColor: '#868686',
    paddingTop: 10,
  },
  iconpay: {
    width: wp(9),
    height: hp(3),
  },
  imgsmall: {
    width: wp(8),
    height: hp(4),
  },
});
