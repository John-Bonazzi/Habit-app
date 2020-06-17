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
  const [search, setSearch] = useState('');
  const [task, setTask] = useState({
    title: '',
    description: '',
    video: {},
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
      setTask({
        title: task.title,
        description: task.description,
        video: task.video ? task.video : {},
        due_date: new Date(task.dates.due_date).toString(),
      });
      setMode({mode: 'edit', key: route.params.task.id});
    }
    else{
      setMode('default');
    }
    if(route.params?.video){
      modifyTask({video: route.params.video});
    }
  }, [route.params?.task, route.params?.video]);

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
          label='YouTube search term'
          value={search}
          onChangeText={val => setSearch(val)}
          multiline
          textAlignVertical='center'
        />
        <Input
          onFocus={() => { setShow(false); }}
          disabled
          label='Link From YouTube video'
          value={`youtube.com/watch?v=${task.video?.id?.videoId ? task.video.id.videoId : ''}`}
          multiline
          textAlignVertical='center'
        />
        <Button
          title='Search'
          onPress={() =>navigation.navigate('Search', {search: search})}
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