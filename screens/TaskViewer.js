import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { TaskField, FloatingButton, TaskCard, TaskView, renderTask } from '../components/taskViewer-components';
import { Styles } from '../styles/themes';
import { Button, Header } from 'react-native-elements';
import { HabitHeader } from '../components/header-components';
import { FloatingAction } from "react-native-floating-action";
import { Feather } from '@expo/vector-icons'; 
import { setupHabitListener, storeTask, initHabitDB } from '../database/fb-tasks';

const createTaskPacket = (task) => {
  let creationTime = new Date().toString();
  let newTask = {
    title: task.title,
    description: task.description,
    timer: 0.0,
    state: 'incomplete',
    link: task.link,
    dates: {
      created: creationTime,
      last_modified: creationTime,
      due_date: task.due_date,
    },
  };
  return newTask;
}



const TaskViewer = ({ route, navigation }) => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    try{
      initHabitDB();
    }
    catch(err){
      console.log("Error at App: ", err);
    }
    setupHabitListener(setTasks);
    console.log(tasks);
  }, []);

  useEffect(() => {
    if (route.params?.task){
      console.log('At TaskViewer, useEffect: ', route.params.task);
      let newTask = createTaskPacket(route.params.task);
      console.log('At TaskViewer, useEffect packet creator: ', newTask);
      storeTask(newTask);
    }
  }, [route.params?.task]);
  console.log('At TaskViewer, tasks: ', tasks);
  return (

    <View style={theme.container}>
      <HabitHeader backgroundColor={theme.myColors.header} buttonColor={theme.myColors.buttonIcon}/>
      <FlatList 
        keyExtractor={(item) => item.id}
        data={tasks}
        extraData={theme}
        renderItem={({index, item}) => 
          { //console.log('At flatlist, item: ', item);
            return(<TaskView 
            card={theme.card} 
            title={item.title} 
            description={item.description}
            bColor={theme.myColors.cards} 
            textStyle={{color: theme.myColors.text}} 
            state={item.state} 
            failed={false} 
            completed={true} />)}}
      />
      <FloatingButton buttonStyle={{color: Styles.myColors.button}}/>
    </View>
  )
}

//<TaskField title="Completed task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='completed' failed={false} completed={true} />
  //    <TaskField title="Failed Task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='failed' failed={true} />
    //  <TaskView card={theme.card} title="Completed task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='completed' failed={false} completed={true} />

export default TaskViewer;