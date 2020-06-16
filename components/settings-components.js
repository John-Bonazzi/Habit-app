import React, { useState } from 'react';
import {ButtonGroup, Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import { save_theme } from '../helpers/Loader';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const ThemeSelector = (props) => {
  //const buttons = [{ element: LightThemeButton }, {element: DarkThemeButton}];
  const initIndex = props.darkTheme ? 0 : 1
  const [index, setIndex] = useState(initIndex);
  const buttons = ['Dark', 'Light'];
  const setTheme = props.setter;
  return(
  <View 
    style={{flex: 1, maxHeight:50, flexDirection:'row', justifyContent:'center', backgroundColor:'grey'}}>
    <View 
      style={{flex: 2, justifyContent:'flex-end'}}>
    <Text 
      adjustsFontSizeToFit 
      allowFontScaling
      style={{fontSize: 40, textTransform:'uppercase', fontWeight: '700'}}>Test</Text>
    </View>
    <ButtonGroup
      onPress={(val) => { 
        index !== val ? setIndex(val) : {}; 
        const themeValue = val ? 'light' : 'dark';
        save_theme(themeValue);
        val ? setTheme(DefaultTheme) : setTheme(DarkTheme);  
      }}
      containerStyle={{flex:3, width: 20}}
      buttons={buttons} 
      selectedButtonStyle={{backgroundColor: 'red'}}
      selectedIndex={index}
    />
  </View>
  )
}