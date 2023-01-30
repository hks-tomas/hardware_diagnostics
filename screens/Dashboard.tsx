import React, {FunctionComponent, useEffect,useState} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import * as Device from 'expo-device';
//custom components
import {Container} from "../components/shared";
import {colors} from "../components/colors";
import {StyleSheet, View,Text } from "react-native";
import Navbar from "../components/Navbar";
import * as Brightness from 'expo-brightness';





const Dashboard: FunctionComponent = () => {
  let DeviceManufacturer = Device.manufacturer;
  let DeviceYearClass = Device.deviceYearClass;
  let DeviceModelName = Device.modelName;
  let DeviceBrand = Device.brand;
  
  
  const [mainScreenBrightness,setMainScreenBrightness] = useState("0");

  useEffect(()=>{
    BrightnessLevelFunction()
  })

  const BrightnessLevelFunction = async() => {
      let brightness = await Brightness.getBrightnessAsync()
      if (brightness != 1){
      brightness = Math.round(brightness * 100) / 100
      let stringbrightness = brightness.toString()  
      let formatedString = stringbrightness.split('.')
      if (parseInt(formatedString[1]) >= 10)
      setMainScreenBrightness("%" + formatedString[1]);
      else{
        setMainScreenBrightness("%" + formatedString[1].substring(1));
      }
      }
      else{
        setMainScreenBrightness("%" + 100)
      }
      
  }

    return(
        <>
        <StatusBar style="light"/>
        <DashBoardContainer>
          <Navbar systUnderline={false} hardUnderline={false} dashUnderline={true}/>
          <MainContainer>
          <View style={styles.dashboardSection}>
          <Text style={styles.title}>Quick Info:</Text>
          <Text style={styles.placeholder}>Device Manufacturer: {DeviceManufacturer}</Text>
          <Text style={styles.placeholder}>Device Brand: {DeviceBrand}</Text>
          <Text style={styles.placeholder}>Device Model Name: {DeviceModelName}</Text>
          <Text style={styles.placeholder}>Year class: {DeviceYearClass}</Text>
          <Text style={styles.placeholder}>Main Screen Brightness level: {mainScreenBrightness}</Text>
          </View>
          </MainContainer>
          
        </DashBoardContainer>
        </>
    );
};

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

const styles = StyleSheet.create({
  dashboardSection:{
    justifyContent:"center",
    margin:10,
    backgroundColor:colors.green,
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



export default Dashboard;