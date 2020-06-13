import StyleMerge from 'lodash.merge';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getData, storeData } from '../helpers/Storage';
import { Styles, Themes } from '../styles/themes';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';


const defaultStyle = StyleSheet.create(Styles.default);

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