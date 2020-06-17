import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { TaskField, FloatingButton, TaskCard, TaskView, renderTask } from '../components/taskViewer-components';
import { Styles } from '../styles/themes';
import { Button, Header } from 'react-native-elements';
import { HabitHeader } from '../components/header-components';
import { FloatingAction } from "react-native-floating-action";
import { Feather } from '@expo/vector-icons'; 
import {Accelerometer} from 'expo-sensors';
import { setupHabitListener, storeTask, initHabitDB, updateTask } from '../database/fb-tasks';

const displaySort = (item1, item2) => {
  return Date(item1.dates.due_date) < Date(item2.dates.due_date);
}



const createTaskPacket = (task) => {
  let creationTime = new Date().toString();
  let newTask = {
    title: task.title? task.title : 'New Task',
    description: task.description? task.description : '',
    timer: 0.0,
    state: 'incomplete',
    video: task.video? task.video : {},
    dates: {
      created: creationTime,
      last_modified: creationTime,
      due_date: task.due_date? task.due_date : creationTime,
    },
  };
  return newTask;
}



const TaskViewer = ({ route, navigation }) => {
  const theme = useTheme();
  const [headerTitle, setHeaderTitle] = useState('View all')
  const [tasks, setTasks] = useState([]);
  const [pressMode, setMode] = useState(route.params.mode);
  const [display, setDisplay] = useState('all');
  var _sensor_subscription;
  Accelerometer.setUpdateInterval(300);
  useEffect(() => {
    try{
      initHabitDB();
    }
    catch(err){
      console.log("Error at TaskViewer: ", err);
    }
    setupHabitListener((items) => {
      setTasks(items.sort(displaySort));
    });
    _sensor_subscription = Accelerometer.addListener(accelerometerData => {    
      let {x} = accelerometerData;
      if(x > 1.5){
        
        navigation.toggleDrawer();
      }
    })
  }, []);

  useEffect(() => {
    if (route.params?.task){
      if(route.params.task === {}){
        console.log("Empty!");}
      else{
      let newTask = createTaskPacket(route.params.task);
      if(route.params?.editMode.mode === 'edit'){
        updateTask({...newTask, id: route.params.editMode.key});
      }
      else{
        storeTask(newTask);
      }
    }}
    if (route.params?.mode){
      setMode(route.params.mode);
    }
    if (route.params?.filter){
      if(route.params.filter === 'all'){
        setHeaderTitle('View all');
      } else if (route.params.filter === 'incomplete'){
        setHeaderTitle('View incomplete');
      } else if (route.params.filter === 'completed'){
        setHeaderTitle('View completed');
      }
      setDisplay(route.params?.filter);
    }
  }, [route.params?.task, route.params, route.params?.filter]);

  const displayFilter = (item) => {
    if(display==='all'){
      return true;
    } else{
      return item.state === display;
    }
  }

  return (

    <View style={theme.container}>
      <HabitHeader backgroundColor={theme.myColors.header} title={headerTitle} buttonColor={theme.myColors.buttonIcon}/>
      <FlatList 
        keyExtractor={(item) => item.id}
        data={tasks.filter(displayFilter)}
        extraData={theme}
        renderItem={({index, item}) => 
          { //console.log('At flatlist, item: ', item);
            return(<TaskView 
            card={theme.card} 
            item={item}
            bColor={theme.myColors.cards} 
            titleStyle={{color: theme.colors.text, fontSize: 20}}  
            textStyle={{color: theme.colors.text, fontSize: 18, fontWeight: 'bold'}}  
            failed={false} 
            completed={true}
            pressMode={pressMode}
            modeSetter={setMode} 
            />)}}
      />
      <FloatingButton 
        buttonStyle={{color: theme.myColors.button}}
        setter={setMode}
        headerSetter={setHeaderTitle}
      />
    </View>
  )
}

//<TaskField title="Completed task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='completed' failed={false} completed={true} />
  //    <TaskField title="Failed Task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='failed' failed={true} />
    //  <TaskView card={theme.card} title="Completed task" bColor={Styles.myColors.cards} textStyle={{color: Styles.myColors.text}} state='completed' failed={false} completed={true} />

export default TaskViewer;