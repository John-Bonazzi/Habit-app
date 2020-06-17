import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Styles } from '../styles/themes';
import { HabitHeader } from '../components/header-components';
import { Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons'; 
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
    setSearch('');
    if (route.params.task) {
      setShow(false);
      let task = route.params.task;
      setTask({
        title: task.title ? task.title : '',
        description: task.description ? task.description : '',
        video: task.video ? task.video : {},
        due_date: task.dates?.due_date ? new Date(task.dates.due_date).toString() : new Date().toString(),
      });
      if (route.params.edit) {
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
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={theme.container}>
            <HabitHeader backgroundColor={theme.myColors.header} title={headerTitle} buttonColor={theme.myColors.buttonIcon} />
            <Input
              onFocus={() => { setShow(false) }}
              inputContainerStyle={{marginRight: 30}}
              containerStyle={{marginLeft: 15}}
              label='Title'
              inputStyle={{ color: theme.colors.text}}
              value={task?.title}
              onChangeText={val => modifyTask({ title: val })}
            />
            <Input
              onFocus={() => { setShow(false); }}
              label='Description (optional)'
              inputContainerStyle={{marginRight: 30}}
              containerStyle={{marginLeft: 15}}
              inputStyle={{ color: theme.colors.text }}
              value={task?.description}
              onChangeText={val => modifyTask({ description: val })}
              multiline
              textAlignVertical='center'
            />
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Input
                onFocus={() => { setShow(false); }}
                label='YouTube search term'
                containerStyle={{flex: 1, marginLeft: 15}}
                inputStyle={{ color: theme.colors.text}}
                value={search}
                onChangeText={val => setSearch(val)}
                multiline
                textAlignVertical='center'
              />
              <Button
                containerStyle={{alignSelf: 'center', borderRadius: 30, marginRight: 15}}
                buttonStyle={{width: 100, backgroundColor: theme.myColors.button}}
                icon={<Entypo name="chevron-right" size={22} color={theme.colors.text} />}
                iconRight
                title='Search'
                titleStyle={{color: theme.colors.text}}
                onPress={() => navigation.navigate('Search', { search: search })}
              />
            </View>
            <TouchableOpacity
              onPress={() => task.video ? navigation.navigate('Viewer', { video: task.video }) : {}}
            >
              <Input
                onFocus={() => { setShow(false); }}
                disabled
                onPress={() => task.video ? navigation.navigate('Viewer', { video: task.video }) : {}}
                inputContainerStyle={{marginRight: 30}}
                containerStyle={{marginLeft: 15}}
                label='Link From YouTube video'
                disabledInputStyle={{ color: theme.colors.text, opacity: 1 }}
                value={`youtube.com/watch?v=${task.video?.id?.videoId ? task.video.id.videoId : ''}`}
                multiline
                textAlignVertical='center'
              />
            </TouchableOpacity>
            <DatePicker
              selectedStartDate={task?.due_date}
              setter={modifyTask}
              show={show}
              showSetter={setShow}
            />
          </View>
        </ScrollView>
        <View style={{ marginBottom: 20 }} >
          <View style={{ flexDirection: 'row', alignContent: 'space-around', justifyContent: 'space-around' }}>
            <Button
              title="save"
              titleStyle={{ color: theme.colors.text }}
              buttonStyle={{ width: 100, backgroundColor: theme.myColors.newButton, borderRadius: 20 }}
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
              title="Clear"
              titleStyle={{ color: theme.colors.text }}
              buttonStyle={{ width: 100, backgroundColor: theme.myColors.deleteButton, borderRadius: 20 }}
              onPress={() => { setTask({}); setShow(false) }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default TaskMaker;