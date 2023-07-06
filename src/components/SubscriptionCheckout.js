import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../ReusableComponents/Header';
import { addNewSubscription } from '../services/CustomerSubscription.service';
import { getUserAddresses } from '../services/userAddress.service';
import styles from '../stylecomponents/Style';
import { getAuth } from '../utils/auth';
import { generateFilePath } from '../utils/file';
import { toastError } from '../utils/toastError';
export default function SubscriptionCheckout(props) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cartArr, setCartArr] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [pageName, setPageName] = useState('');
  const [subscriptionType, setSubscriptionType] = useState(props?.route?.params?.subscriptionType);
  const [startDate, setStartDate] = useState(props?.route?.params?.startDate);
  const [productArr, setProductArr] = useState(props?.route?.params?.productArr);
  const authCheck = async () => {
    let tokenObj = await getAuth();
    if (tokenObj) {
      setUser(tokenObj.user);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  const handleUserAddress = async (userId) => {
    try {
      let query = 'defaultAddress=true';
      if (user) {
        query += '&userId=' + userId;
      }
      // let query =
      let { data: res } = await getUserAddresses(query);
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

  const handleTotalCalculation = () => {
    let tempCount = productArr.reduce((acc, el) => acc + el.sellingPrice * el.quantity, 0);
    let tempQuantity = productArr.reduce((acc, el) => acc + el.quantity, 0);
    setQuantity(tempQuantity);
    setTotal(tempCount);
  };

  useEffect(() => {
    if (productArr && productArr.length > 0) {
      handleTotalCalculation();
    }
  }, [productArr]);

  useEffect(() => {
    if(user && user?._id){
    handleUserAddress(user?._id);

    }
  }, [user]);

  const createOrder = async () => {
  
  };

  const handleSubmit = async () => {
    try {
      let authObj = await getAuth();
      let obj = {
        productArr,
        subscriptionType,
        startDate,
        userId: authObj?.userId,
        deliveryAddressObj: {
          pincode: userAddress?.pincode,
          addressLine1: userAddress?.addressLine1,
          addressLine2: userAddress?.addressLine2,
          addressName: userAddress?.addressName,
          location: userAddress?.location,
        },
      };
      const { data: res } = await addNewSubscription(obj);
      if (res) {
        setModalVisible(true);
        setTimeout(()=>  navigation.navigate('Subscription'), 2000);
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <Header stackHeader={true} screenName={'Subscription Checkout'} rootProps={props} />

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={[styles.img15, { width: wp(100) }]}>
          <Image style={{ width: wp(100), height: hp(8) }} source={require('../../assets/img/headerimg.png')} />
        </View>
        <View style={[styles.bgwhite, styles.pdlr]}>
          <View style={[styles.rowflex1, styles.mttop10]}>
            <View>
              <Text style={[styles.fontw6, styles.textblack, styles.fntsize]}>Order Summary</Text>
            </View>
          </View>
          <Text style={{ marginTop: 10, color: '#212529', fontSize: 11 }}>We sent an email to orders@ebslon.com with your order confirmation and bill. </Text>
          <Text style={[styles.fontw6, styles.textblack, styles.mttop20, styles.mbbotom10, styles.font22]}>{quantity} items in the order</Text>
          {productArr &&
            productArr.map((cart, inde) => (
              <View key={inde} style={styles.productdetlsbox}>
                <View style={styles.prodctimgwidt}>
                  <Image style={{ width: wp(18), height: hp(9) }} source={{ uri: generateFilePath(cart?.image) }} />
                </View>
                <View>
                  <Text style={[styles.prodctname]}>{cart?.name}</Text>
                  <View style={[styles1.rowflex1]}>
                    <View>
                      <Text style={[styles.txtp, styles.mr5]}>Price </Text>
                      <Text style={styles.prctext}>₹{cart?.sellingPrice}</Text>
                    </View>

                    <View style={{ textalign: 'right' }}>
                      <LinearGradient
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
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
                        ]}></LinearGradient>
                    </View>
                  </View>
                </View>
              </View>
            ))}
        </View>

        <View style={styles1.paymntarea}>
          <View style={styles.rowflex1}>
            <View style={styles1.leftcnntt}>
              <Text style={{ fontWeight: '600', color: '#000', fontSize: 13 }}>{userAddress ? userAddress.addressType : 'No Address'}</Text>
              <Text style={{ fontWeight: '400', color: '#000', fontSize: 11 }}>{userAddress ? userAddress.addressName : 'No Address'}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Showaddress')} style={[styles.rowflex1, styles1.righticson, { marginRight: 15 }]}>
              <Entypo size={20} name="location" color="#EB8E24" style={styles1.iconpding} />
              <Text style={{ fontWeight: '600', color: '#000', fontSize: 11, color: '#EB3C24' }}>Change Address</Text>
            </Pressable>
          </View>

          <View style={[styles.rowflex1, styles.mttop10, styles.mbbotom10]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#000', fontSize: 13 }}>₹{total}</Text>
              <Text style={{ fontWeight: '400', color: '#C4C4C4', fontSize: 11 }}>VIEW BILL</Text>
            </View>
            {productArr && productArr.length > 0 ? (
              <View style={[styles.rowflex1, { flex: 1 }]}>
                <Pressable style={{ width: '100%', marginTop: 20 }}>
                  <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                    <Text style={styles1.textsubcript} onPress={() => handleSubmit()}>
                      Continue To Payment
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            ) : (
              <View style={[styles.rowflex1, { flex: 1 }]}>
                <Pressable style={{ width: '100%', marginTop: 20 }}>
                  <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                    <Text style={styles1.textsubcript} onPress={() => navigation.navigate('Home')}>
                      Buy Now
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            )}
          </View>
          <View style={{ position: 'absolute', bottom: 0 }}>
            <Image style={{ width: wp(100), height: hp(2) }} source={require('../../assets/img/Rectangle-img1.png')} />
          </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
