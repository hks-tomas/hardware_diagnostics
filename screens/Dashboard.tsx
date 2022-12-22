import React, {FunctionComponent, useEffect,useState} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as Battery from 'expo-battery';
//custom components
import {Container} from "../components/shared";
import {colors} from "../components/colors";
import {StyleSheet, View,Text } from "react-native";
import Navbar from "../components/Navbar";


const DashBoardContainer = styled(Container)`
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
bottom: 10%;
`;






const Dashboard: FunctionComponent = () => {
  let DeviceManufacturer = Device.manufacturer;
  const [batteryLevel,setBatteryLevel] = useState("0");

  useEffect(()=>{
    batteryLevelFunction()
  })

  const batteryLevelFunction = async() =>
    { 
      let battery = await Battery.getBatteryLevelAsync()
      battery = Math.round(battery * 100) / 100
      let stringBattery = battery.toString()  
      let formatedString = stringBattery.split('.')
      setBatteryLevel("%" +formatedString[1]);
      
    };

    return(
        <>
        <StatusBar style="light"/>
        <DashBoardContainer>
          <Navbar systUnderline={false} hardUnderline={false} dashUnderline={true}/>
          <MainContainer>
          <Text style={styles.placeholder}>Device Manufacturer: {DeviceManufacturer}</Text>
          <Text style={styles.placeholder}>Battery Level: {batteryLevel}</Text>
          
          </MainContainer>
          
        </DashBoardContainer>
        </>
    );
};

const styles = StyleSheet.create({
  placeholder:{
  fontSize: 20,
  textDecorationLine: 'underline',
  },
})


export default Dashboard;