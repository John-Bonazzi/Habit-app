import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 
import React, { useState } from 'react';

export const HabitDrawer = (props, theme) => {
  const index = props.state.index;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        {...props}
        label='Home'
        icon={({color, size}) =><FontAwesome5 name="tasks" size={size} color={color} />}
        labelStyle={{textAlign: 'right', justifyContent: 'flex-end'}}
        focused={index === 0}
        onPress={() => { props.navigation.navigate('Home', {mode: 'default', filter: 'all'}); }}
      />
      <DrawerItem
        label='Incomplete'
        icon={({color, size}) => <MaterialIcons name="subdirectory-arrow-right" size={size} color={color} />}
        labelStyle={{textAlign: 'right', justifyContent: 'flex-end', alignContent: 'center', marginLeft: 15}}
        onPress={({focused}) => {focused = true; props.navigation.navigate('Home', {mode: 'default', filter: 'incomplete'}); }}
      />
      <DrawerItem
        label='Completed'
        icon={({color, size}) => <MaterialIcons name="subdirectory-arrow-right" size={size} color={color} />}
        labelStyle={{textAlign: 'right', justifyContent: 'flex-end', alignContent: 'center', marginLeft: 15}}
        onPress={() => {props.navigation.navigate('Home', {mode: 'default', filter: 'completed'}); }}
      />
      <DrawerItem
        {...props}
        label='Settings'
        icon={({color, size}) => <Feather name="settings" size={size} color={color}/>}
        focused={index === 1}
        onPress={() => { props.navigation.navigate('Settings') }} 
        labelStyle={{textAlign: 'right', justifyContent: 'flex-end'}}
      />
    </DrawerContentScrollView>
  )
}