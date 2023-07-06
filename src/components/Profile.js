import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../ReusableComponents/Header';
import { getAuth, storeAuthData } from '../utils/auth';
import { getuserbyIdApi, userUpdateApi } from '../services/user.service';
import { toastError, toastSuccess } from '../utils/toastError';

export default function Profile(props) {

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, settoken] = useState("");
  const authCheck = async () => {
    let tokenObj = await getAuth();

    console.log(JSON.stringify(tokenObj, null, 2),"tokenObjtokenObj")
    if (tokenObj) {
        setUser(tokenObj.user);
        settoken(tokenObj)
        if(tokenObj.user?.name){
          setName(tokenObj.user?.name)
        }
        if(tokenObj.user?.email){
          setEmail(tokenObj.user?.email)
        }
     
    } 
  };

  const getUser = async () => {
    try {
        let {data:res} = await getuserbyIdApi(user?._id);
        if(res.data){
        console.log(token,"asd",JSON.stringify(res.data, null, 2),"toktoktok")
          let tempToken = {...token}

          tempToken.user.name = res.data.name
          tempToken.user.email = res.data.email
    await storeAuthData(tempToken)

        setUser(res.data);
        console.log(tok,"toktoktok")

        }
    } catch (error) {
       console.log(error)

    }
  }
const handleUpdate =  async () => {

  try {

    if(`${name}` == ""){
      toastError("Please Fill Name")
      return 0
    }

    if(`${email}` == ""){
      toastError("Please Fill Email")
      return 0
    }

    let obj = {
      name,email
    }
    let {data:res} = await userUpdateApi(user?._id,obj)
    if(res.message){
      await  getUser();
      toastSuccess(res.message)
    }
  } catch (error) {
    console.log(error)
  }
}
  useEffect(() => {
    authCheck();
  }, []);


  return (
    <>
      <Header stackHeader={true} screenName={"Profile"} rootProps={props} />

      <View style={[styles.profibody, styles.pdlr]}>
        <View style={[styles.inputgroup, styles.mttop5]}>
          <Text style={styles.inputlabel}>Name</Text>
          <TextInput style={styles.profiinput} value={name} placeholder="Name"onChangeText={(val)=>setName(val)} />
        </View>
        <View style={[styles.inputgroup]}>
          <Text style={styles.inputlabel}>Email Address</Text>
          <TextInput style={styles.profiinput} value={email} placeholder="Email Address" onChangeText={(val)=>setEmail(val)} />
        </View>

        <View style={styles.btncontun}>
         <Pressable onPress={()=>handleUpdate()}><Text style={[styles.textcenter, styles.txtconti]}>Continue</Text></Pressable>
        </View>


      </View>



    </>

  )
}