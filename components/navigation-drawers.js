import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import React from 'react';

export const HabitDrawer = (props) => {
  const index = props.state.index;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label='Home'
        focused={index === 0}
        onPress={() => { props.navigation.navigate('Home'); }} />
      <DrawerItem
        label='Settings'
        focused={index === 2}
        onPress={() => { props.navigation.navigate('Settings') }} />
    </DrawerContentScrollView>
  )
}