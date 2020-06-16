import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { TaskField, FloatingButton, TaskCard, TaskView } from '../components/taskViewer-components';
import { Styles } from '../styles/themes';
import { Button, Header } from 'react-native-elements';
import { HabitHeader } from '../components/header-components';
import { FloatingAction } from "react-native-floating-action";
import { Feather } from '@expo/vector-icons'; 

const actions = [
  {
    text: "Spooky",
    icon: <Feather name="plus" size={24} color="black" />,
    name: 'bt_spooky',
    position: 1
  }
];

const TaskViewer = ({ route, navigation }) => {
  const theme = useTheme();
  return (

    <View style={theme.container}>
      <HabitHeader backgroundColor={theme.myColors.header} buttonColor={theme.myColors.buttonIcon}/>
      <Text style={Styles.text}>List of tasks</Text>
      <TaskField title="Completed task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='completed' failed={false} completed={true} />
      <TaskField title="Failed Task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='failed' failed={true} />
      <TaskView card={theme.card} title="Completed task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='completed' failed={false} completed={true} />
      <FloatingButton buttonStyle={{color: Styles.myColors.button}}/>
    </View>
  )
}

export default TaskViewer;