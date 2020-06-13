import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Themes, Styles } from '../styles/themes';
import Loader from '../helpers/Loader';

const defaultStyle = StyleSheet.create(Styles.default);

const TaskMaker = ({route, navigation}) => {
  return (
    <View style={defaultStyle.container}>
      <Text>Create a Task</Text>
    </View>
  )
}

export default TaskMaker;