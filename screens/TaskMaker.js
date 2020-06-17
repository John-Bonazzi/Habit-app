import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Styles } from '../styles/themes';
import { HabitHeader } from '../components/header-components';
import { Input, Button } from 'react-native-elements';

import { DatePicker } from '../components/taskMaker-components';

const TaskMaker = ({ route, navigation }) => {
  const theme = useTheme();
  const [headerTitle, setHeaderTitle] = useState('Create')
  const [mode, setMode] = useState({ mode: 'default' });
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
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

  useEffect(() => {
    if (route.params.task) {
      setShow(false);
      let task = route.params.task;
      setTask({
        title: task.title ? task.title : '',
        description: task.description ? task.description : '',
        video: task.video ? task.video : {},
        due_date: task.dates?.due_date ? new Date(task.dates.due_date).toString() : new Date().toString(),
      });
      if(route.params.edit){
      setMode({ mode: 'edit', key: route.params.task.id });
      setHeaderTitle('Edit');
      }
      else {
        setMode('default');
        setHeaderTitle('Create');
      }
    }
    
    if (route.params.video) {
      modifyTask({ video: route.params.video });
    }
  }, [route.params.task, route.params.video, route.params.edit]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={theme.container}>
        <HabitHeader backgroundColor={theme.myColors.header} title={headerTitle} buttonColor={theme.myColors.buttonIcon} />
        <Input
          onFocus={() => { setShow(false) }}
          label='Title'
          inputStyle={{ color: theme.colors.text }}
          value={task?.title}
          onChangeText={val => modifyTask({ title: val })}
        />
        <Input
          onFocus={() => { setShow(false); }}
          label='Description (optional)'
          inputStyle={{ color: theme.colors.text }}
          value={task?.description}
          onChangeText={val => modifyTask({ description: val })}
          multiline
          textAlignVertical='center'
        />
        <Input
          onFocus={() => { setShow(false); }}
          label='YouTube search term'
          inputStyle={{ color: theme.colors.text }}
          value={search}
          onChangeText={val => setSearch(val)}
          multiline
          textAlignVertical='center'
        />
        <TouchableOpacity
          onPress={() => task.video ? navigation.navigate('Viewer', { video: task.video }) : {}}
        >
          <Input
            onFocus={() => { setShow(false); }}
            disabled
            onPress={() => task.video ? navigation.navigate('Viewer', { video: task.video }) : {}}
            label='Link From YouTube video'
            disabledInputStyle={{ color: theme.colors.text }}
            value={`youtube.com/watch?v=${task.video?.id?.videoId ? task.video.id.videoId : ''}`}
            multiline
            textAlignVertical='center'
          />
        </TouchableOpacity>
        <Button
          title='Search'
          onPress={() => navigation.navigate('Search', { search: search })}
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
            navigation.navigate("Home", { task: newTask, mode: 'default', editMode: mode });
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