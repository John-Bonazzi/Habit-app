import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer, DarkTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { YellowBox } from 'react-native';
import { HabitDrawer } from './components/navigation-drawers';
import {load_theme} from './helpers/Loader';
import TaskMaker from './screens/TaskMaker';
import TaskSettings from './screens/TaskSettings';
import TaskViewer from './screens/TaskViewer';
import { makeTheme, Styles } from './styles/themes';
import * as Analytics from 'expo-firebase-analytics';
import { initHabitDB } from './database/fb-tasks';

/*
  Ignore the warning for the Settings screen, since it does not use functionalities that would break the app.
  Functionalities that can't be used in Settings: 
    -   deep linking
    -   state persistence
  More info at: https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
*/

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export default function App() {

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  
  const [theme, setTheme] = useState({ ...Styles, ...DefaultTheme  });
  console.log('At App: ', theme);
  const updateTheme = (vals) => {
    console.log("At app, theme update val: ", vals);
    setTheme({...theme, ...Styles, ...vals  });
  };
  makeTheme(theme);

  useEffect(() =>{
    load_theme(updateTheme);
    const state = navigationRef.current.getRootState();
    routeNameRef.current = getActiveRouteName(state);
    try{
      initHabitDB();
    }
    catch(err){
      console.log("Error at App: ", err);
    }
  }, []);
  
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer 
      theme={theme}
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          Analytics.setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}
    >
      <Drawer.Navigator initialRouteName='Home' drawerContent={HabitDrawer}>
        <Drawer.Screen name='Home' component={TaskViewer} ></Drawer.Screen>
        <Drawer.Screen name='Create' component={TaskMaker} ></Drawer.Screen>
        <Drawer.Screen name='Settings' component={TaskSettings} initialParams={{ setter: updateTheme}} ></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}