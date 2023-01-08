import React, {FunctionComponent, useState} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import Hardware from '../screens/Hardware';
import System from '../screens/System';

//custom components
import {Container} from "./shared";
import {colors} from "./colors";
import {StyleSheet, View,Text } from "react-native";

//Typescript interface

interface Props{
    dashUnderline: boolean;
    hardUnderline: boolean;
    systUnderline: boolean;
    
}








const TopSection = styled(View)`
width: 100%;
flex: 1;
top:15%;
max-height:30%;
background-color: ${colors.gray};
justify-content:center;
flex-direction:row;

`;


const Navbar = ({dashUnderline,hardUnderline,systUnderline}: Props ) => {
  
  const navigation:any = useNavigation()
    return(
    <View>
        <Text style={styles.titleText}>Hardware Diagnostics</Text>
        <TopSection>
        <Text onPress={() => navigation.navigate('Dashboard', {
        screen: 'Feed',
        params: { sort: 'latest' },
})} style={[dashUnderline ? styles.baseTextSelected : styles.baseText ]} >Dashboard</Text>
        <Text onPress={() => navigation.navigate('Hardware', {
        screen: 'Feed',
        params: { sort: 'latest' },
})} style={[hardUnderline ? styles.baseTextSelected : styles.baseText ]}>Hardware</Text>
        <Text onPress={() => navigation.navigate('System', {
        screen: 'Feed',
        params: { sort: 'latest' },
})} style={[systUnderline ? styles.baseTextSelected : styles.baseText ]}>System</Text>
        </TopSection>
    </View>
    );

}

const styles = StyleSheet.create({
    baseText: {
      fontSize: 20,
      margin: 30,
      
    },

    baseTextSelected:{
        fontSize: 20,
        margin: 30,
        color:colors.red,
        textDecorationLine: 'underline',
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold",
      color:colors.primary,
      top:50,
      textAlign:"center"
    }
  });

export default Navbar;