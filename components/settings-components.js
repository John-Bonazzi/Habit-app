import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import { save_theme } from '../helpers/Loader';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

/*
  This component renders a bar with a title aligned to the left, and buttons to the right.
  There is no required number of buttons, but the code will misbehave if there are more than two.
  Simply put, it does everything by checking if either-or has been pressed, so more than two won't give any new functionality.
  Required props to be passed:
    - condition: this is the conditional value to be checked against. To keep the code simple, 
      the positive result of the condition should also be the first button passed, 
      or the button selection is going to be broken. If the condition is not passed, the second button is selected.
    - title: The text to display to the left.
    - buttonTitles: An Array of two elements containing either a string - that is going to be used as title for the button - or a React Native Component.
      Again, the first element in the array should match the condition when true.
    - setter: the function to update the value after the button has been pressed. If missing the buttons will do nothing once pressed.
    - saver: the function to store the new value to the storage.
    - options: the new values to store based on what button is pressed.
    - vals: the new values to apply, but are not stored.
  Optional props:
    - none for now, but will use styles for buttons background and selected buttons background
*/
export const OptionSelector = (props) => {
  const initIndex = props.condition ? 0 : 1;
  const [index, setIndex] = useState(initIndex);
  const title = props.title;
  const buttons = props.buttonTitles;
  const setTheme = props.setter;
  const saveTheme = props.saver;
  const options = props.options;
  const vals = props.vals;
  return (
    <View
      style={{ flex: 1, maxHeight: 50, flexDirection: 'row', justifyContent: 'center', backgroundColor: props.theme.colors.border, borderRadius: 20, marginVertical: 5, marginHorizontal: 20 }}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginLeft: 15}}>
        <Text
          adjustsFontSizeToFit
          allowFontScaling
          style={{ fontSize: 24, fontWeight: '700', color: props.theme.colors.text }}>{title}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
      <ButtonGroup
        onPress={(val) => {
          setIndex(val);
          const themeValue = !val ? options[0] : options[1];
          saveTheme(themeValue);
          !val ? setTheme(vals[0]) : setTheme(vals[1]);
        }}
        containerStyle={{ flex: 1, maxWidth: 200, borderRadius: 50}}
        buttonStyle={{width: 100}}
        buttons={buttons}
        selectedButtonStyle={{ backgroundColor: props.theme.myColors.optionButton }}
        selectedIndex={index}
      />
      </View>
    </View>
  )
}