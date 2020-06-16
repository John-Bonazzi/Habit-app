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
    <View style={Styles.container}>
      <HabitHeader backgroundColor={Styles.myColors.header} buttonColor={Styles.myColors.buttonIcon} />
      <Text style={Styles.text}>Change settings</Text>
      <OptionSelector
        title='Theme' 
        condition={Styles.dark} 
        buttonTitles={['Dark', 'Light']} 
        setter={route.params.setter}
        saver={save_theme}
        options={['dark', 'light']}
        vals={[{...DarkTheme, ...darkTheme }, {...DefaultTheme, ...lightTheme}]}
        />
      <OptionSelector 
        title='Cards'
        condition={theme.card}
        buttonTitles={['Cards', 'Boxes']} 
        setter={route.params.setter}
        saver={save_card_style}
        options={['true', 'false']}
        vals={[{...Styles, card: true}, {...Styles, card: false}]}
      />
    </View>
  )
}

export default TaskSettings;