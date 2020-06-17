import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import {Button} from 'react-native-elements';
import WebView from 'react-native-webview';
import { useTheme } from '@react-navigation/native';



const YTViewer = ({route, navigation}) =>{
  const theme = useTheme();
  const ErrorPage = () => {
    return(
    <View style={{flex:1, alignContent: 'center', justifyContent: 'center', backgroundColor: theme.colors.background}}>
          <Text style={{ fontSize: 50, textAlign: 'center', textAlignVertical: 'center', color: theme.colors.text}}>Video not found</Text>
          <Button  
            title={'Go Back'} 
            titleStyle={{color: theme.colors.text}}
            buttonStyle={{width: 150, backgroundColor: theme.colors.border}} 
            containerStyle={{alignSelf: 'center'}} 
            onPress={() => navigation.goBack()}/>
        </View>
    )
  }
  return(
   route.params.video?.id ?
    <View style={styles.screen}>
      <WebView
        javaScriptEnabled
        domStorageEnabled
        source={{
          uri: `https://www.youtube.com/embed/${route.params.video.id.videoId}`
        }}
      />
    </View> : <ErrorPage/>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

export default YTViewer;