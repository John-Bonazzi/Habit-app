import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Themes, Styles } from '../styles/themes';

const defaultStyle = StyleSheet.create(Styles.default);

const TaskMaker = () => {
  return (
    <View style={defaultStyle.container}>
      <Text>Create a Task</Text>
    </View>
  )
}

export default TaskMaker;