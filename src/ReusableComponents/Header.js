import { View, Text, StyleSheet, TextInput, Pressable, PermissionsAndroid, Alert, BackHandler, Linking } from 'react-native'
import React ,{useEffect,useContext,useState} from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExternalStyles from '../stylecomponents/Style'
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAuth } from '../utils/auth';
import { LocationContext, StoreContext, TokenContext } from '../../App';
import { toastError } from '../utils/toastError';
import { addAddressApi, getAddressFromLocation, getUserAddresses } from '../services/userAddress.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStoreId, storeStore, storeStoreId,storeStoreData} from '../utils/store';
import Geolocation from '@react-native-community/geolocation';
import {generalModelStatuses} from '../utils/constant';
import {findNearStoreApi} from '../services/user.service';
import {getCategoryFromLocal, getCoordinatesFromLocal, saveCoordinatesLocal} from '../utils/localStorage';
import { getAllProductByUser } from '../services/product.service';
export default function Header(props) {
    console.log(props.rootProps.route.name, "pHeaderHarerrops")
    const navigation = useNavigation()
    const isFocused = useIsFocused();
  const [isAuthorised, setIsAuthorised] = useContext(TokenContext);
  const [storeIdContext, setstoreIdContext] = useContext(StoreContext);
const [productArr, setProductArr] = useState([]);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [pageName, setPageName] = useState("");
  const [pincode, setPincode] = useState("");
  const [storeId, setStoreid] = useState('');

  const [geolocationChoords, setGeolocationChoords] = useState({});
  const authCheck = async () => {
    let tokenObj = await getAuth();
    if (tokenObj) {
        setUser(tokenObj.user);
      setIsAuthorised(true);
    } else {
      setIsAuthorised(false);
    }
  };
  const handlelocation = async data => {
    await saveCoordinatesLocal(data);
  };


  const requestPermission = async () => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
          title: 'Location Permission',
          message: 'Fasto App needs access to your camera ' + 'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('getting location');
          Geolocation.getCurrentPosition(
            position => setGeolocationChoords({latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.00922 * 1.5, longitudeDelta: 0.00421 * 1.5}),
            async error => {
              Alert.alert(
                'Alert',
                'Please turn on your location services.If you already did please restart your application.',
                [
                  {
                    text: 'Restart',
                    onPress: () => {
                      BackHandler.exitApp();
                    },
                  },
                  {
                    text: 'Settings',
                    onPress: () => {
                      Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
                    },
                  },
                ],
                {cancelable: false},
              );
            },
          );
        } else {
          alert('Unable to create wall');
          // navigation.navigate('Home');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const temp = await Geolocation.requestAuthorization();
      await Geolocation.getCurrentPosition(position => setGeolocationChoords({latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.00922 * 1.5, longitudeDelta: 0.00421 * 1.5}));
    }
  };



  useEffect(() => {
    if(isFocused){
      requestPermission()
    authCheck();

    }
  }, [isFocused]);
  useEffect(()=> {
    if(geolocationChoords.longitude){

      getLocalStoreId();
    }
  }, [geolocationChoords])

  const getNearStore = async () => {
    let data = await getCoordinatesFromLocal();
    console.log(
      JSON.stringify(data, null, 2),
      'datadatadatadatadatadatadatadata',
    );
    let obj = {
      longitude: data?.longitude,
      latitude: data?.latitude,
    };
      if(!data || !data?.longitude || !data?.latitude){
            obj.longitude = geolocationChoords.longitude;
            obj.latitude = geolocationChoords.latitude;
      }
   
    try {
      let {data: res} = await findNearStoreApi(obj);

      if (res.data) {
        let sstore = res.data;
        storeStoreId(sstore?._id);
        setstoreIdContext(sstore?._id);
        storeStore(sstore);
      } else {
        toastError('No Store Found');
        // navigation.navigate("Addressmap")
      }
    } catch (error) {
      toastError(error);
      console.log(error);
    }
    // if (localStoreid) {
    // } else {
    //   alert('No Store Found');
    //   // navigation.navigate("Addressmap")
    // }
  };

  const getLocalStoreId = async id => {
    try {
      let storeId = await getStoreId()
      console.log(storeId,"storeIdstoreIdstoreId")
      if (!storeId) {
         getNearStore()
      }
      return;
    } catch (error) {
      toastError(error);
    }
  };
  useEffect(() => {
  if(props.rootProps.route.name){
    console.log(props.rootProps.route.name,"props.rootProps.route.name")
    setPageName(props.rootProps.route.name);
  }
  }, [props.rootProps.route.name]);


  const  handleUserAddress = async (userID) => {
        try {
            let query = 'defaultAddress=true';
            if(user){
                query += '&userId='+userID; 
            }
            // let query =  
            let {data:res} = await getUserAddresses(query);
              if (res && res?.success) {
                if(res.data.length > 0){
                console.log(res.data[0],"categuser Addressssssories")
                    setUserAddress(res.data[0])
                } else {
                    console.log(geolocationChoords,"geolocationChoordsgeolocationChoordsgeolocationChoordsgeolocationChoordsgeolocationChoords")
                    await handleAddressFromLocation(geolocationChoords);
                    // if(`${pageName}` !== 'Addressmap' || `${pageName}` !== 'SaveLocation'){
                    // }
                    // return
                }
              }
             return
          
            } catch (error) {
              console.error(error)
              toastError(error)
            }
   
  }

  const handleSaveAddress = async (address) => {
    try {
    
      let {data:res} = await addAddressApi(address);
  
       return
    
      } catch (error) {
        console.error(error)
        toastError(error)
      }
  }
  const handleAddressFromLocation = async (regionObj) => {
    try {
      let {data:res} = await getAddressFromLocation(regionObj);
      console.log(JSON.stringify(res,null,2),"locatiob Addresss check")
      let addressObj = {};
        if (res && res?.success && res.data.results.length > 0) {
          let addresRes = res.data.results[0];
          let postalCode=addresRes.address_components.find(el=>el.types.some(elx=>elx=="postal_code"))
          console.log(postalCode,"POSTAL CHECK")
          if(postalCode){
            addressObj.pincode = postalCode?.long_name;
          }
          addressObj.addressName = addresRes.formatted_address;
          let regionParams = regionObj
           addressObj.location = regionObj;
           addressObj.defaultAddress = true;
           addressObj.addressType = 'Home';

           let AddressArr = addresRes.formatted_address.split(",");
           if(AddressArr && AddressArr.length >=2){
            addressObj.addressLine2 = AddressArr[0] +', '+AddressArr[1];
             AddressArr.shift();
             AddressArr.shift();
             AddressArr.shift();
           }
           
           if(AddressArr && AddressArr.length> 0){
            let test =   AddressArr.join(", ");
              addressObj.addressLine2 = test;
            }
            await handleSaveAddress(addressObj)
        }
       return
    
      } catch (error) {
        console.error(error)
        toastError(error)
      }
  }

  const  handleSearch =  async () => {
    if(!search){
        toastError("Please Enter text")
    } else {
      await handleGetSearchproducts(search);
    }
}
// useEffect(() => {
//     navigation.navigate("ProductList",{productArr:productArr})
//   }, [productArr]);

