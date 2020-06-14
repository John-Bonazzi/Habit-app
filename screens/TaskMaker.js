import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../styles/themes';

const TaskMaker = ({ route, navigation }) => {
  useTheme();
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>Create a Task</Text>
    </View>
  )
}

export default TaskMaker;