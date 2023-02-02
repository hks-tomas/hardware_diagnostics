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
  const buildId = Device.osBuildId;
  const DeviceOs = Device.osName;
  const cpuArquitectures = Device.supportedCpuArchitectures;
  const totalMemory = Device.totalMemory;

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

  const ReturnTotalMemoryGB = () => {
    let totalMemoryGB = "";
    let totalMemoryGBArray: string[] = []
    if (totalMemory !== null){
       totalMemoryGB = String(totalMemory * 1e-9);
       totalMemoryGBArray = totalMemoryGB.split('.');
       totalMemoryGB = totalMemoryGBArray[0] + '.' + totalMemoryGBArray[1].charAt(0) + " Gygabytes"
     } 
    else{
       totalMemoryGB = "unknown"
    }
    return totalMemoryGB;
  }

   
   

  
    return(
        <>
        <StatusBar style="light"/>
        <SystemContainer>
          <Navbar systUnderline={true} hardUnderline={false} dashUnderline={false}/>
          <MainContainer>
          <View style={styles.operatingSystemSection}>
            <Text style={styles.title}>Operating System Info:</Text>
            <Text style={styles.placeholder}>Operating System of the device: {DeviceOs}</Text>
            <Text style={styles.placeholder}>Operating System BuildID: {buildId}</Text>
            <Text style={styles.placeholder}>Supported CPU arquitectures of the device: {cpuArquitectures}</Text>
            <Text style={styles.placeholder}>Operating System Up Time (in minutes): {upTime}</Text>
            <Text style={styles.placeholder}>Total memory of the device (in Gigabytes): {ReturnTotalMemoryGB()}</Text>

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