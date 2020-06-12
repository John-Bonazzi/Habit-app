import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Themes, Styles } from '../styles/themes';

const defaultStyle = StyleSheet.create(Styles.default);

const TaskViewer = () => {
  return (
    <View style={defaultStyle.container}>
      <Text>List of tasks</Text>
    </View>
  )
}

export default TaskViewer;