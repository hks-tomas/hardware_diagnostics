import React, {useEffect,FunctionComponent, useState} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import * as Battery from 'expo-battery';
//custom components
import {Container} from "../components/shared";
import {colors} from "../components/colors";
import {StyleSheet, View,Text } from "react-native";
import Navbar from "../components/Navbar";
import expoSensors from 'expo-sensors'




const Hardware: FunctionComponent = () => {
  const [batteryState,setBatteryState] = useState("Unplugged");
  const [batteryLowPowerMode,setBatteryLowPowerMode] = useState(false);
  const [batteryLevel,setBatteryLevel] = useState("0");
  const [isAcceleratorAvailable,SetAcceleratorAvailable] = useState("Checking");

  const twenty_seconds = 20000;
  

  useEffect(()=>{
    powerState()
    setInterval(function(){powerState()},twenty_seconds);
    checkAcceleratorAvailable()
  })

  const checkAcceleratorAvailable = async() => {
    try {
      let available = await expoSensors.Accelerometer.isAvailableAsync();
    SetAcceleratorAvailable(String(available))
    } catch (error) {
      console.log(error)
    }
    
  }
  

  const powerState = async () => {
    let battery = await Battery.getPowerStateAsync();
    let batteryState : any = battery.batteryState;
    let batteryLowPowerMode : boolean = battery.lowPowerMode;
    
    batteryLevelFunction();
    setBatteryLowPowerMode(batteryLowPowerMode);
    getState()
    return batteryState;
  }

  const batteryLevelFunction = async() =>
    { 
      let battery = await Battery.getBatteryLevelAsync()
      battery = Math.round(battery * 100) / 100
      let stringBattery = battery.toString()  
      let formatedString = stringBattery.split('.')
      setBatteryLevel("%" +formatedString[1]);
      
    };

  enum BatteryStateEnum {
    Unknown = "Unknown" ,
    Unplugged = "Unplugged",
    Charging = "Charging",
    Full = "Full"
  }

  let batterystateNumber = powerState();

  const getState = async () => {
    let result;
    switch (await batterystateNumber) {
      
        case 1:
          result = BatteryStateEnum.Unplugged
        break;
        case 2:
          result = BatteryStateEnum.Charging
        break;
        case 3:
          result = BatteryStateEnum.Full
        break;
      
      default:
        result = BatteryStateEnum.Unknown
        break;
    }
    setBatteryState(result)
  }
  

  return(
        <>
        <StatusBar style="light"/>
        <HardwareContainer>
          <Navbar systUnderline={false} hardUnderline={true} dashUnderline={false}/>
          <MainContainer >
          <View style={styles.batterySection}>
          <Text style={styles.title}>BATTERY:</Text>
          <Text style={styles.placeholder}>Battery Level: {batteryLevel}</Text>
          <Text style={styles.placeholder}>Battery Low Power Mode on: {batteryLowPowerMode ? "True":"False"}</Text>
          <Text style={styles.placeholder}>Battery State: {batteryState}</Text>
          </View>
          <View style={styles.batterySection}>
          <Text style={styles.title}>Accelerometer:</Text>

          
          </View>
          </MainContainer>
        
        </HardwareContainer>
        </>
    );
};

const HardwareContainer = styled(Container)`
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

const styles = StyleSheet.create({
  batterySection:{
    justifyContent:"center",
    margin:20,
    backgroundColor:colors.blueSky,
  },
  placeholder:{
  padding:5,
  fontSize: 20,
  
  
  },
  title:{
    textAlign:"center",
    fontSize:28,
    textDecorationLine: 'underline',
  },
})


export default Hardware;