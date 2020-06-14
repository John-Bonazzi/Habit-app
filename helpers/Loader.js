import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getData, storeData } from '../helpers/Storage';
import { Styles } from '../styles/themes';

export const load_theme = (updateTheme) => {
  var themeOption;
  var newTheme;
  getData('theme')
    .then((val) => { 
      themeOption = val;
      })
    .finally(() => {
      newTheme = themeOption==='dark' ? DarkTheme : DefaultTheme; 
      updateTheme(newTheme);
    });
}

export const save_theme = (newTheme) => {
  storeData('theme', newTheme);
}

export default Loader = (updateTheme) => {
  useEffect(() =>{
    load_theme(updateTheme);
  }, []);
}