import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { TaskField, FloatingButton, TaskCard, TaskView, renderTask } from '../components/taskViewer-components';
import { Styles } from '../styles/themes';
import { Button, Header } from 'react-native-elements';
import { HabitHeader } from '../components/header-components';
import { FloatingAction } from "react-native-floating-action";
import { Feather } from '@expo/vector-icons'; 
import { setupHabitListener, storeTask, initHabitDB, updateTask } from '../database/fb-tasks';

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
  const [pressMode, setMode] = useState(route.params.mode);
  useEffect(() => {
    try{
      initHabitDB();
    }
    catch(err){
      console.log("Error at TaskViewer: ", err);
    }
    setupHabitListener(setTasks);
    console.log(tasks);
  }, []);

  useEffect(() => {
    if (route.params?.task){
      console.log('At TaskViewer, useEffect: ', route.params.task);
      let newTask = createTaskPacket(route.params.task);
      console.log('At TaskViewer, useEffect packet creator: ', newTask);
      if(route.params?.editMode.mode === 'edit'){
        updateTask({...newTask, id: route.params.editMode.key});
        console.log("At TaskViewer, useEffect, edit task: ", newTask)
        console.log("At TaskViewer, useEffect, edit mode: ", route.params.editMode);
      }
      else{
        storeTask(newTask);
      }
    }
    if (route.params?.mode){
      console.log("At TaskViewer, useEffect for mode: ", route.params.mode);
      setMode(route.params.mode);
    }
  }, [route.params?.task, route.params]);
  console.log('At TaskViewer, route: ', route.params);
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
            item={item}
            bColor={theme.myColors.cards} 
            textStyle={{color: theme.myColors.text}}  
            failed={false} 
            completed={true}
            pressMode={pressMode}
            modeSetter={setMode} 
            />)}}
      />
      <FloatingButton 
        buttonStyle={{color: theme.myColors.button}}
        setter={setMode}
      />
    </View>
  )
}

//<TaskField title="Completed task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='completed' failed={false} completed={true} />
  //    <TaskField title="Failed Task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='failed' failed={true} />
    //  <TaskView card={theme.card} title="Completed task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='completed' failed={false} completed={true} />

export default TaskViewer;