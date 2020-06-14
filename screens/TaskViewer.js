import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import MyComponent, {TaskField} from '../components/MyComponent';
import { Styles } from '../styles/themes';


const TaskViewer = ({ route, navigation }) => {
  useTheme(); //For now I am not using the values passed by the theme, but using my own.

  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>List of tasks</Text>

      <MyComponent title="Completed task" bColor='white' state='completed' failed={false} completed={true}/>
        <MyComponent title="Failed Task" bColor='white' state='failed' failed={true}/>
    </View>
  )
}

export default TaskViewer;