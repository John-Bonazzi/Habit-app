import StyleMerge from 'lodash.merge';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Settings, ProgressViewIOSComponent } from 'react-native';
import { Button } from 'react-native-elements';
import { getData, storeData } from './helpers/Storage';
import { Themes, Styles } from './styles/themes';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import TaskSettings from './screens/TaskSettings';
import TaskMaker from './screens/TaskMaker';
import TaskViewer from './screens/TaskViewer';
import Loader from './helpers/Loader';

const load_theme = (updateTheme) => {
  var themeOption;
  var newTheme;
  getData('theme')
    .then((val) => { 
      themeOption = val;
      })
    .finally(() => {
      newTheme = StyleMerge({}, defaultStyle, Themes[themeOption]); 
      updateTheme(StyleSheet.create(newTheme));
    });
}

const defaultStyle = Styles.default;

//Used to add stuff to the base drawer, but can't change the base stuff.
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('Settings')}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  const Drawer = createDrawerNavigator();
  const [theme, setTheme] = useState(defaultStyle);
  //storeData('theme', 'light');
  return (
     <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name='Home' component={TaskViewer} ></Drawer.Screen>
          <Drawer.Screen name='Create' component={TaskMaker} ></Drawer.Screen>
          <Drawer.Screen name='Settings' component={TaskSettings} ></Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}
/*<View style={theme.container}>
        <Text style={{color: 'red'}}>Open up App.js to start working on your app!</Text>
        <Button onPress={() => {storeData('theme', "dark").then(() => load_theme(setTheme))}} title='Dark Mode!'/>
        <Button onPress={() => {storeData('theme', "light").then(() => load_theme(setTheme))}} title='Light Mode!'/>
      </View>*/