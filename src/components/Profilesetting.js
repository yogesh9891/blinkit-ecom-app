import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../stylecomponents/Style'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../ReusableComponents/Header';
import { getUserWalletApi } from '../services/wallet.service';
import { getAuth, logoutUser } from '../utils/auth';
import { TokenContext } from '../../App';

export default function Profilesetting(props) {
  const [isAuthorised, setIsAuthorised] = useContext(TokenContext);

    const navigation = useNavigation()
    const [user, setUser] = useState("");
    const [useWalletAmount, setuseWalletAmount] = useState(0);

    const authCheck = async () => {
        let tokenObj = await getAuth();

        console.log(tokenObj,"tokenObjtokenObj")
        if (tokenObj) {
            setUser(tokenObj.user);
        } 
      };
    const handleUserWallet = async (userId) => {
        try {
            let {data:res} =  await getUserWalletApi(userId,'transaction=true');
            if(res.data){
                setuseWalletAmount(res.data?.walletAmount)
            }
        } catch (error) {
            toastError(error);
        }
    }
    

    const handleLogOut = async () => {
        await logoutUser()
        setIsAuthorised(false)
        navigation.navigate("SingIn");
    }

    useEffect(() => {
        authCheck();
      }, []);

      useEffect(() => {
        if(user){
            handleUserWallet(user?._id);
        }
      }, [user]);
    return (
        <>
            <ScrollView>
                <Header stackHeader={true} screenName="Profile Settings" rootProps={props} />

                <View style={[styles.pdlr]}>
                    <View style={[styles.wallethedr, styles.mttop10]}>
                        <View style={[styles.walletp, styles.rowflex1, styles.pdlr5]}>
                            <Text style={styles.blacktext}><Image source={require('../../assets/img/wallet_img.png')} />  Wallet</Text>
                            <Text style={styles.blacktext}><FontAwesome name={'inr'} size={16} color={'#000'} /> {useWalletAmount}</Text>
                        </View>

                        <Pressable onPress={()=> navigation.navigate("Wallet")} style={[styles.rowflex1, styles.pdlr5]}>
                            <Text style={styles.textblue}>Top Up Your Wallet</Text>
                            <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.addbtn}>
                                <Text style={[styles.btntext,]}>Add Amount</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>

                    <Pressable onPress={() => navigation.navigate('Profile')}>
                        <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                            <View style={styles.dflexone}>
                                <FontAwesome name={'user-circle-o'} size={22} color={'#2E6D92'} style={styles.mr2} />
                                <Text style={styles.setingtext}>Profile</Text>
                            </View>
                            <Text>
                                <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Mysubcriprtion')}>
                        <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                            <View style={styles.dflexone}>
                                <FontAwesome name={'calendar'} size={22} color={'#62AC66'} style={styles.mr2} />
                                <Text style={styles.setingtext}>Subscription Plan</Text>
                            </View>
                            <Text>
                                <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Addvacationdate')}>
                        <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                            <View style={styles.dflexone}>
                                <MaterialCommunityIcons name={'palm-tree'} size={26} color={'#5F314C'} style={styles.mr2} />
                                <Text style={styles.setingtext}>Vacations</Text>
                            </View>
                            <Text>
                                <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Orderprosser')}>
                        <View style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                            <View style={styles.dflexone}>
                                <SimpleLineIcons name={'handbag'} size={25} color={'#B36D46'} style={styles.mr2} />
                                <Text style={styles.setingtext}>Order</Text>
                            </View>
                            <Text>
                                <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Showaddress')} style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                        <View style={styles.dflexone}>
                            <Ionicons name={'location-outline'} size={26} color={'#FF4545'} style={styles.mr2} />
                            <Text style={styles.setingtext}>Addreses</Text>
                        </View>
                        <Text>
                            <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Refunds')}  style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                        <View style={styles.dflexone}>
                            <Ionicons name={'refresh-circle-outline'} size={28} color={'#00A57D'} style={styles.mr2} />
                            <Text style={styles.setingtext}>Refunds</Text>
                        </View>
                        <Text>
                            <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Notifiction')}  style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                        <View style={styles.dflexone}>
                            <FontAwesome name={'bell-o'} size={23} color={'#FE4773'} style={styles.mr2} />
                            <Text style={styles.setingtext}>Notification</Text>
                        </View>
                        <Text>
                            <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Generalinfo')}  style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                        <View style={styles.dflexone}>
                            <AntDesign name={'infocirlceo'} size={23} color={'#6A76B4'} style={styles.mr2} />
                            <Text style={styles.setingtext}>General Info </Text>
                        </View>
                        <Text>
                            <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Managereferrals')}  style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                        <View style={styles.dflexone}>
                            <AntDesign name={'hearto'} size={23} color={'#FF0000'} style={styles.mr2} />
                            <Text style={styles.setingtext}>Manage Referrals</Text>
                        </View>
                        <Text>
                            <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Faq')}  style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                        <View style={styles.dflexone}>
                            <MaterialIcons name={'messenger-outline'} size={23} color={'#000E8D'} style={styles.mr2} />
                            <Text style={styles.setingtext}>Customer Support & FAQ </Text>
                        </View>
                        <Text>
                            <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Showaddress')}  style={[styles.containerrow, styles.shadow, styles.setinrow]}>
                        <View style={styles.dflexone}>
                            <AntDesign name={'star'} size={23} color={'#F99A24'} style={styles.mr2} />
                            <Text style={styles.setingtext}>Rate us on Playstore</Text>
                        </View>
                        <Text>
                            <Entypo name={'chevron-small-right'} size={28} color={'#EB8E24'} />
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=>handleLogOut()} style={[styles.mttop10, styles.mbbotom15]}>
                        <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.logoutbtn}>
                           <Text style={[styles.btnlgt,]}>Log out</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    )
};