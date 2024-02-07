import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlannerScreen from './Planner'
import CalendarScreen from './Calendar'
import MainScreen from './Main';
import TasksScreen from './Tasks';

const Stack = createStackNavigator();

function ScreenStacks(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen}/>
      <Stack.Screen name="Calendar" component={CalendarScreen}/>
      <Stack.Screen name="Planner" component={PlannerScreen}/>
      <Stack.Screen name="Tasks" component={TasksScreen}/>
    </Stack.Navigator>
  )
}

export default function App(){
  return(
    <NavigationContainer>
      <ScreenStacks/>
      <StatusBar style="auto"/>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
