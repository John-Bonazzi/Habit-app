import StyleMerge from 'lodash.merge';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Settings } from 'react-native';
import { Button } from 'react-native-elements';
import { getData, storeData } from './helpers/Storage';
import { Themes, Styles } from './styles/themes';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import TaskSettings from './screens/TaskSettings';
import TaskMaker from './screens/TaskMaker';
import TaskViewer from './screens/TaskViewer';

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
  const Drawer = createDrawerNavigator();
  const [theme, setTheme] = useState(defaultStyle);
  useEffect(() =>{
    load_theme(setTheme);
  }, []);

  return (
     <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name='Home' component={TaskViewer}></Drawer.Screen>
          <Drawer.Screen name='Create' component={TaskMaker}></Drawer.Screen>
          <Drawer.Screen name='Settings' component={TaskSettings}></Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}
/*<View style={theme.container}>
        <Text style={{color: 'red'}}>Open up App.js to start working on your app!</Text>
        <Button onPress={() => {storeData('theme', "dark").then(() => load_theme(setTheme))}} title='Dark Mode!'/>
        <Button onPress={() => {storeData('theme', "light").then(() => load_theme(setTheme))}} title='Light Mode!'/>
      </View>*/