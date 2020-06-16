import React, { useState } from 'react';
import {View, Text} from 'react-native';
import { CheckBox, Button, Card } from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from '@react-navigation/native';


const defineActions = (style) => {
  return [
    {
      color: 'green',
      text: "Spooky",
      icon: <Feather name="plus" size={24} color="black" />,
      name: 'bt_spooky',
      position: 1
    }
  ];
}

export const FloatingButton = (props) => {
  const navigation = useNavigation();
  const actions = defineActions(props.buttonStyle);
  return(
    <FloatingAction
        color={props.buttonStyle.color}
        actions={actions}
        overrideWithAction={true}
        onPressItem={name => {
          navigation.navigate("Create");
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
  const [state, setState] = useState(props.state !== "incomplete" ?  {checked: true} : { checked: false });
  return (
    <View style={{flexDirection: 'row'}}>
    <CheckBox
      title={props.title}
      textStyle={props.textStyle}
      checked={state.checked}
      onPress={() => { setState({ checked: !state.checked })}}
      containerStyle={{ flex: 1, backgroundColor: props.bColor, borderRadius: 15, overflow: 'hidden',}}
      checkedIcon={props.state === 'failed' ? taskFailedIcon() : taskCompletedIcon()}
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
        <Text>wow</Text>
      </Card>
  )
}
//Make it more professional, but it will be used to return a different component based on props
export const TaskView = (props) => {
  return props.card ? TaskCard(props) : TaskField(props);
}