import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { TaskField, FloatingButton } from '../components/taskViewer-components';
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
  const {colors} = useTheme(); //For now I am not using the values passed by the theme, but using my own.
  return (

    <View style={Styles.container}>
      <HabitHeader backgroundColor={Styles.myColors.header} buttonColor={Styles.myColors.buttonIcon}/>
      <Text style={Styles.text}>List of tasks</Text>
      <TaskField title="Completed task" bColor='white' state='completed' failed={false} completed={true} />
      <TaskField title="Failed Task" bColor='white' state='failed' failed={true} />
      <FloatingButton buttonStyle={{color: Styles.myColors.button}}/>
    </View>
  )
}

export default TaskViewer;