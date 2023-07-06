import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import { getAuth } from '../utils/auth';
import RBSheet from "react-native-raw-bottom-sheet";
import { deleteAddressApi, getAddressApi, getUserAddresses, updateAddressApi } from '../services/userAddress.service';
import { toastError, toastSuccess } from '../utils/toastError';
export default function Showaddress(props) {
    const navigation = useNavigation();
    const [addressArr, setAddressArr] = useState([])
    const [userId, setUserId] = useState("")
    const isFocused = useIsFocused();
    
  const [houeno, setHouseNo] = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [pincode, setPincode] = useState("")
    const [addressType, setaddressType] = useState("Home")
    const [addressObj, setAddressObj] = useState("");
    const [addressName, setAddressName] = useState("");
   const [addressId, setAddressId] = useState("");
  const authCheck = async () => {
    let tokenObj = await getAuth();
    if (tokenObj) {
        setUserId(tokenObj.userId);
        console.log(tokenObj.userId,"tokenObjtokenObjtokenObjtokenObjtokenObjtokenObj")
    } else {
        setUserId("false");
    }
  };

  useEffect(() => {
    if(isFocused){
    authCheck();

    }
  }, [isFocused]);

  useEffect(() => {
    if(userId){
      getUserAddress(userId)
    }
  }, [userId]);
      
const editAddress = (row) => {

    navigation.navigate("EditMapAddress",{address:row});
    setAddressObj(row);
    setAddressName(row?.addressName);
    setPincode(row?.pincode)
    setaddressType(row?.addressType)
    
    setHouseNo(row?.addressLine1)
    setAddressLine1(row?.addressLine1)
    setAddressLine2(row?.addressLine2)
    setAddressId(row?._id);
    this.RBSheet.open();

}

const handleUpdateDeafultAddress = async (row) => {
    try {
    
      let obj = {
        defaultAddress:true
      }

      let {data:res} = await updateAddressApi(row?._id,obj);
   
        if (res && res?.success) {
          toastSuccess(res?.message)
          // getUserAddress()
          navigation.navigate("Showaddress")
        }
       return
    
      } catch (error) {
        console.error(error)
        toastError(error)
      }
  }
const handleSaveAddress = async () => {
    try {
      if(`${pincode}` == ""){
        toastError("Please Fill Pincode");
        return
      }
      let obj = {
        addressName,
        houeno,
        addressLine1,
        addressLine2,
        pincode,
        addressType
      }

      let {data:res} = await updateAddressApi(addressId,obj);
   
        if (res && res?.success) {
          toastSuccess(res?.message)
          this.RBSheet.close();
        }
       return
    
      } catch (error) {
        console.error(error)
        toastError(error)
      }
  }
const getUserAddress = async (userIdw) => {

    try {
    console.log(`userId=${userIdw}`,"rowrowrowrowrowrowrowrowrow")

        let { data: res } = await getUserAddresses(`userId=${userIdw}`);
        if (res && res?.success) {

            console.log(res.data,"res.datares.datares.datares.data")
            setAddressArr(res.data)
        }
        return
  
    } catch (error) {
        console.error(error)
        toastError(error)
    }
  }

  const deleteAddress = async (id) => {
    try {
        let { data: res } = await deleteAddressApi(id);
        if (res && res?.success) {
            getUserAddress(userId)
        }
  
    } catch (error) {
        console.error(error)
        toastError(error)
    }
  }
    return (
        <>
            <Header stackHeader={true} screenName={"Address"} rootProps={props} />

      
            <View style={[styles1.bgbodyapppd, styles1.pdlr5]}>
                {
                    addressArr && addressArr.map((address,inde) => 
                        <Pressable onPress={()=>{
                            if(!address.defaultAddress){
                                  handleUpdateDeafultAddress(address)
                            }
                        }} style={[styles.mttop10, styles1.addressbox, styles.rowflex1,address.defaultAddress == true ? styles1.addressactive :styles1.addressinactive]} key={inde}>
                        <Entypo name={'location'} size={20} color={'#FE4773'} />
                        <View style={{ width: wp(55) }}>
                            <Text style={[styles.fontw6, styles.colorblck, styles1.font12, styles.mb5]}>{address.addressType}{address.defaultAddress ==true && (<Text style={{color:'#FE4773',padding:15}}>    Default</Text>)}</Text>
                            <Text style={styles1.txtad}>{address.addressLine1}</Text>
                        </View>
                        <Pressable onPress={() => editAddress(address)}>

                        <FontAwesome name={'edit'} size={20} color={'#A2A2A2'} />
                        </Pressable>
                        <Pressable onPress={() => deleteAddress(address?._id)}>
                             <AntDesign name={'delete'} size={20} color={'#A2A2A2'} />
                        </Pressable>
                    </Pressable>
    
                        )
                }
              <Pressable onPress={() => navigation.navigate("Addressmap")} style={[styles1.btnbotm, { width: '100%', marginTop: 20, }]}>
                {/* <Pressable onPress={() => navigation.navigate("Addressmap")} style={[styles1.btnbotm, { width: '100%', marginTop: 20, }]}> */}
                    <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                        <Text style={styles.textsubcript}>Add New Address </Text>
                    </LinearGradient>
                </Pressable>

                <RBSheet ref={ref => { this.RBSheet = ref; }}
            height={650} openDuration={250} customStyles={{ container: { paddingHorizontal: 25, paddingVertical: 15, borderTopEndRadius: 20, borderTopLeftRadius: 20, } }}>
    
            <View>
             <View style={styles.rowflex1}>
              <Text style={{ color: '#595959', fontWeight: '600' }}>Edit Address</Text>
              <Pressable onPress={() => this.RBSheet.close()} >
              <Text style={{ color: '#EB8E24', fontWeight: '600' }}>  <FontAwesome name={'times'} size={20} color={'#A2A2A2'} /></Text>
              </Pressable>
            </View>
            <View style={[styles.dflx, styles1.fixloctin]}>
              <Entypo name={'location'} size={25} color={'#FE4773'} style={{ marginRight: 10 }} />
              <View style={{ width: wp(70) }}>
                <Text style={{ color: '#fff', fontWeight: '600', marginBottom: 7 }}>{addressName}</Text>
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
            <Text style={[styles.colorblck, styles.fontw6, styles.mttop10, styles.mbbotom10]}> Address Label</Text>
            <View style={styles1.homled}>
              <Pressable onPress={()=>setaddressType("Home")}  style={[`${addressType}` == 'Home' ? styles1.ofinle :styles1.homelabe]}><Text>Home</Text></Pressable>
              <Pressable  onPress={()=>setaddressType("Office")}  style={[`${addressType}` == 'Office' ? styles1.ofinle :styles1.homelabe]}><Text>Office</Text></Pressable>
              <Pressable  onPress={()=>setaddressType("Other")}  style={[`${addressType}` == 'Other' ? styles1.ofinle :styles1.homelabe]}><Text >Other</Text></Pressable>
            </View>
  
            <Pressable onPress={() => {handleSaveAddress()}} style={{ width: '100%', marginTop: 30, }}>
              <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                <Text style={styles.textsubcript}>Update</Text>
              </LinearGradient>
            </Pressable>
            </View>
        
            </RBSheet>
            </View>

        </>
    )
}
const styles1 = StyleSheet.create({

    addressbox: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 6
    },
    addressinactive:{
        backgroundColor: '#fff',
        
    },
    addressactive:{
        backgroundColor: '#d3d3d3',
        
    },
    font12: {
        fontSize: 13,
    },
    txtad: {
        fontSize: 11,
        color: '#A2A2A2',
    },
    pdlr5: {
        paddingHorizontal: 8
    },
    bgbodyapppd: {
        backgroundColor: '#F3F3F3',
        flex: 1
    },
    btnbotm: {
        position: 'absolute',
        bottom: 10,
        left: 5,
        right: 5,

    },
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