import React, {FunctionComponent} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";

//custom components
import {Container} from "../components/shared";
import {colors} from "../components/colors";
import { StyleSheet, Text, View } from 'react-native';
import Navbar from "../components/Navbar";
import * as Device from 'expo-device';


const System: FunctionComponent = () => {
  
  const test = Device.osBuildId;
  const DeviceOs = Device.osName;
  const apiLevel = Device.platformApiLevel;
  const cpuArquitectures = Device.supportedCpuArchitectures;
    return(
        <>
        <StatusBar style="light"/>
        <SystemContainer>
          <Navbar systUnderline={true} hardUnderline={false} dashUnderline={false}/>
          <MainContainer>
          <View style={styles.operatingSystemSection}>
            <Text style={styles.title}>Operating System Info:</Text>
            <Text>Operating System of the device: {test}</Text>
            <Text>Operating System of the device: {DeviceOs}</Text>
            <Text>Operating System of the device: {apiLevel}</Text>
            <Text>Operating System of the device: {cpuArquitectures}</Text>
          </View>
          </MainContainer>
          
        </SystemContainer>
        </>
    );
};

const styles = StyleSheet.create({
  operatingSystemSection:{
    margin:30,
    backgroundColor:colors.red,
    top:80
  },
  placeholder:{
  padding:15,
  fontSize: 20,
  
  },
  title:{
    textAlign:"center",
    fontSize:28,
    textDecorationLine: 'underline',
  },
})

const SystemContainer = styled(Container)`
background-color: ${colors.secondary};
justify-content: space-between;
width: 100%;
height: 100%;
`;

const MainContainer = styled(Container)`
background-color: ${colors.primary};
justify-content: space-between;
width: 100%;
height: 100%;
bottom: 5%;
`;


export default System;