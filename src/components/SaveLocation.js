import { FlatList, Image, Button, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput,View } from 'react-native'
import React, { useEffect,Component,useState } from 'react'

import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import Header from '../ReusableComponents/Header';
import { toastError, toastSuccess } from '../utils/toastError';
import { addAddressApi } from '../services/userAddress.service';
import { updateAddressApi } from '../services/userAddress.service';

export default function SaveLocation(props) {
  const navigate = useNavigation()

  const [houeno, setHouseNo] = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [pincode, setPincode] = useState("")
  const [location,setLocation] = useState({})
  const [locationObj, setLocationObj] = useState("");
const [addressRes, setaddressRes] = useState("")
const [addressName, setaddressName] = useState("")
const [addressType, setaddressType] = useState("Home")
const [addressId, setAddressId] = useState("");
  useEffect(() => {
    console.log(props.route.params,"CHECK")
    setaddressRes({});

    if (props?.route?.params?.addressResponse?.name && props?.route?.params?.addressResponse?.name!="") {


      setaddressRes(props.route.params?.addressResponse.obj);
      setaddressName(props.route.params?.addressResponse.name);
      setPincode(props.route.params?.addressResponse.postal_code); 
      setLocationObj(props.route.params?.addressResponse.location); 
      if(props.route.params?.addressResponse?.addressId && props.route.params?.addressResponse?.addressId != ""){
        setAddressId(props.route.params?.addressResponse?.addressId)
      }
      let address = props.route.params?.addressResponse;
        let AddressArr = props.route.params?.addressResponse.name.split(",");
      console.log(AddressArr,"latitudelatitudelatitudelatitudelatitude")
      if(AddressArr && AddressArr.length >=2){
        setHouseNo(AddressArr[0]);
        setAddressLine1(AddressArr[1] +', '+AddressArr[2]);
        AddressArr.shift();
        AddressArr.shift();
        AddressArr.shift();
      }
      
      if(AddressArr && AddressArr.length> 0){
      let test =   AddressArr.join(", ");
      setAddressLine2(test);
      }
    }
    this.RBSheet.open();
  }, [props.route.params?.addressResponse])
  
  useEffect(() => {
    if (locationObj) {

      console.log(locationObj,"locationObjlocationObjlocationObj")
      let location = {
        longitude:locationObj.lng,
        latitude:locationObj.lat
      }
       setLocation(location)
    }
  }, [locationObj])

  const handleSaveAddress = async () => {
    try {
      if(`${pincode}` == ""){
        toastError("Please Fill Pincode");
        return
      }
      let obj = {
        location,
        addressName,
        houeno,
        addressLine1,
        addressLine2,
        pincode,
      }

    if(addressId && addressId !=""){
      let {data:res} = await updateAddressApi(addressId,obj);
      if (res && res?.success) {
        toastSuccess(res?.message)
        navigate.navigate("Savenewaddress")
      }
     return
    } else {
      let {data:res} = await addAddressApi(obj);
      if (res && res?.success) {
        toastSuccess(res?.message)
        navigate.navigate("Savenewaddress")
      }
     return
    }
    
    
    
    
      } catch (error) {
        console.error(error)
        toastError(error)
      }
  }
  return (
    <>
      <Header stackHeader={true} screenName={"Address"} rootProps={props} />


      <View>
        {/* <Image source={require('../../assets/img/newmap.png')} style={styles1.mapflex} /> */}

      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", zIndex: 99999 }}>
        {/* <Button title="Search Loaction" onPress={() => this.RBSheet.open()} style={styles.btnvisble} /> */}
       
            <RBSheet ref={ref => { this.RBSheet = ref; }}
            height={650} openDuration={250} customStyles={{ container: { paddingHorizontal: 25, paddingVertical: 15, borderTopEndRadius: 20, borderTopLeftRadius: 20, } }}>
    
            <View>
             <View style={styles.rowflex1}>
              <Text style={{ color: '#595959', fontWeight: '600' }}>Saved Location</Text>
              <Pressable onPress={() => navigate.navigate('Addressmap')} >
              <Text style={{ color: '#EB8E24', fontWeight: '600' }}>Change</Text>
              </Pressable>
            </View>
            <View style={[styles.dflx, styles1.fixloctin]}>
              <Entypo name={'location'} size={25} color={'#FE4773'} style={{ marginRight: 10 }} />
              <View style={{ width: wp(70) }}>
                <Text style={{ color: '#fff', fontWeight: '600', marginBottom: 7 }}>{addressName}</Text>
                {/* <Text style={{ color: '#fff', fontWeight: '400', fontSize: 11, }}>{addressRes?.addressName}</Text> */}
              </View>
            </View>
            <View style={[styles1.formgropu, styles.mttop10]}>
              <Text style={styles1.label}>House No. & Floor*</Text>
              <TextInput style={styles1.inputbg}  value={houeno}   onChangeText={newText => setHouseNo(newText)} />
            </View>
            <View style={[styles1.formgropu, styles.mttop10]}>
              <Text style={styles1.label}>Building & Block No.*</Text>
              <TextInput style={styles1.inputbg} value={addressLine1}   onChangeText={newText => setAddressLine1(newText)}   />
            </View>
            <View style={[styles1.formgropu, styles.mttop10]}>
              <Text style={styles1.label}>Area Name</Text>
              <TextInput style={styles1.inputbg}  value={addressLine2}   onChangeText={newText => setAddressLine2(newText)}    />
            </View>
            <View style={[styles1.formgropu, styles.mttop10]}>
              <Text style={styles1.label}>Pincode</Text>
              <TextInput style={styles1.inputbg}   value={pincode}   onChangeText={newText => setPincode(newText)}  />
            </View>
            <Text style={[styles.colorblck, styles.fontw6, styles.mttop10, styles.mbbotom10]}>Add Address Label</Text>
            <View style={styles1.homled}>
              <Pressable onPress={()=>setaddressType("Home")}  style={[`${addressType}` == 'Home' ? styles1.ofinle :styles1.homelabe]}><Text>Home</Text></Pressable>
              <Pressable  onPress={()=>setaddressType("Office")}  style={[`${addressType}` == 'Office' ? styles1.ofinle :styles1.homelabe]}><Text>Office</Text></Pressable>
              <Pressable  onPress={()=>setaddressType("Other")}  style={[`${addressType}` == 'Other' ? styles1.ofinle :styles1.homelabe]}><Text >Other</Text></Pressable>
            </View>
  
            <Pressable onPress={() => {handleSaveAddress()}} style={{ width: '100%', marginTop: 30, }}>
              <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                <Text style={styles.textsubcript}>Confirm & Continue</Text>
              </LinearGradient>
            </Pressable>
            </View>
        
            </RBSheet>
     
      </View>

    </>
  )
}

const styles1 = StyleSheet.create({
  mapflex: {
    zIndex: 1,
    position: 'absolute'
  },
  btnvisble: {
    zIndex: 999,
  },
  fntsi13: {
    fontSize: 13
  },
  fixloctin: {
    backgroundColor: '#00607E',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  inputbg: {
    backgroundColor: '#F3F3F3',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  label: {
    color: '#667080',
    marginBottom: 10,
  },
  homled: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ofinle: {
    backgroundColor: '#EB8E24',
    borderRadius: 10,
    textAlign: 'center',
    padding: 15,
    color: '#ffff',
    marginHorizontal: 12,
    flex:1

  },
  homelabe: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    textAlign: 'center',
    padding: 15,
    flex:1,
  }
})