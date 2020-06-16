import { DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { save_theme } from '../helpers/Loader';
import { Styles } from '../styles/themes';
import { HabitHeader } from '../components/header-components';
import CalendarPicker from 'react-native-calendar-picker';


const TaskSettings = ({route, navigation}) => {
  useTheme();
  const setTheme = route.params.setter;
  return (
    <View style={Styles.container}>
              <HabitHeader backgroundColor={Styles.myColors.header} buttonColor={Styles.myColors.buttonIcon}/>

        <Text style={Styles.text}>Change settings</Text>
        <Button onPress={() => {save_theme('dark'); setTheme(DarkTheme)}} title='Dark Mode!'/>
        <Button onPress={() => {save_theme('light'); setTheme(DefaultTheme)}} title='Light Mode!'/>
    </View>
  )
}

export default TaskSettings;