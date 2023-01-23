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
        <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
        <Stack.Screen options={{ headerShown: false }} name="Hardware" component={Hardware} />
        <Stack.Screen options={{ headerShown: false }} name="System" component={System} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


