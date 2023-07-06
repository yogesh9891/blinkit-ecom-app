import {FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../stylecomponents/Style';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {verifyOtpApi} from '../services/user.service';
import {toastError, toastSuccess} from '../utils/toastError';
import {loginUser} from '../utils/auth';
import {TokenContext} from '../../App';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Otpverification(props) {
  const [isAuthorised, setIsAuthorised] = useContext(TokenContext);

  const navigate = useNavigation();
  const [mobileNum, setMobileNum] = useState('');
  const [code, setcode] = useState('');
  if (!props.route.params?.mobile) {
    navigate.navigate('/SingIn');
    return;
  }
  useEffect(() => {
    if (props.route.params?.mobile) {
      setMobileNum(props.route.params?.mobile);
    }
  }, [props.route.params?.mobile]);

  const verifyOtp = async () => {
    //test otp
    // alert("asd")
    console.log(props.route.params?.mobile, 'dfuhffhasdfjdhj');

    // let testOtp = mobileNum.substring(0, 6);
    // setcode(testOtp);
    if (`${code}` == '') {
      toastError('Please Enter Otp');
      return;
    }
    try {
      let obj = {
        phone: mobileNum,
        otp: code,
      };

      // VerfyOtp  Api

      let res = await verifyOtpApi(obj);
      console.log(res?.data, 'otpResponse');
      let otpResponse = res.data;

      if (otpResponse && otpResponse.status == true) {
        // After VerfyOtp  Api  Login Api
        let loginStatus = await loginUser(obj);
        if (loginStatus) {
          toastSuccess(otpResponse.msg);
          setIsAuthorised(true);

          navigate.navigate('AuthorisedStack');
        } else {
          toastError('Please Resend Otp');
        }
      } else {
        toastError(otpResponse.msg);
      }
    } catch (error) {
      toastError('Please Try Again');
    }
    return;
  };

  const resendOtp = async () => {
    if (`${mobileNum}` == '' || `${mobileNum}`?.length != 10) {
      //   toastError("Please Enter Valid Mobile Number")
      return;
    }
    try {
      let obj = {
        phone: mobileNum,
      };
      let res = await sendOtpApi(obj);
      console.log(res?.data, 'otpResponse');
      let otpResponse = res.data;

      if (otpResponse && otpResponse.status == true) {
        toastSuccess(otpResponse.msg);
        return;
      } else {
        toastError(otpResponse.msg);
      }
    } catch (error) {
      toastError('Please Try Again');
    }
    return;
  };

  return (
    <>
      <StatusBar barStyle="white-content" backgroundColor="#3740AA" color="#fff" />
      <View style={[styles.bgbodycolor, styles.flexbodycolorone, styles.prletive]}>
        <Image source={require('../../assets/img/login-bg-img.png')} style={styles.imglogcentr} />
        <View style={styles.logoabsl}>{/* <Image source={require('../../assets/img/logo.png')}  style={styles.logocenter}/> */}</View>
        <View style={[styles.pdlr, styles.otpsection]}>
          <Text style={styles.texttop}> OTP </Text>
          <Text style={styles.texttop}> Verification </Text>
          <Text style={styles.textwhite}>OTP has been sent to +91 {mobileNum ?? ''}</Text>
          <Text style={{textAlign: 'right', color: '#fff', fontWeight: '600', marginTop: 25, marginBottom: 10}}>02:30</Text>
          <View style={internalStyles.containerForTextInput}>
            <OTPInputView
              style={{height: 70, zIndex: 1500, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
              pinCount={6}
              autoFocusOnLoad={false}
              editable
              codeInputHighlightStyle={internalStyles.highlightedStyles}
              codeInputFieldStyle={internalStyles.input}
              onCodeFilled={code => {
                setcode(code);
                console.log(code);
              }}
            />
          </View>

          <Pressable onPress={() => verifyOtp()}>
            <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}} colors={['#F03893', '#F7A149']} style={[styles.subbtn, styles.mttop10]}>
              <Text style={[styles.textwhite, styles.textcenter]}>Continue</Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={() => resendOtp()}>
            <View style={styles.mttop10}>
              <Text style={[styles.textcenter, styles.textwhite]}>Didn’t get it?</Text>
              <Text style={[styles.textcenter, (style = {color: '#C4C4C4', marginTop: 12, fontWeight: '600'})]}>Send OTP again</Text>
            </View>
          </Pressable>
        </View>
        <Image source={require('../../assets/img/footerimg.png')} style={styles.ftrimgabslot} />
      </View>
    </>
  );
}
const internalStyles = StyleSheet.create({
  containerForTextInput: {
    width: wp(92),
  },
  input: {
    zIndex: 1500,
  },
  highlightedStyles: {},
});
