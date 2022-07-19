import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { MappedCards } from '../components/videocard';
import { GLOBAL_STYLES, BOTTOM_SCROLL_PADDING } from '../components/constant';
import { FETCH_THROTTLE } from '../components/constant';
import VideoScreen from './VideoScreen';
import MiniCard from '../components/minicard';
import ListBar from '../components/listbar';

export default function VideoListScreen({ route, navigation }) {
  const {backScreen, name, profile, id, circle, fetchfn} = route.params;
  const scrollRef = useRef();
  const [ queryList, setQueryList ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ pageToken, setPageToken ] = useState("");
  useEffect(() => {
    fetchfn(id, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken);
  }, []);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ videoData, setVideoData ] = useState({});
  const [ dismissed, setDismissed ] = useState(true);
  const [ thumbnail, setThumbnail ] = useState(null);
  const [ index, setIndex ] = useState(0);
  const videoCards = MappedCards(queryList,
    (source, title, views, date, profile, channel, subscribers, description, thumbnail, index) => {
      setModalVisible(true);
      setIndex(index);
      setDismissed(false);
      setVideoData({
        source: source,
        title: title,
        views: views,
        date: date,
        profile: profile,
        channel: channel,
        subscribers: subscribers,
        description: description,
      });
      setThumbnail(thumbnail);
    }
  );
  const videoScreen = (!dismissed) ?
    <VideoScreen
      data={videoData}
      fetchfn={() => {}}
      videoCards={videoCards.slice(index + 1)}
      setData={setVideoData}
      setThumbnail={setThumbnail}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    /> : null;
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
      {videoScreen}
      <ListBar
        channel={name}
        profile={profile}
        circle={circle}
        backHandle={() => navigation.navigate(backScreen)}
      />
      <ScrollView
        style={{flexGrow: 1}}
        ref={scrollRef}
        onScroll={
          (event) => {
            let maxOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
            if (event.nativeEvent.contentOffset.y >= maxOffset + BOTTOM_SCROLL_PADDING) {
              fetchfn(id, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken);
            }
          }
        }
        scrollEventThrottle={FETCH_THROTTLE}
      >
        {videoCards}
      </ScrollView>
      <MiniCard title={videoData['title']} thumbnail={thumbnail} dismissed={dismissed} setModalVisible={setModalVisible} setDismissed={setDismissed}/>
    </SafeAreaView>
  );
}