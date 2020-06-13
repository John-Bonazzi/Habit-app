import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import Loader, {load_theme, apply_settings} from '../helpers/Loader';
import { getData, storeData } from '../helpers/Storage';

import { Themes, Styles } from '../styles/themes';

const defaultStyle = StyleSheet.create(Styles.default);

const TaskSettings = ({route, navigation}) => {
  const [theme, setTheme] = useState(defaultStyle);
  Loader(setTheme);

  return (
    <View style={theme.container}>
        <Text style={theme.text}>Change settings</Text>
        <Button onPress={() => {storeData('theme', "dark").then(() => load_theme(setTheme))}} title='Dark Mode!'/>
        <Button onPress={() => {storeData('theme', "light").then(() => load_theme(setTheme))}} title='Light Mode!'/>
        <Button onPress={() => {navigation.push('Home', {theme})}} title='Back' />
    </View>
  )
}

export default TaskSettings;