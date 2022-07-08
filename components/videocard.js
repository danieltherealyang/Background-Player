import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { API_URL, API_KEY } from '../credentials/api_cred';

export default function VideoCard(props) {
  const [ channelInfo, setChannelInfo ] = useState({});
  useEffect(() => {
    fetchChannel(props.channelId, setChannelInfo);
  }, []);
  return (
    <TouchableHighlight
      style={{paddingBottom: 12}}
      activeOpacity={1}
      underlayColor="#DDDDDD"
      onPress={() => {}}
    >
      <View>
        <Image
          style={styles.thumbnail}
          resizeMode='cover'
          source={{uri: props.thumbnail}}
        />
        <VideoInfo
          title={props.title}
          channel={props.channel}
          views={props.views}
          date={props.date}
          profile={channelInfo['snippet'] ? channelInfo['snippet']['thumbnails']['default']['url'] : null}
        />
      </View>
    </TouchableHighlight>
  );
}

async function fetchChannel(channelId, setState) {
  console.log('fetching channel');
  var api_url = API_URL
    + 'channels?part=snippet%2CcontentDetails%2Cstatistics&id=' + channelId + '&key='
    + API_KEY;
  var queries = await fetch(api_url).then(response => response.json()).then(json => json['items'][0]);
  setState(queries);
  console.log(channelId);
}

function VideoInfo(props) {
  return (
      <View style={{flexDirection: 'row', width: '100%', padding: 12}}>
        <Image
          style={{width: 44, borderRadius: 44, aspectRatio: 1}}
          source={{uri: props.profile}}
        />
        <View style={{flex: 1, paddingLeft: 12}}>
          <Text style={styles.title} numberOfLines={2} ellipSizeMode="tail">
            {props.title}
          </Text>
          <Text style={styles.info} numberOfLines={1} ellipSizeMode="tail">
            {props.channel + ' • ' + props.views + ' • ' + props.date}
          </Text>
        </View>
      </View>
  );
}

export function MappedCards(jsonArray) {
  return (
    <View>
      {jsonArray.map((video, index) => 
        <VideoCard
          key={index}
          thumbnail={video['snippet']['thumbnails']['high']['url']}
          title={video['snippet']['title']}
          channel={video['snippet']['channelTitle']}
          channelId={video['snippet']['channelId']}
          views={video['statistics']['viewCount']}
          date={video['snippet']['publishedAt']}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
    height: undefined,
    aspectRatio: 16/9,
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
  },
  info: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 13,
    color: '#6b6b6b',
  },
});