import { FlatList, Image, ImageBackground, TouchableOpacity,Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useEffect, useState } from 'react'
import styles from '../stylecomponents/Style'
import DatePicker from 'react-native-date-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../ReusableComponents/Header';
import { addVacationApi, updateVacationApi } from '../services/Vacation.service';
import { toastError } from '../utils/toastError';
import { getAuth } from '../utils/auth';
export default function Editvacation(props) {
    const navigate = useNavigation()

    const [vacationObj, setvacationObj] = useState("");
    useEffect(() => {
        if (props.route.params.vacation) {
            setvacationObj(props.route.params.vacation);
        }
      }, [props.route.params.vacation])

      useEffect(() => {
        if (vacationObj) {
            setStartDate(new Date(vacationObj.startDate));
            setEndDate(new Date(vacationObj.endDate));
            setVacationId(vacationObj?._id)
        }
      }, [vacationObj])
    const [startDate, setStartDate] = useState(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
    const [endDate, setEndDate] = useState(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1));
    const [startModal, setStartModal] = useState(false);
    const [date, setDate] = useState("start");
    const [title, setTitle] = useState("");
        const [user, setUser] = useState("");
        const [vacationId, setVacationId] = useState("");
    const authCheck = async () => {
        let tokenObj = await getAuth();
        console.log(tokenObj,"tokenObjtokenObj")
        if (tokenObj) {
            setUser(tokenObj.user);
        } 
      };
    const addVacation = async () => {
        try {

            // if(title == ""){
            //     toastError("Please Fill Title")
            //     return 0;
            // }
            let  obj = {
                startDate,endDate
            }
            console.log(obj,"objobjobjobjobjobjobjobj")
            let {data:res} = await updateVacationApi(vacationId,obj);
            if(res.success){
                toastError(res.message)
                setTimeout(() => {
                    navigate.navigate("Addvacationdate")
            }, 2000);

            }
        } catch (error) {
                 toastError(error)
                console.error(error)
        }
    }
    useEffect(() => {
        authCheck();
      }, []);

    return (
        <>
            <Header stackHeader={true} screenName={"Vacation"} rootProps={props} />

            <View style={[styles.bgbodyapp, styles.pdlr]}>
                <View style={[styles.vactiondatarea, styles.mttop10]}>
                    <View style={[styles.rowflex1, styles.bgcolorwhite, styles.dateinputbox]}>
                        <Text>Start Date</Text>
                        <Pressable style={[styles1.btnpopup]} onPress={() => {
                            setDate("start")
                            setStartModal(true)}
                            
                            } ><Text style={[styles.colorblck, styles.fontw6]}>{new Date(startDate).toDateString()}     <Entypo name={'chevron-right'} size={20} color={'#000'} /></Text>
                    
                         </Pressable>
                        
                    </View>
                    <View style={[styles.rowflex1, styles.bgcolorwhite, styles.dateinputbox, styles.mttop10]}>
                        <Text>End Date</Text>
                        <Pressable style={[styles1.btnpopup]} onPress={() => {
                            setDate("end")
                            setStartModal(true)}
                            
                            } ><Text style={[styles.colorblck, styles.fontw6]}>{new Date(endDate).toDateString()}      <Entypo name={'chevron-right'} size={20} color={'#000'} /></Text>
                    
                         </Pressable>
                    </View>
                    {/* <View style={[styles.bgcolorwhite, styles.dateinputbox, styles.mttop10]}>
                     <Text style={{ margin: 2}}>Title</Text>
                    <TextInput style={styles1.inputbg}  value={title}   onChangeText={newText => setTitle(newText)} />
                    </View> */}
                </View>
            </View>
            <View style={styles.vacatftrfixed}>
                <Text style={[styles.textcenter, styles.fontw6, styles.colorblck,]}>{new Date(startDate).toDateString()} - {new Date(endDate).toDateString()}</Text>
                <Pressable onPress={() => addVacation()}>
                    <Text style={[styles.btncontun, styles.textcenter, styles.txtconti, styles.fontw6]}>Edit Vacation</Text>
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={startModal}
                onRequestClose={() => {
                    setStartModal(!startModal);
                }}>
                <View style={styles1.centeredView}>
                    <View style={styles1.modalView}>
                        <Pressable style={[styles1.button, styles1.buttonClose]} onPress={() => setStartModal(!startModal)} >
                            <Text style={styles1.closebtn}>   <AntDesign name='close' size={20} color='#6E1C2C' /></Text>
                        </Pressable>
                        <Text style={{fontWeight:'600', color:'#000', fontSize:15}}>Service Category</Text>
                        {
                            date == 'start' ? (    <DatePicker  mode="date"  date={startDate}  open={true}    onDateChange={(date) => {
                                setStartDate(date)
                                }}
                             />) :( <DatePicker  mode="date"  date={endDate}  open={true}    onDateChange={(date) => {
                                setEndDate(date)
                                }}
                             />)
                        }
                            
                          

                        <Pressable style={[styles.bgcolorprimary, styles.mttop10, styles1.btnpadingvr]} onPress={() => setStartModal(!startModal)} >
                            <Text style={[styles.textwhitecolor, styles.textcenter, { fontSize: 15, fontWeight: '600' }]}>Submit</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
        </>
    )
}

const styles1 = StyleSheet.create({
   
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        position: 'relative',
    },
    modalView: {
        width: wp(90),
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    inputborder: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 4,
        height: 40,
        paddingHorizontal: 10,
    },
    closebtn: {
        position: 'absolute',
        top: -25,
        right: -10,
    },
    dflexrow: {
        display: 'flex',
        flexDirection: 'row',
    },
    btnpadingvr: {
        paddingVertical: 12,
    },
    borderselect:{
        borderWidth: 1,
        borderColor: '#CBD5E1',
        height:40,
        marginTop:-9,
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    inputbg: {
        backgroundColor: '#F3F3F3',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 7,
        width:wp(80)
      },
})