import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
  - backgroundColor: defines the color for the header bar.
  - buttonColor: defines the color for the buttons, it will only change the button icon, not the container.
*/
export const HabitHeader = (props) => {
  const route = useRoute();
  return (
    <Header
      containerStyle={{ maxHeight: 70, marginBottom: 15 }}
      backgroundColor={props.backgroundColor}
      leftComponent={HeaderMenuButton(props)}
      leftContainerStyle={{ marginHorizontal: 10, marginBottom: 10 }}
      rightComponent={route.name==='Home' ? {} : HeaderHomeButton(props)}
      rightContainerStyle={{ marginHorizontal: 10, marginBottom: 10 }} />
  )
}