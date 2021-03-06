import { DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { save_theme, save_card_style } from '../helpers/Loader';
import { Styles, lightTheme, darkTheme } from '../styles/themes';
import { HabitHeader } from '../components/header-components';
import CalendarPicker from 'react-native-calendar-picker';
import {OptionSelector} from '../components/settings-components';


const TaskSettings = ({ route, navigation }) => {
  const theme = useTheme();
  return (
    <View style={theme.container}>
      <HabitHeader backgroundColor={theme.myColors.header} title='Settings' titleSize={40} buttonColor={theme.myColors.buttonIcon}/>
      <OptionSelector
        title='Theme' 
        condition={theme.dark} 
        buttonTitles={['Dark', 'Light']} 
        setter={route.params.setter}
        saver={save_theme}
        options={['dark', 'light']}
        vals={[{...DarkTheme, ...darkTheme }, {...DefaultTheme, ...lightTheme}]}
        theme={theme}
        />
      <OptionSelector 
        title='Cards'
        condition={theme.card}
        buttonTitles={['Cards', 'Boxes']} 
        setter={route.params.setter}
        saver={save_card_style}
        options={['true', 'false']}
        vals={[{...Styles, card: true}, {...Styles, card: false}]}
        theme={theme}
      />
    </View>
  )
}

export default TaskSettings;