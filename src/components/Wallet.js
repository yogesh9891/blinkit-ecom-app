import { FlatList, Image, Button, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../stylecomponents/Style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import { getAuth } from '../utils/auth';
import { addAmountToWallet, addAmountToWalletCallback, getUserWalletApi } from '../services/wallet.service';
import { toastError } from '../utils/toastError';
import RazorpayCheckout from 'react-native-razorpay';

export default function Wallet(props) {
    const navigation = useNavigation()
    const [user, setUser] = useState("");
    const [useWalletAmount, setuseWalletAmount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [transactionArr, setTransactionArr] = useState([]);
    const [displytransactionArr, setdisplyTransactionArr] = useState([]);

    const authCheck = async () => {
        let tokenObj = await getAuth();

        console.log(tokenObj, "tokenObjtokenObj")
        if (tokenObj) {
            setUser(tokenObj.user);
        }
    };
    const handleUserWallet = async (userId) => {
        try {
            let { data: res } = await getUserWalletApi(userId);
            if (res.data) {

                console.log(res.data, "transactionArrtransactionArrtransactionArr")
                setuseWalletAmount(res.data?.walletAmount)
                if (res.data.transactionHistoryArr && res.data.transactionHistoryArr?.length >= 0) {
                    setTransactionArr(res.data.transactionHistoryArr)
                    setdisplyTransactionArr(res.data.transactionHistoryArr)
                }
            }
        } catch (error) {
            toastError(error);
        }
    }

    const handleFilterTransction = (type) => {
        let tempTrans = [...transactionArr]
        if (type != 'All') {
            tempTrans = tempTrans.filter(el => el.transactionType == type);
        }

        setdisplyTransactionArr([...tempTrans])
    }

    const handleBookNow = async () => {
        if(!amount  && amount <=0){
            toastError("Please Add Amount")
            return 0;
        }

        try {
            if (user) {
                let obj = {
                    amount
                }
                let { data: res } = await addAmountToWallet(user?._id, obj);

                console.log(res, "resresresresres")
                if (res.success) {
                    handleRedirect(res.data, res.transactionHistoryId);
                    // alert(res.message)
                }
            } else { navigation.navigate('Login'); }

        } catch (err) {
            if (err.response.data.message) {
                console.error(err.response.data.message);
                alert(err.response.data.message);
            } else {
                alert(err); console.error(err);
            }
        }
    };
    const handleRedirect = async (obj, orderId) => {
        try {
            console.log(JSON.stringify(obj, null, 2));
            console.log(JSON.stringify(obj, null, 2), 'object');
            let tempObj = obj;
            let OrderId = orderId;
            var options = {
                description: 'Order',
                image: 'https:i.imgur.com/3g7nmJC.png',
                currency: tempObj.currency,
                key: 'rzp_test_jOl57g4TNamtFW',
                amount: tempObj.amount,
                name: 'Wallet',
                order_id: tempObj.id,
                //   Replace this with an order_id created using Orders API.
                theme: {
                    color: '#F84B4B'
                },
            };
            RazorpayCheckout.open(options).then(async data => {
                //  handle success
                let Obj = {
                    ...data,
                    amount: tempObj.amount,
                };
                await handlePaymentCallBack(Obj, OrderId);
            }).catch(error => {
                //  handle failure console.error(error);

                if (error?.error?.description) {
                    console.log(error, "  console.log( error);  console.log( error);");
                    alert(error?.error?.description, "saddfsfdfsd");
                } else {
                    alert(`Error: ${error.code} | ${error.description}`);
                }
            });
        } catch (error) {
            console.error(error, "jhgjgkkjhjkljhkljk;ljk;lk;lk;lkl;k;");
        }
    };
    const handlePaymentCallBack = async (obj, id) => {
        try {
            const serialize = function (obj) {
                var str = [];
                for (var p in obj)
                    if (obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                return str.join('&');
            };
            let {
                data: res,
                status: statusCode
            } = await addAmountToWalletCallback(id, serialize(obj));
            if (statusCode == 200 || statusCode == 304) {
                props.navigation.goBack();
                let obj = {
                    amount: res.data?.amount,
                    paymentId: res.data?.paymentObj?.gatwayPaymentObj?.id
                }
                props.navigation.navigate("Walletsuccessful", { payment: obj })

            }
        } catch (error) {
            //console.error(error);
        }
    };

    useEffect(() => {
        authCheck();
    }, []);

    useEffect(() => {
        if (user) {
            handleUserWallet(user?._id);
        }
    }, [user]);

    const restransactionHistory = ({ item, index }) => {
        return (

            <View style={[styles.rowflex1, styles1.bgwhitehist, styles.mttop10]}>
                <View>
                    <Text style={styles1.textedin}>{new Date(item.createdAt).toDateString()}</Text>
                    <Text style={styles1.onlintext}>{item.message}</Text>
                </View>
                {
                    item.transactionType == 'Credit' ? (
                        <Text style={[styles1.teminf]}>+ ₹ {item.amount}</Text>
                    ) : (<Text style={[styles1.teminf, { color: '#FF0000' }]}>- ₹ {item.amount}</Text>)
                }
            </View>
        );
    };


    return (

        <>
            <Header stackHeaderAtTop={true} searchBar screenName={"Wallet"} rootProps={props} />


            <ScrollView>

                <View style={styles1.prclas}>
                    <Image style={{ width: wp(100) }} source={require('../../assets/img/walletimg.png')} />
                </View>
                <View style={[styles.pdlr, styles.bgcolorwhite]}>
                    <View style={[styles1.haderwallt, styles.rowflex1, styles.mbbotom10]}>
                        <Image style={{ width: wp(12), height: hp(6) }} source={require('../../assets/img/walletimgbig.png')} />
                        <View style={styles1.righttext}>
                            <Text style={styles1.textcolor}>₹{useWalletAmount}</Text>
                            <Text style={styles1.smalltext}>Your Balance</Text>
                        </View>
                    </View>
                    <View style={styles.rowflex1}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>Add Money to Fasto Cash</Text>
                        <Button title="History" onPress={() => this.RBSheet.open()} />
                        <RBSheet ref={ref => { this.RBSheet = ref; }}
                            height={580} openDuration={250} customStyles={{ container: { paddingHorizontal: 15, backgroundColor: '#EDF0FF', paddingVertical: 15, borderTopEndRadius: 20, borderTopLeftRadius: 20, } }}>
                            <View style={styles.rowflex1}>
                                <Pressable onPress={() => handleFilterTransction('All')}>
                                    <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={[styles1.tbnsubsrion, styles1.btnwithd]}>
                                        <Text style={styles.textsubcript}>All</Text>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable onPress={() => handleFilterTransction('Credit')} >
                                    <Text style={[styles1.btnhosty, styles1.btnwithd]}>Credit</Text>
                                </Pressable>
                                <Pressable onPress={() => handleFilterTransction('Debit')}>
                                    <Text style={[styles1.btnhosty, styles1.btnwithd]}>Debits</Text>
                                </Pressable>
                            </View>


                            <FlatList
                                contentContainerStyle={{}}
                                data={displytransactionArr}
                                renderItem={restransactionHistory}
                                keyExtractor={(item, index) => `${index}`}
                            />

                        </RBSheet>












                    </View>
                    <View style={styles1.bgamoutnbox}>
                        <TextInput style={styles1.inputbox} placeholder="Enter amount" value={`${amount}`} onChangeText={(val) => setAmount(val)} />


                        <View style={styles1.aumontseh}>
                            <Pressable onPress={() => setAmount(100)}><Text style={styles1.priceamout}>₹100</Text></Pressable>
                            <Pressable onPress={() => setAmount(300)}><Text style={styles1.priceamout}>₹300</Text></Pressable>
                            <Pressable onPress={() => setAmount(600)}><Text style={styles1.priceamout}>₹600</Text></Pressable>
                        </View>

                        <Pressable onPress={() => navigation.navigate("PaymentOption")}>
                            <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles1.wipesbtn}>
                                <Pressable onPress={() => handleBookNow()}><Text style={styles1.btnfontwipes}>Add Amount</Text></Pressable>
                            </LinearGradient>
                        </Pressable>
                    </View>

                    <View style={[styles.mttop20, styles1.bggray]}>
                        <View style={styles1.centerimg}>
                            <Image style={{ width: wp(45), height: hp(28) }} source={require('../../assets/img/moment1.png')} />
                            <Text style={styles1.texthow}>How It Works</Text>
                        </View>

                        <View style={styles.mttop20}>
                            <View style={styles1.rowflexleft}>
                                <Text style={styles1.numbox}>1</Text>
                                <Text style={styles1.desciptopn}>Fasto Cash is a wallet service offered by the Company to its customers, which can be used for purchase of Products until expiry.</Text>
                            </View>

                            <View style={styles1.rowflexleft}>
                                <Text style={styles1.numbox}>2</Text>
                                <Text style={styles1.desciptopn}>Fasto Cash is valid for 12 months from the date of issue unless specified a validity period. Fasto Cash is not refundable.</Text>
                            </View>
                            <View style={styles1.rowflexleft}>
                                <Text style={styles1.numbox}>3</Text>
                                <Text style={styles1.desciptopn}>Fasto Cash can be used in such cities where issuing Company is operating and shall be subject to Platform Terms of Use and applicable laws.</Text>
                            </View>
                            <View style={styles1.rowflexleft}>
                                <Text style={styles1.numbox}>4</Text>
                                <Text style={styles1.desciptopn}>You can purchase Fasto Cash using any available payment methods. You can also redeem Vouchers to add Fasto Cash into your wallet.</Text>
                            </View>
                            <View style={styles1.rowflexleft}>
                                <Text style={styles1.numbox}>5</Text>
                                <Text style={styles1.desciptopn}>Fasto Cash will be auto-applied on the checkout page when a purchase made with the issuing Company.</Text>
                            </View>

                            <View style={styles1.rowflexleft}>
                                <Text style={styles1.numbox}>6</Text>
                                <Text style={styles1.desciptopn}>For any further questions/queries, the Customer may reach out to support@fasto.com.</Text>
                            </View>

                        </View>
                    </View>


                </View>
            </ScrollView>
        </>
    )
}


const styles1 = StyleSheet.create({
    searheader: {
        padding: 15,
        backgroundColor: '#3740AA',
    },
    searinput: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    srchinput: {
        width: wp(80)
    },
    topslid: {
        paddingHorizontal: 10,
    },
    proheight: {
        marginHorizontal: 5,
        textAlign: 'center',
        alignSelf: 'center',
    },
    prclas: {
        position: 'relative',

    },
    haderwallt: {
        backgroundColor: '#EDF0FF',
        padding: 16,
        marginTop: -60,
        borderRadius: 8,
    },
    righttext: {
        textAlign: 'right',
        alignSelf: 'flex-end'

    },
    textcolor: {
        color: '#000863',
        fontWeight: '600',
        textAlign: 'right',
        fontSize: 19
    },
    smalltext: {
        color: '#000863',
        fontWeight: '500',
        textAlign: 'right',
        fontSize: 13
    },
    bgamoutnbox: {
        backgroundColor: '#EDF0FF',
        padding: 10,
        paddingVertical: 20,
        marginTop: 20,
        borderRadius: 10,
    },
    inputbox:{
        backgroundColor:'#fff',
        borderRadius:8,
        paddingHorizontal:10,
        color:'#000',
    },
    aumontseh: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: 19,
    },
    priceamout: {
        backgroundColor: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 16,
        borderRadius: 10,
        width: wp(26),
        fontWeight: '600',
        textAlign: 'center',
        alignSelf: 'center',
        color: '#000',
    },
    wipesbtn: {
        padding: 10,
        marginTop: 22,
        borderRadius: 5,
    },
    btnfontwipes: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    bggray: {
        backgroundColor: '#EDF0FF',
        padding: 10,
        paddingVertical: 20,
        marginTop: 20,
        borderRadius: 10,
    },
    centerimg: {
        textAlign: 'center',
        alignSelf: 'center',


    },
    texthow: {
        fontSize: 18,
        color: '#000',
        fontWeight: '500',
        marginTop: 20,
    },
    rowflexleft: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    numbox: {
        marginRight: 12,
        backgroundColor: '#F1D9F1',
        color: '#AD00FF',
        borderRadius: 4,
        width: 20,
        height: 20,
        textAlign: 'center',
    },
    desciptopn: {
        fontSize: 11,
        color: '#000000',
        width: wp(75)
    },
    btnwithd: {
        width: wp(26)
    },
    btnhosty: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        textAlign: 'center',
        borderRadius: 20,
        color: '#000',
        fontWeight: '600'
    },
    tbnsubsrion: {
        padding: 10,
        textAlign: 'center',
        borderRadius: 20,
    },
    bgwhitehist: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    textedin: {
        fontWeight: '600',
        color: '#000',
        fontSize: 14,
    },
    teminf: {
        fontSize: 12,
        fontWeight: '600',
        color: '#43D100',
        backgroundColor: '#E5EFF0',
        paddingHorizontal: 18,
        borderRadius: 100,
        paddingVertical: 8,
    },
    onlintext: {
        fontSize: 11,

    }
})