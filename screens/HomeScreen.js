import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { MappedCards } from '../components/videocard';
import Header from '../components/header';
import { GLOBAL_STYLES } from '../components/constant';
import { API_URL, API_KEY } from '../credentials/api_cred';
import { fakeData } from '../components/query';
import VideoScreen from './VideoScreen';
import MiniCard from '../components/minicard';

export default function HomeScreen({ navigation }) {
  console.log('Home Screen rendering');
  const [ trending, setTrending ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ pageToken, setPageToken ] = useState("");
  useEffect(() => {
    fetchTrending(setTrending, tokenArray, setTokenArray, pageToken, setPageToken);
  }, []);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ videoData, setVideoData ] = useState({});
  const [ dismissed, setDismissed ] = useState(true);
  const [ thumbnail, setThumbnail ] = useState(null);
  const trendingPage = MappedCards(trending,
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
      <Header
        searchHandle={() => navigation.navigate("Search", {backScreen: "Home"})}
        onBottomScroll={() => {}}//fetchTrending(setTrending, tokenArray, setTokenArray, pageToken, setPageToken)}
        minicard={
          <MiniCard 
            style={{position: 'absolute', bottom: 0, width: '100%'}}
            title={videoData['title']}
            thumbnail={thumbnail} dismissed={dismissed}
            setModalVisible={setModalVisible}
            setDismissed={setDismissed}
          />
        }
      >
        {trendingPage}
      </Header>
    </SafeAreaView>
  );
}

async function fetchTrending(setState, tokenArray, setTokenArray, pageToken, setPageToken) {
  // var api_url = API_URL
  //   + 'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=10&key='
  //   + API_KEY;
  // if (pageToken) {
  //   if (tokenArray.has(pageToken))
  //     return;
  //   api_url += '&pageToken=' + pageToken;
  //   setTokenArray(tokenArray.add(pageToken));
  // }
  // var json = await fetch(api_url).then(response => response.json());
  // setState((prevState) => prevState.concat(json['items']));
  // setPageToken(json['nextPageToken']);
  setState((prevState) => prevState.concat(fakeData['items']));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});