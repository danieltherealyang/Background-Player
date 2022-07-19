import { TouchableHighlight, Image, View, Text } from 'react-native';
import { GLOBAL_STYLES } from './constant';

export default function PlaylistCard(props) {
  return (
    <TouchableHighlight
      style={{width: '100%'}}
      activeOpacity={1}
      underlayColor="#DDDDDD"
      onPress={() => props.onPress()}
    >
      <View style={{flexDirection: 'row', width: '100%', padding: 24}}>
        <View>
          <Image
            style={{width: 80, aspectRatio: 1}}
            source={{uri: props.thumbnail}}
          />
        </View>
        <View style={{paddingLeft: 24, flexGrow: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text style={GLOBAL_STYLES.titlenf}>{props.name}</Text>
          <Text style={GLOBAL_STYLES.infonf}>{props.videoCount + ' videos'}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export function MappedPlaylists(jsonArray, onPress) {
  return (
    <View style={{width: '100%'}}>
      {jsonArray.map((playlist, index) =>
        <PlaylistCard
          key={index}
          onPress={() => onPress(playlist['snippet']['title'], playlist['snippet']['thumbnails']['high']['url'], playlist['id'])}
          id={playlist['id']}
          thumbnail={playlist['snippet']['thumbnails']['high']['url']}
          name={playlist['snippet']['localized']['title']}
          videoCount={playlist['contentDetails']['itemCount']}
        />
      )}
    </View>
  );
}