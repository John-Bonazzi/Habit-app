import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getData, storeData } from '../helpers/Storage';
import { Styles, darkTheme, lightTheme, makeTheme } from '../styles/themes';

export const load_theme = async (updateTheme) => {
  var themeOption = await getData('theme');
  var option = await task_style();
  var newTheme = themeOption==='dark' ? {...Styles ,...DarkTheme, ...darkTheme} : {...Styles ,...DefaultTheme, ...lightTheme};
  newTheme = {...newTheme, card: option};
  makeTheme(newTheme);
  updateTheme(newTheme);
}

export const task_style = async () => {
  var cardOption = await getData('card');
  return cardOption === 'true';
  
}

export const load_task_style = async (updateTaskStyle) => {
  var cardOption = await getData('card');
  cardOption = cardOption === 'true'
  updateTaskStyle({card: cardOption});
}

export const save_theme = (newTheme) => {
  storeData('theme', newTheme);
}

export const save_card_style = (newTheme) => {
  storeData('card', newTheme);
}