const handleGetSearchproducts = async (querySearch) => {
    
  let   query = `q=${querySearch}&orderedToId=${storeId}`
   try {
     let { data: res } = await getAllProductByUser(query)
       setProductArr(res.data);
       navigation.navigate("ProductList",{productArr:res.data})
   }
   catch (err) {
     toastError(err)
     console.error(err)
   }
 }

  useEffect(() => {
    if(user && user?._id){
     handleUserAddress(user?._id)
    }
  }, [user]);
 
    return (
        <View style={ExternalStyles.Srchheader}>
            {
                props.addressLine &&

                <View style={[styles.flexRowJustiyBetween, { paddingBottom: 15 }]}>
                    <Pressable style={styles.flexRow} onPress={()=>    navigation.navigate("EditMapAddress",{address:userAddress})}>
                        <Entypo name={'location-pin'} size={20} color={'#FE4773'} />
                        <Text style={[ExternalStyles.textwhite, { fontSize: 12 }]}>{userAddress?.addressName ? userAddress.addressName.substring(0,30) : "No Address" }</Text>
                       <View  >
                           <AntDesign name={'caretright'} size={10} color={'#fff'} />
                       </View>
                    </Pressable>
                    <View style={[styles.flexRowJustiyBetween, { width: wp(25) }]}>
                        <Pressable onPress={() => navigation.navigate("ProductNotifiction")}>
                            <AntDesign name={'bells'} size={18} color={'#fff'} />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("Cart")}>
                            <AntDesign name={'shoppingcart'} size={20} color={'#fff'} />
                        </Pressable>
                        {/* <Pressable onPress={() => navigation.navigate("Wallet")}>
                        <Entypo name={'wallet'} size={20} color={'#fff'} />
                        </Pressable> */}
                        <Pressable onPress={() => navigation.navigate("Profilesetting")}>
                            <EvilIcons name={'user'} size={24} color={'#fff'} />
                        </Pressable>
                    </View>
                </View>
            }
            {
                props.stackHeaderAtTop &&
                <View style={ExternalStyles.topheader}>
                    <Text style={ExternalStyles.textwhite}>{props.screenName}</Text>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name={'close'} size={20} color={'#fff'} />
                    </Pressable>
                </View>
            }
            {
                props.searchBar &&
                <View style={[ExternalStyles.srchinput, {marginTop:10}]}>
                    <AntDesign name={'search1'} onPress={()=>{handleSearch()}}  size={20} color={'#D9D9D9'} style={ExternalStyles.mr2} />
                    <TextInput style={ExternalStyles.srchtxtinpit} placeholderTextColor="#D9D9D9" placeholder='What are you looking for (e.g. mango, onion)' onChangeText={text =>setSearch(text)} />
                </View>
            }
            {
                props.stackHeader &&
                <View style={ExternalStyles.topheader}>
                    <Text style={ExternalStyles.textwhite}>{props.screenName}</Text>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name={'close'} size={18} color={'#fff'} />
                    </Pressable>
                </View>
            }


        </View>
    )
}
const styles = StyleSheet.create({
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    flexRowJustiyBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

})