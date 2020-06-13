import Loader from '../helpers/Loader';
import { Text, View, StyleSheet, YellowBox } from 'react-native';
import { Themes, Styles, makeTheme } from '../styles/themes';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';



const TaskViewer = ({route, navigation}) => {
  const { colors, container } = useTheme();
  const ttheme = makeTheme('text',colors);
  return (
    <View style={container}>
      <Text style={ttheme.text}>List of tasks</Text>
    </View>
  )
}

export default TaskViewer;