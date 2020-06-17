import React, { useEffect, useState } from 'react';
import { getVideos } from '../api/YTServer';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Image,Button } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';



const YTSearch = ({route, navigation}) => {
  const theme = useTheme();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    if (route.params?.search){
      getVideos(route.params.search, (data) =>{
        setVideos(data.items);
      })
    }
  }, [route.params?.search]
  )

  const RenderError = () => {
    return(
      <View style={{flex:1, alignContent: 'center', justifyContent: 'center', backgroundColor: theme.colors.background}}>
        <Text style={{ fontSize: 50, textAlign: 'center', textAlignVertical: 'center', color: theme.colors.text}}>No results</Text>
        <Button  
          title={'Go Back'} 
          titleStyle={{color: theme.colors.text}}
          buttonStyle={{width: 150, backgroundColor: theme.colors.border}} 
          containerStyle={{alignSelf: 'center'}} 
          onPress={() => navigation.goBack()}/>
      </View>
    )
  }

  const renderVideo = ({index, item}) =>{
    return(
      <TouchableOpacity
        onLongPress={() =>{
          navigation.navigate('Viewer', {video: item})
        }}
        onPress={() => {
          navigation.navigate('Create', {video: item});
        }}
      >
        <ListItem
          key={index}
          title={item.snippet.title}
          leftElement={item.snippet.title ?
            <Image 
              source={{uri: item.snippet.thumbnails.default.url}}
              style={{width: 100, height: 55 }}
            /> : <Text>No results</Text>
          }
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.screen} >
      {videos.length ?
      <FlatList 
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        extraData={videos}
        renderItem={renderVideo}

      /> : <RenderError />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },
})

export default YTSearch;