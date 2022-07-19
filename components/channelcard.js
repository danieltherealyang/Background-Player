import { TouchableHighlight, View, Image, Text } from 'react-native';
import { GLOBAL_STYLES, GRAY } from './constant';
import { getShortNum } from './etc';

export default function ChannelCard(props) {
  return (
    <TouchableHighlight
      style={{width: '100%', borderBottomColor: GRAY, borderBottomWidth: 1}}
      activeOpacity={1}
      underlayColor="#DDDDDD"
      onPress={() => props.onPress()}
    >
      <View style={{flexDirection: 'row', width: '100%', paddingLeft: 24}}>
        <View style={{padding: 24, paddingRight: 48}}>
          <Image
            style={{width: 80, borderRadius: 80, aspectRatio: 1}}
            source={{uri: props.profile}}
          />
        </View>
        <View style={{flexDirection: 'row', flexGrow: 1, alignItems: 'center'}}>
          <View style={{height: '50%', flexGrow: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <Text style={GLOBAL_STYLES.titlenf}>{props.name}</Text>
            <Text style={GLOBAL_STYLES.infonf}>{(props.subscribers ? getShortNum(props.subscribers) : 'hidden') + ' subscribers' + ' • ' + getShortNum(props.videoCount) + ' videos'}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export function MappedChannels(jsonArray, onPress) {
  return (
    <View style={{width: '100%'}}>
      {jsonArray.map((channel, index) => 
        <ChannelCard
          key={index}
          onPress={() => onPress(channel['snippet']['title'], channel['snippet']['thumbnails']['high']['url'], channel['id'])}
          name={channel['snippet']['title']}
          profile={channel['snippet']['thumbnails']['high']['url']}
          subscribers={channel['statistics']['subscriberCount']}
          videoCount={channel['statistics']['videoCount']}
        />
      )}
    </View>
  );
}