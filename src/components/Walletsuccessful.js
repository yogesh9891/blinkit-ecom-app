import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../stylecomponents/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Header from '../ReusableComponents/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Walletsuccessful(props) {


  const [paymentObj, setpaymentObj] = useState("");
    useEffect(() => {
    if (props.route.params.payment) {
      setpaymentObj(props.route.params.payment);
    }
  }, [props.route.params.payment])
  return (
    <>
      <Header stackHeader={true} screenName={'Wallet'} rootProps={props} />
      <ScrollView>
        <View style={styles1.heaidnsuccesful}>
          <Image style={{marginBottom: 30, width:wp(55), height:hp(35),textAlign: 'center', alignSelf: 'center',}} source={require('../../assets/img/saveimgadd.png')} resizeMode='contain'/>
          <Text style={styles1.heaidnmain}>Recharge Successful</Text>
          <Text style={styles1.normalheding}>
            We look forward to serve you soon.
          </Text>
        </View>
        <View style={[styles1.boxcol, styles1.botmimg]}>
          <Text style={[styles1.heaidnmain, {textAlign: 'center'}]}>
            Transaction Summary
          </Text>
          <View style={[styles.rowflex1, styles.mttop10]}>
            <Text style={{color: '#212529', fontSize: 12}}>Transaction ID</Text>
            <Text style={{color: '#212529', fontSize: 12, fontWeight: '600'}}>
              {paymentObj?.paymentId}
            </Text>
          </View>
          <View style={[styles.rowflex1, styles.mttop10]}>
            <Text style={{color: '#212529', fontSize: 12}}>
              Recharge Amount
            </Text>
            <Text style={{color: '#212529', fontSize: 12, fontWeight: '600'}}>
              ₹ {paymentObj?.amount}

            </Text>
          </View>
            <Image style={{position:"absolute", bottom:0, left:0, width:wp(100), height:hp(3) }} source={require('../../assets/img/bgimgbootom.png')} />
          {/* <View style={}> */}
          {/* </View> */}
        </View>
        <View style={[styles.pdlr, {textAlign:'center', alignSelf:'center', marginBottom:20}]}>
        <Image style={{width:wp(90), height:hp(23)}} source={require('../../assets/img/ref-img1.png')} />
        </View>
      </ScrollView>
    </>
  );
}
const styles1 = StyleSheet.create({
  heaidnsuccesful: {
    minHeight: 450,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heaidnmain: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  normalheding: {
    fontSize: 13,
    color: '#000',
    marginTop: 5,
  },
  boxcol: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 15,
    paddingVertical: 40,
    width:wp(100),
    position: 'relative',
    marginBottom: 20,
  },
  botmimg: {
    position: 'relative',
    
  },
});
