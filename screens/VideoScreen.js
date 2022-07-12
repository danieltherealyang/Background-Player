import { useState, useEffect, useRef } from 'react';
import { StatusBar, SafeAreaView, View, ScrollView, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { GLOBAL_STYLES } from '../components/constant';
import { clearQuery, fetchRelated } from '../components/query';
import { MappedCards } from '../components/videocard';
import { BOTTOM_SCROLL_PADDING } from '../components/constant';

export default function VideoScreen({ route, navigation }) {
  const {source} = route.params;
  const scrollRef = useRef();
  const [ videoId, setVideoId ] = useState('');
  console.log(source);
  const [ queryList, setQueryList ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ pageToken, setPageToken ] = useState("");
  useEffect(() => {
    fetchRelated(source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken);
  }, []);
  const videoCards = MappedCards(queryList,
    (source) => {
      clearQuery(setTokenArray, setPageToken);
      setVideoId(source);
      fetchRelated(source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, true);
      scrollRef.current?.scrollTo({ y: 0, animated: false});
    }
  );
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
      <StatusBar hidden={true}/>
      <View style={{width: '100%', height: undefined, aspectRatio: 16/9}}>
        <WebView
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
          source={{uri: 'https://www.youtube.com/embed/' + source + '?autoplay=1'}}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        onScroll={
          (event) => {
            let maxOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
            if (event.nativeEvent.contentOffset.y >= maxOffset + BOTTOM_SCROLL_PADDING) {
              fetchRelated(source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken);
            }
          }
        }
        scrollEventThrottle={16}
      >
        {videoCards}
      </ScrollView>
    </SafeAreaView>
  );
}