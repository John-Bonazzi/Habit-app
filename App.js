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

const load_theme = async () => {
  try{
    let data = await getData();
    console.log(`data: ${data}`);
    return data;
  }
  catch(e){
    console.log(e);
  }
}

let defaultStyle = {
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

let defaultStyle2 = {
    container: {
      //flex: 1,
      backgroundColor: 'black',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
  };

export default function App() {
  const [theme, setTheme] = useState(defaultStyle);
  let themeOption = 'dark';
  useEffect(() =>{
    load_theme()
    .then((val) => {themeOption = val; console.log(`option: ${themeOption}`)})
    .finally(() => {
      let newTheme = StyleMerge({}, defaultStyle, Themes[themeOption]); 
      setTheme(newTheme);//StyleSheet.create(newTheme)); 
      //console.log(/*`retrieved: ${theme}\noption: ${themeOption}`*/newTheme)
    });
  }, []);
  return (
      <View style={theme.container}>
        <Text style={{color: 'red'}}>Open up App.js to start working on your app!</Text>
        <Button onPress={() => setTheme(defaultStyle)} title='Click me!'/>
      </View>
  );
}

//FIXME: look at react-native-restart to support theme settings and reload app on theme change to apply new style
//https://www.npmjs.com/package/react-native-restart

//const styles = StyleSheet.create({});//styleMerge(defaultStyle, userStyle));
//console.log(styles);
