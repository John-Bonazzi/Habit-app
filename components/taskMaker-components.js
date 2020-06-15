import React, {useState} from 'react';
import { TouchableHighlight, View,TouchableOpacity, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';

const Calendar = (props) => {
  if(!props.showCalendar){
    return (<View/>);
  }
  else{
    return(
      <CalendarPicker
        onDateChange={value => {props.setter({due_date: value})}}  
      />
    )
  }
}

export const DatePicker = (props) => {
  const date = props.selectedStartDate ? new Date(props.selectedStartDate) : new Date();;
  return(
    <View>
      <TouchableOpacity onPress={() => {Keyboard.dismiss(); props.showSetter(!props.show)}}>  
        <Input 
          editable={false}
          label="Select date"
          value={date.toLocaleDateString()}
        />
      </TouchableOpacity>
      <Calendar showCalendar={props.show} setter={props.setter}/>
    </View>
  )
}