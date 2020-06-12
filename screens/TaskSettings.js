import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Themes, Styles } from '../styles/themes';

const defaultStyle = StyleSheet.create(Styles.default);

const TaskSettings = () => {
  return (
    <View style={defaultStyle.container}>
      <Text>Change settings</Text>
    </View>
  )
}

export default TaskSettings;