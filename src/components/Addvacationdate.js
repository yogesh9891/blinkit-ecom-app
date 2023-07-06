import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { React, Modal, useState, useEffect } from 'react'
import styles from '../stylecomponents/Style'
import { StatusBar } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { deleteVacationApi, getVacationApi } from '../services/Vacation.service';
import { getAuth } from '../utils/auth';
import { toastError, toastSuccess } from '../utils/toastError';
export default function Addvacationdate(props) {
    const focused = useIsFocused()
    const navigate = useNavigation()
    const [user, setUser] = useState("");
    const [userVacations, setUserVacations] = useState([]);
    useEffect(() => {
        authCheck();
    }, []);

    useEffect(() => {
        if (user && focused) {
            handleUserVacation(user?._id);
        }
    }, [user, focused]);

    const authCheck = async () => {
        let tokenObj = await getAuth();

        console.log(tokenObj, "tokenObjtokenObj")
        if (tokenObj) {
            setUser(tokenObj.user);
        }
    };
    const handleUserVacation = async (userId) => {
        try {
            let { data: res } = await getVacationApi(`userId=${userId}`);
            if (res.data) {
                setUserVacations(res.data.map(el => ({ ...el, visible: false })));

            }
        } catch (error) {
            toastError(error);
        }
    }

    const deleteVacation = async (row) => {
        try {
            let { data: res } = await deleteVacationApi(row?._id)
            console.log(res.message,'messagemessagemessagemessagemessagemessage')
            if (res.message) {
                toastSuccess(res.message)
                handleUserVacation(user?._id);
            }
        } catch (error) {
            toastError(error)

        }
    }




    const toggleModal = (id) => {
        let tempArr = userVacations

        let index = tempArr.findIndex(el => el._id == id)
        if (index != -1) {
            tempArr[index].visible = !tempArr[index].visible
        }

        setUserVacations([...tempArr])

    }



    const renderVacations = ({ item, index }) => {
        return (
            <View style={[styles.vactiondatarea, styles.mttop10]}>
                <View style={styles1.daterow}>
                    <View style={styles1.boxdate}>
                        <Text style={styles1.textdate}>Start Date</Text>
                        <Text style={styles1.maindate}>{new Date(item.startDate).toDateString()}</Text>
                    </View>
                    <View style={[styles1.boxdate]}>
                        <Text style={styles1.textdate}>End Date</Text>
                        <Text style={styles1.maindate}>{new Date(item.endDate).toDateString()}</Text>
                    </View>
                    <Pressable onPress={() => toggleModal(item._id)}>
                        <Entypo name={'dots-three-vertical'} size={20} color={'#000'} />
                    </Pressable>
                    {/* 
                    <Pressable onPress={() => deleteVacation(vact)}>
                    <Entypo name={'dots-three-vertical'} size={20} color={'#000'} />
                </Pressable> */}
                    {
                        item.visible &&
                        <View style={styles1.editbox}>
                            <Pressable onPress={() => navigate.navigate('Editvacation', { vacation: item })}>
                                <Text>Edit</Text>
                            </Pressable>
                            <Pressable onPress={() => deleteVacation(item)} style={{marginTop:10}}>
                                <Text>Delete</Text>
                            </Pressable>
                        </View>
                    }
                </View>
            </View>
        )
    }



    return (

        <>
            <Header stackHeader={true} screenName={"Vacation"} rootProps={props} />


            <StatusBar barStyle="white-content" backgroundColor="#3740AA" color="#fff" />

            <View style={[styles.bgbodyapp, styles.pdlr]}>

                <FlatList
                    data={userVacations}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderVacations}
                />

                {/* {
                    userVacations && userVacations.map((vact, inde) => (

                        
                    ))
                } */}

            </View>


            <View style={styles.vacatftrfixed}>
                <Pressable onPress={() => navigate.navigate('Addvacation')}>
                    <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} colors={['#F03893', '#F7A149']} style={styles.tbnsubsrion}>
                        <Text style={[styles.textsubcript]}>Add Vacation</Text>

                    </LinearGradient>
                </Pressable>
            </View>



        </>
    )
}
const styles1 = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    daterow: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxdate: {
        width: wp(38),
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    textdate: {
        color: '#C4C4C4',
        fontWeight: '600',
        fontSize: 13,
    },
    maindate: {
        fontWeight: '400',
        color: '#000000',
        marginTop: 5,

    },
    editbox: {
        width: wp(28),
        marginTop: 15,
        position: 'absolute',
        backgroundColor: '#fff',
        padding: 10,
        right: 15,
        borderRadius: 5,
    }
})