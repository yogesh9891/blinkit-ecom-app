import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import { getProductsForSubscriptionFromProductStockByStoreId } from '../services/product.service';
import { findNearStoreApi } from '../services/user.service';
import { getUserWalletApi } from '../services/wallet.service';
import ExternalStyles from '../stylecomponents/Style';
import { getAuth } from '../utils/auth';
import { generateFilePath } from '../utils/file';
import { getCoordinatesFromLocal } from '../utils/localStorage';
import { getStoreId, storeStore, storeStoreId } from '../utils/store';
import { toastError, toastSuccess } from '../utils/toastError';
import { getMySubscriptions } from '../services/CustomerSubscription.service';
export default function Mysubcriprtion(props) {
  const navigate = useNavigation()
  const focused = useIsFocused()
  const [storeId, setStoreid] = useState('');

  const [today, setToday] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState({});
  const [daysArr, setDaysArr] = useState([]);

  const [user, setUser] = useState("");
  const [useWalletAmount, setuseWalletAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push({ day: currentDate.format('dddd').substring(0, 3), month: moment(currentDate).format('MMMM').substring(0, 3), date: new Date(currentDate).getDate(), dateString: moment(currentDate).format('YYYY-MM-DD'), status: "vacations" })
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }
  useEffect(() => {
    if (focused) {
      let today = new Date();
      var firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      var lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
      let datesArr = getDates(firstDay, lastDay)
      setDaysArr(datesArr)
      setSelectedDate(datesArr[0])

    }
  }, [focused])


  useEffect(() => {
    if (focused && storeId != "" && storeId) {
      handleGetProucts()
    }
  }, [focused, storeId])



  const [productsArr, setProductsArr] = useState([]);






  const handleGetProucts = async () => {
    try {
      let { data: res } = await getProductsForSubscriptionFromProductStockByStoreId(storeId)
      if (res.data) {
        setProductsArr(res.data)
      }
    }
    catch (err) {
      toastError(err)
    }
  }




  const handleGetSubscriptions = async (id) => {
    try {
      let { data: res } = await getMySubscriptions(id)
      if (res.data) {
        console.log(JSON.stringify(res, null, 2), "Asd")
        setDaysArr(res.data)
        setSelectedDate(res.data[0])
      }
    }
    catch (err) {
      toastError(err)
    }
  }






  const getLocalStoreId = async id => {
    try {
      let storeId = await getStoreId();

      if (storeId) {
        setStoreid(storeId);
      } else {
        getNearStore();
      }
      return;
    } catch (error) {
      toastError(error);
    }
  };

  const getNearStore = async () => {
    let data = await getCoordinatesFromLocal();

    let obj = {
      longitude: data.longitude,
      latitude: data.latitude,
    };
    try {
      let { data: res } = await findNearStoreApi(obj);

      if (res.data && res.data?.length > 0) {
        let sstore = res.data[0];
        storeStoreId(sstore?._id);
        setStoreid(sstore?._id);
        storeStore(sstore);
      } else {
        toastError('No Store Found');
        // navigation.navigate("Addressmap")
      }
    } catch (error) {
      //console.log(error);
    }
  };



  useEffect(() => {
    getLocalStoreId();

    // getProduct();
  }, []);


  const authCheck = async () => {
    let tokenObj = await getAuth();

    //console.log(tokenObj, "tokenObjtokenObj")
    if (tokenObj) {
      setUser(tokenObj.user);
    }
  };
  const handleUserWallet = async (userId) => {
    try {
      let { data: res } = await getUserWalletApi(userId);
      if (res.data) {
        //console.log(res.data, "transactionArrtransactionArrtransactionArr")
        setuseWalletAmount(res.data?.walletAmount)

      }
    } catch (error) {
      toastError(error);
    }
  }


  useEffect(() => {
    authCheck();
  }, []);

  useEffect(() => {
    if (user) {
      handleUserWallet(user?._id);
      handleGetSubscriptions(user?._id)

    }
  }, [user]);


  const subcriprtiondate = ({ item, index }) => {
    // console.log(JSON.stringify(item, null, 2), "item")
    return (
      <Pressable onPress={() => setSelectedDate(item)} style={[ExternalStyles.datesubcirption, { display: "flex", justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontSize: 16, color: '#000', fontWeight: '600', textTransform: "uppercase" }}>{item.day}</Text>
        <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontWeight: '600', textTransform: "uppercase" }}>{item.month}</Text>
        <Text style={{ color: "black" }}>{item.date}</Text>
        <Text style={{ width: "50%", marginTop: 10, height: 2, backgroundColor: item.status == "vacations" ? "red" : item.status == "Pending" ? "yellow" : "black", }} ></Text>
      </Pressable>
    );
  };





  const subcriprtiondate2 = ({ item, index }) => {
    return (
      <View style={styles1.datesubcirption}>
        <Image source={{ uri: generateFilePath(item?.productObj?.mainImage) }} style={styles1.responsivproduct} resizeMode='contain' />

        <Text style={[ExternalStyles.reletiproname, { fontSize: 9 }]}>{item?.name}</Text>
        {/* <Text style={ExternalStyles.reletiprodgram}>{item.wet}</Text> */}
        <Text style={[ExternalStyles.reletiprodgram, styles1.blackcolr]}>₹ {item?.productObj?.attributesArr[0]?.price}</Text>
        <Pressable onPress={() => navigate.navigate('ProductDetails', { subscription: true, productStockId: item?._id })}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={['#F03893', '#F7A149']}
            style={[ExternalStyles.addproduc, ExternalStyles.mttop5]}>
            <Text style={[ExternalStyles.addproductbtn]}>Subscribe</Text>
          </LinearGradient>
        </Pressable>
      </View>
    );
  };

  const rendersubscriptionProducts = ({ item, index }) => {
    return (
      <View style={[styles.cartItemContainer, styles.flexRowBetween]}>
        <View>
          <Text style={{ color: "black", fontWeight: "600" }}>{item?.productObj?.name}</Text>
        </View>
        <Text style={{ color: "black", fontWeight: "600" }}>Qty: {item?.productObj?.quantity}</Text>
      </View>
    )
  }


  return (
    <ScrollView>

      <Header stackHeader={true} screenName={"My Subcriprtion"} rootProps={props} />


      <View style={{ backgroundColor: "white" }}>

        <View style={[ExternalStyles.rowflex1, ExternalStyles.pdlr]}>
          <Text style={{ fontSize: 20, color: '#000', fontWeight: '600' }}>Status</Text>
          <View style={[ExternalStyles.bgcolrprice, ExternalStyles.dflx, ExternalStyles.mttop10]}>
            <Image source={require('../../assets/img/wallet_img.png')} style={{ marginRight: 10 }} />
            <Text style={ExternalStyles.textwhite1}> ₹{useWalletAmount.toFixed(2)} </Text>
          </View>
        </View>
        <View style={ExternalStyles.pdlr}>
          <View style={[ExternalStyles.datebox, ExternalStyles.mttop10]}>
            {/* <View style={ExternalStyles.datehder}>
              <Ionicons name={'chevron-back-outline'} size={31} color={'#000'} style={ExternalStyles.icondate} />
              <Text style={ExternalStyles.icondate}>{moment(selectedDate?.dateString).format('MMMM')}  {moment(selectedDate?.dateString).format('YYYY')}</Text>
              <Ionicons name={'chevron-forward-sharp'} size={31} color={'#000'} style={ExternalStyles.icondate} />
            </View> */}

            <FlatList style={ExternalStyles.mttop10}
              contentContainerStyle={{}}
              data={daysArr}
              horizontal
              renderItem={subcriprtiondate}
              keyExtractor={(item, index) => `${index}`}
            />

            <View style={[ExternalStyles.centerlfex, ExternalStyles.mttop10]}>
              <View style={ExternalStyles.boxpadgsubsy}><View style={{ width: 20, marginTop: 10, height: 2, backgroundColor: "green" }} ></View><Text style={{ color: "black" }}> vacations</Text></View>
              <View style={ExternalStyles.boxpadgsubsy}><View style={{ width: 20, marginTop: 10, height: 2, backgroundColor: "#FFCD41" }} ></View><Text style={{ color: "black" }}> Pending</Text></View>
              <View style={ExternalStyles.boxpadgsubsy}><View style={{ width: 20, marginTop: 10, height: 2, backgroundColor: "red" }} ></View><Text style={{ color: "black" }}> Vacations</Text></View>
            </View>

          </View>
        </View>
        <View style={[ExternalStyles.pdlr, { paddingBottom: 15 }]}>
          <View style={[ExternalStyles.datebox, ExternalStyles.mttop10]}>

            <Text style={{ color: "black", fontWeight: "600", fontSize: 12, textAlign: "center" }}>Following Item will be Deliver to you on {selectedDate?.date} {moment(selectedDate?.dateString).format('MMMM').substring(0, 3)}  {moment(selectedDate?.dateString).format('YYYY')}</Text>

            <FlatList
              data={selectedDate.subscriptionsArr}
              keyExtractor={(item, index) => `${index}`}
              renderItem={rendersubscriptionProducts}
            />


            <View style={[styles.flexRowBetween, { display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }]}>

              {/* <View style={[styles.flexRow, { alignItems: "center", marginTop: 30 }]}>
                <Text style={{ color: "#F36970" }}>+2 more items
                </Text>
                <AntDesign name={'down'} size={12} color={'#F36970'} />
              </View> */}
              <Pressable style={[styles.buttonStyle, { marginTop: 25, width: wp(35) }]} onPress={() => navigate.navigate('Subscription')}>
                <LinearGradient style={[styles.linearGradientButton]} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} >
                  <Text style={styles.buttonText}>Add Subscription</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={ExternalStyles.reletivprod}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#000',
              marginBottom: 15,
            }}>
            You Might Also Like
          </Text>
          <FlatList
            style={ExternalStyles.mttop10}
            contentContainerStyle={{}}
            data={productsArr}
            horizontal
            renderItem={subcriprtiondate2}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({

  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexRowBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cartItemContainer: {
    padding: 15,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10
  },
  buttonStyle: { marginVertical: 10 },
  linearGradientButton: { padding: 10, borderRadius: 10, display: "flex", alignItems: 'center', justifyContent: "center" },
  buttonText: { color: "white", fontWeight: "500" },
})






const styles1 = StyleSheet.create({
  datesubcirption: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: wp(32),
    marginRight: 6,
  },
  proheight: {
    minHeight: 70,
    textAlign: 'center',
    alignSelf: 'center',
  },
  responsivproduct: {
    width: wp(25),
    height: hp(8),

    textAlign: 'center',
    alignSelf: 'center',
  },
  blackcolr: {
    color: '#000'
  }
});
