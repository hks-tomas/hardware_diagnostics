import React, {useState,FunctionComponent,useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";

//custom components
import {Container} from "../components/shared";
import {colors} from "../components/colors";
import { StyleSheet, Text, View } from 'react-native';
import Navbar from "../components/Navbar";
import * as Device from 'expo-device';



const System: FunctionComponent = () => {
  const [upTime, setUpTime] = useState("0");
  const test = Device.osBuildId;
  const DeviceOs = Device.osName;
  const apiLevel = Device.platformApiLevel;
  const cpuArquitectures = Device.supportedCpuArchitectures;

  useEffect(()=>{
    getDeviceUpTime()
  })

  const getDeviceUpTime = async() => {
    let time = await Device.getUptimeAsync()
    let minutesString = (String(time * 1.66667e-5))
    let minutesArray = minutesString.split(".")
    let minutes : any = minutesArray[0]
    setUpTime(minutes);
    
  }

   

  
    return(
        <>
        <StatusBar style="light"/>
        <SystemContainer>
          <Navbar systUnderline={true} hardUnderline={false} dashUnderline={false}/>
          <MainContainer>
          <View style={styles.operatingSystemSection}>
            <Text style={styles.title}>Operating System Info:</Text>
            <Text style={styles.placeholder}>Operating System of the device: {test}</Text>
            <Text style={styles.placeholder}>Operating System of the device: {DeviceOs}</Text>
            <Text style={styles.placeholder}>Operating System of the device: {apiLevel}</Text>
            <Text style={styles.placeholder}>Operating System of the device: {cpuArquitectures}</Text>
            <Text style={styles.placeholder}>Operating System Up Time (in minutes): {upTime}</Text>
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