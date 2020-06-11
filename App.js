import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Themes, DarkTheme, LightTheme } from './styles/themes';
import settings from './settings';
import StyleMerge from 'lodash.merge';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeProvider, Button } from 'react-native-elements';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@settings', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@settings');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e)
  }
}

const get_theme = async () => {
  try{
    let data = await getData();
    console.log('retrieved data');
    console.log(data);
    return data['theme'];
  }
  catch(e){
    console.log(e);
  }
}

const load_theme = (updateStateFunction) => {
  get_theme()
    .then((val) => {themeOption = val; console.log(`option: ${themeOption}`)})
    .finally(() => {
      let newTheme = StyleMerge({}, defaultStyle, Themes[themeOption]); 
      updateStateFunction(StyleSheet.create(newTheme));
    });
}

const defaultStyle = {
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

export default function App() {
  const [theme, setTheme] = useState(defaultStyle);
  let themeOption = 'dark';
  useEffect(() =>{
    load_theme(setTheme);
  }, []);

  return (
      <View style={theme.container}>
        <Text style={{color: 'red'}}>Open up App.js to start working on your app!</Text>
        <Button onPress={() => {storeData({theme: "dark"}).then(() => load_theme(setTheme))}} title='Dark Mode!'/>
        <Button onPress={() => {storeData({theme: "light"}).then(() => load_theme(setTheme))}} title='Light Mode!'/>
      </View>
  );
}

//const styles = StyleSheet.create({});//styleMerge(defaultStyle, userStyle));
