import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { useNavigation,useRoute, useTheme  } from '@react-navigation/native';



const HeaderMenuButton = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()} >
      <MaterialIcons name="menu" size={34} color={props.myColors.editButton} />

    </TouchableOpacity>
  )
}

const HeaderHomeButton = (props, theme) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        props.cleaner ? props.cleaner('') : {};
        navigation.navigate('Home', {mode: 'default', task: null});
        }} >
      <MaterialIcons name="home" size={34} color={theme.myColors.newButton} />
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
  const theme = useTheme();
  return (
    <Header
      containerStyle={{ maxHeight: 80, marginBottom: 15, borderBottomWidth: 0}}
      backgroundColor={props.backgroundColor}
      barStyle='default'
      centerComponent={<Text adjustsFontSizeToFit style={{ fontSize: props.titleSize, color: props.textColor, marginBottom: 30}}>{props.title}</Text>}
      leftComponent={HeaderMenuButton(theme)}
      leftContainerStyle={{ marginHorizontal: 10, marginBottom: 25}}
      rightComponent={route.name==='Home' ? {} : HeaderHomeButton(props, theme)}
      rightContainerStyle={{ marginHorizontal: 10, marginBottom: 25 }} />
  )
}