import React, {FunctionComponent} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";

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
background-color: ${colors.secondary};
justify-content: space-between;
width: 100%;
height: 100%;
`;



const Dashboard: FunctionComponent = () => {
    return(
        <>
        <StatusBar style="light"/>
        <DashBoardContainer>
          <Navbar systUnderline={false} hardUnderline={false} dashUnderline={true}/>
          <MainContainer>
          <Text style={styles.placeholder}>THIS IS A PLACEHOLDER</Text>
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