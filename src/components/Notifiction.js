import { FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../stylecomponents/Style'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-paper';
import Header from '../ReusableComponents/Header';

export default function Notifiction(props) {

    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const [isSwitchOn1, setIsSwitchOn1] = useState(false);
    const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);


    const [isSwitchOn2, setIsSwitchOn2] = useState(true);
    const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);

    const [isSwitchOn3, setIsSwitchOn3] = useState(false);
    const onToggleSwitch3 = () => setIsSwitchOn3(!isSwitchOn3);

    return (
        <>
            <Header stackHeader={true} screenName={"Notification"} rootProps={props} />

            <View style={styles1.redundbody}>
                <Pressable style={styles1.prebtnbox}>
                    <Text style={styles1.usreprtext}>Price Alerts</Text>
                    <Switch trackColor={{ true: '#EB8E24', false: '#ACA9C9' }} thumbColor='#FFF' value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Pressable>

                <Pressable style={styles1.prebtnbox}>
                    <Text style={styles1.usreprtext}>Discount Alerts</Text>
                    <Switch trackColor={{ true: '#EB8E24', false: '#ACA9C9' }} thumbColor='#FFF' value={isSwitchOn1} onValueChange={onToggleSwitch1} />
                </Pressable>
                <Pressable style={styles1.prebtnbox}>
                    <Text style={styles1.usreprtext}>Referral Reward Alerts</Text>
                    <Switch trackColor={{ true: '#EB8E24', false: '#ACA9C9' }} thumbColor='#FFF' value={isSwitchOn2} onValueChange={onToggleSwitch2} />
                </Pressable>
                <Pressable style={styles1.prebtnbox}>
                    <Text style={styles1.usreprtext}>Whats App Messages</Text>
                    <Switch trackColor={{ true: '#EB8E24', false: '#ACA9C9' }} thumbColor='#FFF' value={isSwitchOn3} onValueChange={onToggleSwitch3} />
                </Pressable>
            </View>

        </>
    )
}

const styles1 = StyleSheet.create({
    redundbody: {
        backgroundColor: '#F3F3F3',
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    prebtnbox: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 12,
        justifyContent: 'space-between',
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    usreprtext: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
    }
})