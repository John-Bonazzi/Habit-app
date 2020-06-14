import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const MyComponent = (props) => {
  return(
    <Button buttonStyle={{backgroundColor: props.bColor}} title='Hello, Component!'/>
  );
}

//Make it more professional, but it will be used to return a different component based on props
const isSpooky = (props) => {
  var die = props.ne;
  return die ? 'Spooky' : 'Not Spooky';
}

export default MyComponent