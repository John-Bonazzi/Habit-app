import React, { useState } from 'react';
import {View} from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 

const MyComponent = (props) => {
  return (
    TaskField(props)
    //<Button buttonStyle={{backgroundColor: props.bColor}} title='Hello, Component!'/>
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
  const [state, setState] = useState(props.state !== "incomplete" ?  {checked: true} : { checked: false });
  return (
    <View style={{flexDirection: 'row'}}>
    <CheckBox
      title={props.title}
      checked={state.checked}
      onPress={() => { setState({ checked: !state.checked })}}
      containerStyle={{ flex: 1, backgroundColor: props.bColor, borderRadius: 15, overflow: 'hidden',}}
      checkedIcon={props.state === 'failed' ? taskFailedIcon() : taskCompletedIcon()}
      uncheckedIcon={<Feather name="circle" size={24} color="black" />}
    />
    </View>
    )
}

//Make it more professional, but it will be used to return a different component based on props
const isSpooky = (props) => {
  var die = props.ne;
  return die ? 'Spooky' : 'Not Spooky';
}

export default MyComponent