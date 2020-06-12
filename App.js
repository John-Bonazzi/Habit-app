import StyleMerge from 'lodash.merge';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Settings } from 'react-native';
import { Button } from 'react-native-elements';
import { getData, storeData } from './helpers/Storage';
import { Themes, Styles } from './styles/themes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import TaskSettings from './screens/TaskSettings'

const load_theme = (updateStateFunction) => {
  getData('theme')
    .then((val) => {themeOption = val; console.log(`option: ${themeOption}`)})
    .finally(() => {
      let newTheme = StyleMerge({}, defaultStyle, Themes[themeOption]); 
      updateStateFunction(StyleSheet.create(newTheme));
    });
}

const defaultStyle = Styles.default;

export default function App() {
  const Stack = createStackNavigator();
  const [theme, setTheme] = useState(defaultStyle);
  useEffect(() =>{
    load_theme(setTheme);
  }, []);

  return (
     <View style={theme.container}>
        <Text style={{color: 'red'}}>Open up App.js to start working on your app!</Text>
        <Button onPress={() => {storeData('theme', "dark").then(() => load_theme(setTheme))}} title='Dark Mode!'/>
        <Button onPress={() => {storeData('theme', "light").then(() => load_theme(setTheme))}} title='Light Mode!'/>
      </View>
  );
}
/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Settings' component={TaskSettings}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>*/