import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { API_URL, API_KEY } from '../credentials/api_cred';
import { GLOBAL_STYLES } from './constant';
import { getDateTime, getDTdiff, getShortNum } from './etc';

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
      onPress={() => props.onPress(channelInfo['snippet']['thumbnails']['default']['url'], channelInfo['statistics']['subscriberCount'])}
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
  var api_url = API_URL
    + 'channels?part=snippet%2CcontentDetails%2Cstatistics&id=' + channelId + '&key='
    + API_KEY;
  var queries = await fetch(api_url).then(response => response.json()).then(json => json['items'][0]).catch(err => '');
  setState(queries);
}

function VideoInfo(props) {
  return (
      <View style={{flexDirection: 'row', width: '100%', padding: 12}}>
        <Image
          style={{width: 44, borderRadius: 44, aspectRatio: 1}}
          source={{uri: props.profile}}
        />
        <View style={{flex: 1, paddingLeft: 12}}>
          <Text style={GLOBAL_STYLES.title} numberOfLines={2} ellipSizeMode="tail">
            {props.title}
          </Text>
          <Text style={GLOBAL_STYLES.info} numberOfLines={2} ellipSizeMode="tail">
            {props.channel + ' • ' + getShortNum(props.views) + ' views' + ' • ' + getDTdiff(props.date, getDateTime()) + ' ago'}
          </Text>
        </View>
      </View>
  );
}

export function MappedCards(jsonArray, onPress) {
  return jsonArray.map((video, index) => 
    <VideoCard
      onPress={(profile, subscribers) => 
        onPress(video['id'], video['snippet']['title'], video['statistics']['viewCount'], video['snippet']['publishedAt'], profile, video['snippet']['channelTitle'], subscribers, video['snippet']['description'], video['snippet']['thumbnails']['high']['url'], index)}
      key={index}
      thumbnail={video['snippet']['thumbnails']['high']['url']}
      title={video['snippet']['title']}
      channel={video['snippet']['channelTitle']}
      channelId={video['snippet']['channelId']}
      views={video['statistics']['viewCount']}
      date={video['snippet']['publishedAt']}
    />
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
    height: undefined,
    aspectRatio: 16/9,
  },
});