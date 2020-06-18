import React, {useState} from 'react';
import { TouchableHighlight, View,TouchableOpacity, Keyboard } from 'react-native';
import { Input, ThemeConsumer } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import { useTheme } from '@react-navigation/native';

const Calendar = (props) => {
  const theme = useTheme()
  if(!props.showCalendar){
    return (<View/>);
  }
  else{
    return(
      <View style={{backgroundColor: theme.colors.background}}>
      <CalendarPicker
        onDateChange={value => {props.setter({due_date: new Date(value).toString()})}}
        selectedDayTextColor='black'
        textStyle={{color: theme.colors.text}}
        selectedDayColor={theme.colors.primary}
      />
      </View>
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
          inputContainerStyle={{marginRight: 30}}
          containerStyle={{marginLeft: 15}}
          label="Select date"
          value={date.toLocaleDateString()}
        />
      </TouchableOpacity>
      <Calendar showCalendar={props.show} setter={props.setter}/>
    </View>
  )
}