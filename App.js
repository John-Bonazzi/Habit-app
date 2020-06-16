import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { YellowBox } from 'react-native';
import { HabitDrawer } from './components/navigation-drawers';
import Loader from './helpers/Loader';
import TaskMaker from './screens/TaskMaker';
import TaskSettings from './screens/TaskSettings';
import TaskViewer from './screens/TaskViewer';
import { makeTheme, Styles } from './styles/themes';

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
  const [theme, setTheme] = useState({ ...DefaultTheme, ...Styles });
  const updateTheme = (vals) => {
    setTheme({ ...vals, ...Styles });
  };
  Loader(updateTheme);
  makeTheme('text', theme.colors, theme.dark);
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator initialRouteName='Settings' drawerContent={HabitDrawer}>
        <Drawer.Screen name='Home' component={TaskViewer} ></Drawer.Screen>
        <Drawer.Screen name='Create' component={TaskMaker} ></Drawer.Screen>
        <Drawer.Screen name='Settings' component={TaskSettings} initialParams={{ setter: updateTheme }} ></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}