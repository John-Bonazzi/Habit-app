import Loader from '../helpers/Loader';
import { Text, View, StyleSheet, YellowBox } from 'react-native';
import { Button } from 'react-native-elements';
import { Themes, Styles, makeTheme } from '../styles/themes';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import MyComponent from '../components/MyComponent';


const TaskViewer = ({ route, navigation }) => {
  useTheme(); //For now I am not using the values passed by the theme, but using my own.

  return (
      <View style={Styles.container}>
        <Text style={Styles.text}>List of tasks</Text>
        <MyComponent bColor='green'/>
      </View>
  )
}

export default TaskViewer;