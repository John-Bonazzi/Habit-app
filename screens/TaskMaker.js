import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Styles } from '../styles/themes';
import { HabitHeader } from '../components/header-components';
import { Input, Button } from 'react-native-elements';

import { DatePicker } from '../components/taskMaker-components';

const TaskMaker = ({ route, navigation }) => {
  const theme = useTheme();
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
            setShow(false);
            let newTask = task;
            setTask({});
            navigation.navigate("Home", {task: newTask});
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