import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Styles } from '../styles/themes';
import { HabitHeader } from '../components/header-components';
import { Input, Button } from 'react-native-elements';

import { DatePicker } from '../components/taskMaker-components';

const TaskMaker = ({ route, navigation }) => {
  useTheme();
  const [task, setTask] = useState();
  const modifyTask = (vals) => {
    setTask({
      ...task,
      ...vals
    });
  }

  const [show, setShow] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={Styles.container}>
      <HabitHeader backgroundColor={Styles.myColors.header} buttonColor={Styles.myColors.buttonIcon}/>

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
        <DatePicker
          selectedStartDate={task?.due_date}
          setter={modifyTask}
          show={show}
          showSetter={setShow}
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