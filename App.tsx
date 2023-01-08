import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard'
import Hardware from './screens/Hardware';
import System from './screens/System';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Hardware" component={Hardware} />
        <Stack.Screen name="System" component={System} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


