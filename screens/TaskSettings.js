import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, YellowBox} from 'react-native';
import { Button } from 'react-native-elements';
import Loader, {load_theme, apply_settings, save_theme} from '../helpers/Loader';
import { getData, storeData } from '../helpers/Storage';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';



import { Themes, Styles } from '../styles/themes';
import { useTheme } from '@react-navigation/native';


const TaskSettings = ({route, navigation}) => {
  const { container, text, colors } = useTheme();
  const ttheme = StyleSheet.create({text:{...text, color: colors.text}});
  const setTheme = route.params.setter;
  return (
    <View style={container}>
        <Text style={ttheme.text}>Change settings</Text>
        <Button onPress={() => {save_theme('dark'); setTheme(DarkTheme)}} title='Dark Mode!'/>
        <Button onPress={() => {save_theme('light'); setTheme(DefaultTheme)}} title='Light Mode!'/>
    </View>
  )
}

export default TaskSettings;