import React, { useState } from 'react';
import {View, Text} from 'react-native';
import { CheckBox, Button, Card } from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 
import { FloatingAction } from "react-native-floating-action";
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import {deleteTask, updateTask} from '../database/fb-tasks';


const defineActions = (style) => {
  return [
    {
      color: 'grey',
      text: 'New',
      icon: <Feather name="plus" size={24} color="white" />,
      name: 'bt_new',
      position: 1
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
      position: 3,
    },

  ];
}

export const FloatingButton = (props) => {
  const navigation = useNavigation();
  const actions = defineActions(props.buttonStyle);
  const setMode = props.setter;
  return(
    <FloatingAction
        color={props.buttonStyle.color}
        actions={actions}
        onPressItem={name => {
          if(name === 'bt_new')
            navigation.navigate("Create");
          else if(name === 'bt_edit')
            setMode('edit');
          else if(name === 'bt_delete')
            setMode('delete');
        }}
    />
  );
}

const taskFailedIcon = () => {
  return(
    <Feather name="x-circle" size={24} color="red" />
  )
}

const taskCompletedIcon = () => {
  return(
    <Feather name="check-circle" size={24} color="green" />
  )
}

export const TaskField = (props) => {
  const navigation = useNavigation();
  const [state, setState] = useState(props.item.state !== "incomplete" ?  {checked: true} : { checked: false });
  return (
    <View style={{flexDirection: 'row'}}>
    <CheckBox
      title={props.item.title}
      textStyle={props.textStyle}
      checked={state.checked}
      onPress={() => { 
        if(props.pressMode === 'edit'){
          navigation.navigate("Create", {task: props.item});
        }
        else if(props.pressMode === 'delete'){
          deleteTask(props.item);
        }
        else if(props.pressMode ==='default'){
          
          setState({ checked: !state.checked });
          let newTask = {...props.item, state: !state.checked ? 'completed' : 'incomplete'}; //using not because the new value has not been assigned yet
          updateTask(newTask);
        }
      }}
      containerStyle={{ flex: 1, backgroundColor: props.bColor, borderRadius: 15, overflow: 'hidden',}}
      checkedIcon={props.item.state === 'failed' ? taskFailedIcon() : taskCompletedIcon()}
      uncheckedIcon={<Feather name="circle" size={24} color="black" />}
    />
    </View>
    )
}

export const TaskCard = (props) => {
  return(
    <Card
      title={TaskField(props)}
    >
      <Text style={props.textStyle}>{props.item.description}</Text>
      </Card>
  )
}
export const RenderTask = () => {
  const props = {
    card: theme.card, 
    bColor: theme.myColors.cards, 
    textStyle:{color: theme.myColors.text},
    item: item
  };
  return props.card ? TaskCard(props) : TaskField(props);
}

export const TaskView = (props) => {
  return props.card ? TaskCard(props) : TaskField(props);
}