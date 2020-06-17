import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Styles } from '../styles/themes';
import { HabitHeader } from '../components/header-components';
import { Input, Button } from 'react-native-elements';

import { DatePicker } from '../components/taskMaker-components';

const TaskMaker = ({ route, navigation }) => {
  const theme = useTheme();
  const [mode, setMode] = useState({mode: 'default'});
  const [task, setTask] = useState({
    title: '',
    description: '',
    link: '',
    due_date: new Date().toString(),
  });
  const modifyTask = (vals) => {
    setTask({
      ...task,
      ...vals
    });
  }

  const [show, setShow] = useState(false);

  useEffect(() =>{
    if(route.params?.task){
      let task = route.params.task;
      console.log('passed task in taskMaker: ', task);
      setTask({
        title: task.title,
        description: task.description,
        link: task.link ? task.link : '',
        due_date: new Date(task.dates.due_date).toString(),
      });
      setMode({mode: 'edit', key: route.params.task.id});
    }
    else{
      setMode('default');
    }
  }, [route.params?.task]);
  console.log('At TaskMaker, route: ', route.params);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={theme.container}>
      <HabitHeader backgroundColor={theme.myColors.header} buttonColor={theme.myColors.buttonIcon}/>
        <Input
          onFocus={() => { setShow(false) }}
          label='Title'
          value={task?.title}
          onChangeText={val => modifyTask({ title: val })}
        />
        <Input
          onFocus={() => { setShow(false); }}
          label='Description (optional)'
          value={task?.description}
          onChangeText={val => modifyTask({ description: val })}
          multiline
          textAlignVertical='center'
        />
          <Input
          onFocus={() => { setShow(false); }}
          label='Link to Youtube video'
          value={task?.link}
          onChangeText={val => modifyTask({ link: val })}
          multiline
          textAlignVertical='center'
        />
        <DatePicker
          selectedStartDate={task?.due_date}
          setter={modifyTask}
          show={show}
          showSetter={setShow}
        />
        <Button
          title="save"
          onPress={() => { 
            console.log("At taskMaker, save button: ", task); 
            console.log("At taskMaker, save button mode: ", mode);
            setShow(false);
            let newTask = task;
            setTask({});
            navigation.navigate("Home", {task: newTask, mode:'default', editMode: mode});
          }}
        />
        <Button
          title="Delete"
          onPress={() => { setTask({}); setShow(false) }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default TaskMaker;