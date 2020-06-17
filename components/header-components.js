import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { useNavigation,useRoute  } from '@react-navigation/native';



const HeaderMenuButton = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()} >
      <MaterialIcons name="menu" size={24} color={props.buttonColor} />

    </TouchableOpacity>
  )
}

const HeaderHomeButton = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Home', {mode: 'default'})} >
      <MaterialIcons name="home" size={24} color={props.buttonColor} />
    </TouchableOpacity>
  )
}

/*
  This component defines a header for the Habit app.
  The header has a left component to toggle the navigation drawer,
  and a right component to go back to the Home screen.
  Required props:
  - navigation: used to toggle drawer and navigate, the component won't work without.
  Optional props:
  - title: provides a centered title for the header.
  - backgroundColor: defines the color for the header bar.
  - buttonColor: defines the color for the buttons, it will only change the button icon, not the container.
  - textColor: defines the color for the center component, the title
*/
export const HabitHeader = (props) => {
  const route = useRoute();
  return (
    <Header
      style={{shadowOpacity: 0, shadowRadius: 0, shadowOffset: {height: 0, width: 0}, elevation: 0}}
      containerStyle={{ maxHeight: 70, marginBottom: 15}}
      backgroundColor={props.backgroundColor}
      barStyle='default'
      centerComponent={<Text adjustsFontSizeToFit style={{ fontSize: props.titleSize, color: props.textColor, marginBottom: 30}}>{props.title}</Text>}
      leftComponent={HeaderMenuButton(props)}
      leftContainerStyle={{ marginHorizontal: 10, marginBottom: 25 }}
      rightComponent={route.name==='Home' ? {} : HeaderHomeButton(props)}
      rightContainerStyle={{ marginHorizontal: 10, marginBottom: 25 }} />
  )
}