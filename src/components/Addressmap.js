// import { FlatList, Image, Button, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
// import React, { Component } from 'react'

import styles from '../stylecomponents/Style';
// import AntDesign from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';
// import RBSheet from "react-native-raw-bottom-sheet";
// import Header from '../ReusableComponents/Header';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Alert, Pressable, BackHandler, Linking, AppState} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Button} from 'react-native-paper';
import Header from '../ReusableComponents/Header';
import {toastError} from '../utils/toastError';
import {getAddressFromLocation} from '../services/userAddress.service';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Addressmap(props) {
  const navigation = useNavigation();

  const focused = useIsFocused();
  const [regionObj, setRegionObj] = useState({});
  const [newregionObj, setNewRegionObj] = useState({});
  const [addressName, setAddressName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [location, setlocation] = useState('');
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (appState.current.match(/inactive|background/) && nextAppState == 'active') {
  //       requestPermission();
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  const handleAddressFromLocation = async regionObj => {
    try {
      let {data: res} = await getAddressFromLocation(regionObj);
      console.log(JSON.stringify(res, null, 2), 'locatiob Addresss check');
      if (res && res?.success && res.data.results.length > 0) {
        let addresRes = res.data.results[0];

        let postalCode = addresRes.address_components.find(el => el.types.some(elx => elx == 'postal_code'));
        console.log(postalCode, 'POSTAL CHECK');
        if (postalCode) {
          setpostalCode(postalCode?.long_name);
        }
        setAddress(addresRes.formatted_address);
        let regionParams = regionObj;
        // regionParams.googleAddress = addresRes;
        // regionParams.addressName = addresRes.formatted_address;
        setAddressName(addresRes.formatted_addres);
        await AsyncStorage.setItem('Current-Location', JSON.stringify(regionObj));
        setlocation(addresRes?.geometry?.location);
        setNewRegionObj(regionParams);
        console.log(
          JSON.stringify(addresRes, null, 2),

          '=====================================================',
        );
      }
      return;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  useEffect(() => {
    if (regionObj.longitude && regionObj.latitude) {
      handleAddressFromLocation(regionObj);
    }
  }, [regionObj]);

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
            position => setRegionObj({latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.00922 * 1.5, longitudeDelta: 0.00421 * 1.5}),
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
      await Geolocation.getCurrentPosition(position => setRegionObj({latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.00922 * 1.5, longitudeDelta: 0.00421 * 1.5}));
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('HANDLING SUBMIT', props.route.params);

      let regionParams = regionObj;
      regionParams.addressName = address;
      navigation.navigate('SaveLocation', {addressResponse: {name: address, obj: regionParams, postal_code: postalCode, location: location}});
      // let {data: res} = await Addwall({...tempWallData, locationObj: {coordinates: [regionObj.latitude, regionObj.longitude]}});
      // if (res) {
      //   for (let el of tempImagesArr) {
      //     let formdata = new FormData();
      //     formdata.append('file', {uri: el.image.uri, name: el.image.fileName, type: el.image.type});
      //     let {response: data} = await updateWallImage(res.wallId, formdata);
      //     // setIsLoader(true);
      //     navigation.navigate('Home');
      //   }
      // }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (focused) requestPermission();
  }, [focused]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Header stackHeader={true} screenName={'Address'} rootProps={props} />
      {/* <Image source={require('../Assets/image/m.png')} style={{ width: '100%', height: hp(65) }} /> */}
      {regionObj && regionObj?.latitude && (
        <MapView style={{width: wp(100), height: hp(70)}} region={regionObj}>
          <Marker
            key={regionObj}
            draggable
            coordinate={regionObj}
            onDragEnd={e => {
              setRegionObj({latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, latitudeDelta: 0.00922 * 1.5, longitudeDelta: 0.00421 * 1.5});
            }}
            title={'You are here'}
            // description={"Hello ooo"}
          />
        </MapView>
      )}

      <View style={{paddingHorizontal: 15}}>
        <Text style={[styles1.area, {textAlign: 'center', paddingLeft: 25, marginBottom: 10, paddingTop: 10}]}>Click and drag to select your location</Text>
        {
          // address  && (
          //   <View>
          //     <Text style={[styles.fontw6, styles.colorblck, { marginBottom: 10 }]}>{address}</Text>
          //     {/* <Text style={{ marginBottom: 10 }}>408, Netaji Subhash Place, Pitam Pura, New Delhi, Delhi 110034, India</Text> */}

          //     <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
          //       <TouchableOpacity onPress={() => handleSubmit()}>
          //         <Text style={[styles.textsubcript]}>Confirm & Continue</Text>
          //       </TouchableOpacity>
          //     </LinearGradient>
          //   </View>
          // )
          <View>
            <Text style={[styles.fontw6, styles.colorblck, {marginBottom: 10}]}>{address}</Text>
            {/* <Text style={{ marginBottom: 10 }}>408, Netaji Subhash Place, Pitam Pura, New Delhi, Delhi 110034, India</Text> */}

            <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text style={[styles.textsubcript]}>Confirm & Continue</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        }
      </View>
    </SafeAreaView>
  );
}
const styles1 = StyleSheet.create({
  title: {
    textAlign: 'center',
    width: '95%',
    fontSize: 18,
    color: '#000',
    fontFamily: 'OpenSansCondensed-Light',
    textTransform: 'uppercase',
  },
  area: {
    fontSize: 17,
    color: '#2bd4e6',
    fontFamily: 'OpenSansCondensed-Light',
    marginRight: hp(1),
    // textTransform: 'uppercase',
  },
  location: {
    fontFamily: 'OpenSansCondensed-Light',
    textTransform: 'uppercase',
    fontSize: 15,
    color: '#000',
  },
  linear: {
    marginTop: hp(2.5),
    marginBottom: hp(1),
    borderRadius: 7,
  },
  linearTxt: {
    paddingVertical: hp(2.4),
    fontSize: 20,
    fontFamily: 'OpenSansCondensed-Light',
    textTransform: 'uppercase',
    color: '#000',
    textAlign: 'center',
  },
  map: {
    width: hp(70),
    height: '100%',
  },
});

// const navigate = useNavigation()
// return (
//   <>
//     <Header stackHeader={true} screenName={"Address"} rootProps={props} />

//     <View>
//       <Image source={require('../../assets/img/newmap.png')} style={styles1.mapflex} />

//     </View>
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", zIndex: 99999 }}>
//       <Button title="Search Loaction" onPress={() => this.RBSheet.open()} style={styles.btnvisble} />
//       <RBSheet ref={ref => { this.RBSheet = ref; }}
//         height={200} openDuration={250} customStyles={{ container: { paddingHorizontal: 25, paddingVertical: 35, borderTopEndRadius: 20, borderTopLeftRadius: 20, } }}>

//         <Text style={[styles.fontw6, styles.colorblck, styles1.fntsi13, styles.mbbotom10]}>Netaji Subhash Place</Text>
//         <Text style={styles.colorblck}>408, Netaji Subhash Place, Pitam Pura, New Delhi, Delhi 110034, India</Text>

//         <Pressable onPress={() => navigate.navigate('SaveLocation')} style={{ width: '100%', marginTop: 30, }}>
//           <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
//             <Text style={styles.textsubcript}>Confirm & Continue</Text>
//           </LinearGradient>
//         </Pressable>

//       </RBSheet>

//     </View>

//   </>
// )
// }

// const styles1 = StyleSheet.create({
//   mapflex: {
//     zIndex: 1,
//     position: 'absolute'
//   },
//   btnvisble: {
//     zIndex: 999,
//   },
//   fntsi13: {
//     fontSize: 13
//   }
// })
