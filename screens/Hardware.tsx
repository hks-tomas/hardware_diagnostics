import React, {FunctionComponent} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";

//custom components
import {Container} from "../components/shared";
import {colors} from "../components/colors";
import {StyleSheet, View,Text } from "react-native";
import Navbar from "../components/Navbar";
import { getDeviceType } from "react-native-device-info";


const HardwareContainer = styled(Container)`
background-color: ${colors.secondary};
justify-content: space-between;
width: 100%;
height: 100%;
`;

const MainContainer = styled(Container)`
background-color: ${colors.secondary};
justify-content: space-between;
width: 100%;
height: 100%;
`;





const Hardware: FunctionComponent = () => {

  //const deviceType = getDeviceType()
  //<Text style={styles.placeholder}>Device Manufacturer: {deviceType}</Text>

  return(
        <>
        <StatusBar style="light"/>
        <HardwareContainer>
          <Navbar systUnderline={false} hardUnderline={true} dashUnderline={false}/>
          <MainContainer>
          <Text style={styles.placeholder}>THIS IS A PLACEHOLDER</Text>
        </MainContainer>
        
        </HardwareContainer>
        </>
    );
};

const styles = StyleSheet.create({
  placeholder:{
  fontSize: 20,
  textDecorationLine: 'underline',
  },
})


export default Hardware;