import React, {FunctionComponent} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";

//custom components
import {Container} from "../components/shared";
import {colors} from "../components/colors";
import {StyleSheet, View,Text } from "react-native";
import Navbar from "../components/Navbar";


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



const System: FunctionComponent = () => {
    return(
        <>
        <StatusBar style="light"/>
        <SystemContainer>
          <Navbar systUnderline={true} hardUnderline={false} dashUnderline={false}/>
          <MainContainer>
          <Text>THIS IS A PLACEHOLDER</Text>
          </MainContainer>
          
        </SystemContainer>
        </>
    );
};

const styles = StyleSheet.create({
  placeholder:{
  fontSize: 20,
  textDecorationLine: 'underline',
  },
})


export default System;