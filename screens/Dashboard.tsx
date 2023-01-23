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
import * as Brightness from 'expo-brightness';


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
bottom: 5%;
`;


const Dashboard: FunctionComponent = () => {
  let DeviceManufacturer = Device.manufacturer;
  let DeviceYearClass = Device.deviceYearClass;
  let DeviceModelName = Device.modelName;
  let DeviceBrand = Device.brand;
  
  const [batteryLevel,setBatteryLevel] = useState("0");
  const [mainScreenBrightness,setMainScreenBrightness] = useState("0");

  useEffect(()=>{
    batteryLevelFunction()
    BrightnessLevelFunction()
  })

  const BrightnessLevelFunction = async() => {
    let brightness = await Brightness.getBrightnessAsync()
      brightness = Math.round(brightness * 100) / 100
      let stringbrightness = brightness.toString()  
      let formatedString = stringbrightness.split('.')
      setMainScreenBrightness("%" +formatedString[1]);
  }

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
          <Text style={styles.placeholder}>Device Brand: {DeviceBrand}</Text>
          <Text style={styles.placeholder}>Device Model Name: {DeviceModelName}</Text>
          <Text style={styles.placeholder}>Year class: {DeviceYearClass}</Text>
          <Text style={styles.placeholder}>Battery Level: {batteryLevel}</Text>
          <Text style={styles.placeholder}>Main Screen Brightness level: {mainScreenBrightness}</Text>
          
          
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