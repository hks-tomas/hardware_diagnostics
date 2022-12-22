import React, {FunctionComponent, useState} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";

//custom components
import {Container} from "./shared";
import {colors} from "./colors";
import {StyleSheet, View,Text } from "react-native";


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


const Navbar = ({dashUnderline,hardUnderline,systUnderline}: Props) => {
    
    return(
    <View>
        <Text style={styles.titleText}>Hardware Diagnostics</Text>
        <TopSection>
        <Text style={[dashUnderline ? styles.baseTextSelected : styles.baseText ]} >Dashboard</Text>
        <Text style={[hardUnderline ? styles.baseTextSelected : styles.baseText ]}>Hardware</Text>
        <Text style={[systUnderline ? styles.baseTextSelected : styles.baseText ]}>System</Text>
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