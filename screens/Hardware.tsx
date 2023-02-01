import React, {useEffect,FunctionComponent, useState} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import * as Battery from 'expo-battery';
//custom components
import {Container} from "../components/shared";
import {colors} from "../components/colors";
import {StyleSheet, View,Text } from "react-native";
import Navbar from "../components/Navbar";
import { Accelerometer,Barometer,Gyroscope,Magnetometer,LightSensor,Pedometer } from "expo-sensors";


const Hardware: FunctionComponent = () => {
  const [batteryState,setBatteryState] = useState("Unplugged");
  const [batteryLowPowerMode,setBatteryLowPowerMode] = useState(false);
  const [batteryLevel,setBatteryLevel] = useState("0");
  const [isAcceleratorAvailable,setAcceleratorAvailable] = useState("Checking");
  const [isBarometerAvailable,setBarometerAvailable] = useState("Checking");
  const [isGyroscopeAvailable,setGyroscopeAvailable] = useState("Checking");
  const [isMagnetometerAvailable,setMagnetometerAvailable] = useState("Checking");
  const [isLightSensorAvailable,setLightSensorAvailable] = useState("Checking");
  const [isPedometerAvailable,setPedometerAvailable] = useState("Checking");
  const twenty_seconds = 20000;
  

  useEffect(()=>{
    powerState()
    setInterval(function(){powerState()},twenty_seconds);
    checkSensorsAvailable()
  })

  const checkSensorsAvailable = async () => {
    try {
    let accelerometerAvailable = await Accelerometer.isAvailableAsync()
    let barometerAvailable = await Barometer.isAvailableAsync()
    let gyroscopeAvailable = await Gyroscope.isAvailableAsync()
    let lightSensorAvailable = await LightSensor.isAvailableAsync()
    let magnetometerAvailable = await Magnetometer.isAvailableAsync()
    let pedometerAvailable = await Pedometer.isAvailableAsync()
    setAcceleratorAvailable(String(accelerometerAvailable))
    setBarometerAvailable(String(barometerAvailable))
    setGyroscopeAvailable(String(gyroscopeAvailable))
    setLightSensorAvailable(String(lightSensorAvailable))
    setMagnetometerAvailable(String(magnetometerAvailable))
    setPedometerAvailable(String(pedometerAvailable))
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
      if (battery != 1){
      battery = Math.round(battery * 100) / 100
      let stringBattery = battery.toString()  
      let formatedString = stringBattery.split('.')
      if (parseInt(formatedString[1]) >= 10)
      setBatteryLevel("%" +formatedString[1]);
      else{
        setBatteryLevel("%" + formatedString[1].substring(1));
      }
      }
      else{
        setBatteryLevel("%" + 100)
      }
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
          <View style={styles.sensorsSection}>
          <Text style={styles.title}>Sensors:</Text>
          <Text style={styles.placeholder}> {isAcceleratorAvailable ? "The Accelerometer is available":"The Accelerometer is not available"} </Text>
          <Text style={styles.placeholder}> {isBarometerAvailable ? "The Barometer is available":"The Barometer is not available"} </Text>
          <Text style={styles.placeholder}> {isGyroscopeAvailable ? "The Gyroscope is available":"The Gyroscope is not available"} </Text>
          <Text style={styles.placeholder}> {isMagnetometerAvailable ? "The Magnetometer is available":"The Magnetometer is not available"} </Text>
          <Text style={styles.placeholder}> {isLightSensorAvailable ? "The LightSensor is available":"The LightSensor is not available"} </Text>
          <Text style={styles.placeholder}> {isPedometerAvailable ? "The Pedometer is available":"The Pedometer is not available"} </Text>
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
    margin:30,
    backgroundColor:colors.blueSky,
  },
  sensorsSection:{
    bottom:40,
    justifyContent:"center",
    margin:30,
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