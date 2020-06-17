import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckBox, Button, Card, Image } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import { deleteTask, updateTask } from '../database/fb-tasks';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const defineActions = (style) => {
  return [
    {
      color: 'grey',
      text: 'New',
      icon: <Feather name="plus" size={24} color="white" />,
      name: 'bt_new',
      position: 3
    },
    {
      color: 'grey',
      text: 'Edit',
      icon: <Feather name="edit-3" size={24} color="white" />,
      name: 'bt_edit',
      position: 2,
    },
    {
      color: 'grey',
      text: 'Delete',
      icon: <Feather name="trash-2" size={24} color="white" />,
      name: 'bt_delete',
      position: 1,
    },

  ];
}

export const FloatingButton = (props) => {
  const navigation = useNavigation();
  const actions = defineActions(props.buttonStyle);
  const setMode = props.setter;
  return (
    <FloatingAction
      color={props.buttonStyle.color}
      actions={actions}
      onPressItem={name => {
        if (name === 'bt_new')
          navigation.navigate("Create", {task: {}, edit: false});
        else if (name === 'bt_edit')
          setMode('edit');
        else if (name === 'bt_delete')
          setMode('delete');
      }}
    />
  );
}

const taskFailedIcon = () => {
  return (
    <Feather name="x-circle" size={24} color="red" />
  )
}

const taskCompletedIcon = () => {
  return (
    <Feather name="check-circle" size={24} color="green" />
  )
}

export const TaskField = (props) => {
  const navigation = useNavigation();
  const setState = props.stateSetter;
  return (
    <View style={{ flexDirection: 'row' }}>
      <CheckBox
        title={props.item.title}
        textStyle={props.textStyle}
        checked={props.state.checked}
        onPress={() => {
          if (props.pressMode === 'edit') {
            navigation.navigate("Create", { task: props.item, edit: true });
          }
          else if (props.pressMode === 'delete') {
            deleteTask(props.item);
          }
          else if (props.pressMode === 'default') {
            setState({ checked: !props.state.checked });
            let newTask = { ...props.item, state: !props.state.checked ? 'completed' : 'incomplete' }; //using not because the new value has not been assigned yet
            updateTask(newTask);
          }}
        }
        containerStyle={{ flex: 1, backgroundColor: props.bColor, borderRadius: 15, overflow: 'hidden', borderColor: props.bColor }}
        checkedIcon={props.item.state === 'failed' ? taskFailedIcon() : taskCompletedIcon()}
        uncheckedIcon={<Feather name="circle" size={24} color="black" />}
      />
    </View>
  )
}

export const TaskCard = (props) => {
  const navigation = useNavigation();
  const setState = props.stateSetter;
  return (

    <Card
      containerStyle={{borderRadius: 20, backgroundColor: props.bColor}}
      title={TaskField(props)}
    >
      <TouchableOpacity
        onPress={() =>{
            navigation.navigate('Viewer', {video: props.item.video});
        }}
      >
        {props.item.video ?
          <Image
            source={{ uri: props.item.video.snippet.thumbnails.medium.url }}
            style={{ width: props.item.video.snippet.thumbnails.default.medium, height: props.item.video.snippet.thumbnails.medium.height }}
          /> :
          <View></View>}
      </TouchableOpacity>
      <View style={{minHeight: 40}}>
        <View style={{borderColor: props.textStyle, borderWidth: 1, marginTop: 5}}></View>
        <Text style={props.textStyle}>{props.item.description}</Text>
      </View>
    </Card>
  )
}
export const RenderTask = () => {
  const props = {
    card: theme.card,
    bColor: theme.myColors.cards,
    textStyle: { color: theme.myColors.text },
    item: item
  };
  return props.card ? TaskCard(props) : TaskField(props);
}

export const TaskView = (props) => {
  const [state, setState] = useState(props.item.state !== "incomplete" ? { checked: true } : { checked: false });
  return props.card ? <TaskCard {...props} state={state} stateSetter={setState}/> : <TaskField {...props} state={state} stateSetter={setState}/>;
}