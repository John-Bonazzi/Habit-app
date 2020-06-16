import { DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { save_theme } from '../helpers/Loader';
import { Styles } from '../styles/themes';
import { HabitHeader } from '../components/header-components';
import CalendarPicker from 'react-native-calendar-picker';
import {ThemeSelector} from '../components/settings-components';


const TaskSettings = ({ route, navigation }) => {
  useTheme();
  return (
    <View style={Styles.container}>
      <HabitHeader backgroundColor={Styles.myColors.header} buttonColor={Styles.myColors.buttonIcon} />
      <Text style={Styles.text}>Change settings</Text>
      <ThemeSelector darkTheme={Styles.dark} setter={route.params.setter}/>
    </View>
  )
}

export default TaskSettings;