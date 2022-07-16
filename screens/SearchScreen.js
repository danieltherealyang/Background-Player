import { useState, useRef } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import SearchBar from '../components/searchbar';
import { MappedCards } from '../components/videocard';
import { GLOBAL_STYLES, BOTTOM_SCROLL_PADDING } from '../components/constant';
import { fetchQuery } from '../components/query';
import VideoScreen from './VideoScreen';
import MiniCard from '../components/minicard';

export default function SearchScreen({ route, navigation }) {
  console.log('Search Screen rendering');
  const {backScreen} = route.params;
  const scrollRef = useRef();
  const [ query, setQuery ] = useState("");
  const [ queryList, setQueryList ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ pageToken, setPageToken ] = useState("");
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ videoData, setVideoData ] = useState({});
  const [ dismissed, setDismissed ] = useState(true);
  const [ thumbnail, setThumbnail ] = useState(null);
  const videoCards = MappedCards(queryList,
    (source, title, views, date, profile, channel, subscribers, description, thumbnail) => {
      setModalVisible(true);
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
  const videoScreen = (!dismissed) ? <VideoScreen data={videoData} setData={setVideoData} setThumbnail={setThumbnail} modalVisible={modalVisible} setModalVisible={setModalVisible}/> : null;
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
      {videoScreen}
      <SearchBar
        query={query}
        setQuery={setQuery}
        setState={setQueryList}
        backHandle={() => navigation.navigate(backScreen)}
        tokenArray={tokenArray}
        setTokenArray={setTokenArray}
        pageToken={pageToken}
        setPageToken={setPageToken}
        scrollRef={scrollRef}
      />
      <ScrollView
        style={{flexGrow: 1}}
        ref={scrollRef}
        onScroll={
          (event) => {
            let maxOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
            if (event.nativeEvent.contentOffset.y >= maxOffset + BOTTOM_SCROLL_PADDING) {
              fetchQuery(query, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken);
            }
          }
        }
        scrollEventThrottle={16}
        zIndex={1}
      >
        {videoCards}
      </ScrollView>
      <MiniCard title={videoData['title']} thumbnail={thumbnail} dismissed={dismissed} setModalVisible={setModalVisible} setDismissed={setDismissed}/>
    </SafeAreaView>
  );
}