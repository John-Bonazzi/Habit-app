import Loader from '../helpers/Loader';
import { Text, View, StyleSheet } from 'react-native';
import { Themes, Styles } from '../styles/themes';
import React, { useEffect, useState } from 'react';

const defaultStyle = StyleSheet.create(Styles.default);

const TaskViewer = ({route, navigation}) => {
  const [theme, setTheme] = useState(defaultStyle);

  Loader(setTheme);

  /*useEffect(() => {
    if(route.params?.theme){
      console.log(route.params.theme);
      setTheme(route.params.theme);
    }
  }, [route.params?.theme]);*/

  return (
    <View style={theme.container}>
      <Text style={theme.text}>List of tasks</Text>
    </View>
  )
}

export default TaskViewer;