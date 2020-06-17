import React from 'react'
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const YTViewer = ({route, params}) =>{
  return(
    <View style={styles.screen}>
      <WebView
        javaScriptEnabled
        domStorageEnabled
        source={{
          uri: `https://www.youtube.com/embed/${route.params.video.id.videoId}`
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

export default YTViewer;