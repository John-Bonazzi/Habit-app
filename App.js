import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DarkTheme, LightTheme } from './styles/themes';
import settings from './settings';
import merge from 'lodash.merge';

const userStyle = (settings.theme === 'light') ? {...LightTheme} : {...DarkTheme};

const defaultStyle = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>Open up App.js to start working on your app!</Text>
    </View>
  );
}

//FIXME: look at react-native-restart to support theme settings and reload app on theme change to apply new style
//https://www.npmjs.com/package/react-native-restart

const styles = StyleSheet.create(merge(defaultStyle, userStyle));
