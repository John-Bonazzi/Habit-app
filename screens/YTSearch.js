import React, { useEffect, useState } from 'react';
import { getVideos } from '../api/YTServer';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Image } from 'react-native-elements';



const YTSearch = ({route, navigation}) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    if (route.params?.search){
      getVideos(route.params.search, (data) =>{
        setVideos(data.items);
      })
    }
  }, [route.params?.search]
  )

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
          leftElement={
            <Image 
              source={{uri: item.snippet.thumbnails.default.url}}
              style={{width: 100, height: 55 }}
            />
          }
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.screen} >
      <FlatList 
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        extraData={videos}
        renderItem={renderVideo}

      />
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