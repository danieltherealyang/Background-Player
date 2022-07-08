import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { MappedCards } from '../components/videocard';
import Header from '../components/header';
import { GLOBAL_STYLES } from '../components/constant';
import { API_URL, API_KEY } from '../credentials/api_cred';

export default function HomeScreen({ navigation }) {
  console.log('Home Screen rendering');
  const [ trending, setTrending ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ nextPageToken, setNextPageToken ] = useState("");
  useEffect(() => {
    fetchTrending(setTrending, tokenArray, setTokenArray, nextPageToken, setNextPageToken);
  }, []);
  const trendingPage = MappedCards(trending);
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
      <Header
        searchHandle={() => navigation.navigate("Search", {backScreen: "Home"})}
        onBottomScroll={() => {}}//fetchTrending(setTrending, tokenArray, setTokenArray, nextPageToken, setNextPageToken)}
      >
        {trendingPage}
      </Header>
    </SafeAreaView>
  );
}

async function fetchTrending(setState, tokenArray, setTokenArray, pageToken, setPageToken) {
  var api_url = API_URL
    + 'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=10&key='
    + API_KEY;
  if (pageToken)
    if (tokenArray.has(pageToken))
      return;
    api_url += '&pageToken=' + pageToken;
    setTokenArray(tokenArray.add(pageToken));
  var json = await fetch(api_url).then(response => response.json());
  setState((prevState) => prevState.concat(json['items']));
  setPageToken(json['nextPageToken']);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const query = {
  "contentDetails": {
    "caption": "false",
    "contentRating": {},
    "definition": "hd",
    "dimension": "2d",
    "duration": "PT32M52S",
    "licensedContent": true,
    "projection": "rectangular",
  },
  "etag": "kHuXlLImCUeqZSqToPHo3bnruXU",
  "id": "xcGiyOxZpCw",
  "kind": "youtube#video",
  "snippet": {
    "categoryId": "24",
    "channelId": "UCyps-v4WNjWDnYRKmZ4BUGw",
    "channelTitle": "Airrack",
    "defaultAudioLanguage": "en",
    "description": "Thanks to SoFi for sponsoring the video! Enter to win $10,000: https://sofi.app.link/airrack \
Must download & open an account to enter. \
T&Cs: https://bit.ly/3ynn2Z9 \
\
Follow me on Instagram! \
INSTAGRAM ▶️ https://urlgeni.us/instagram/jBHg \
\
FOLLOW MY FRIENDS:\
Mack: https://www.instagram.com/mack\
Tyler: https://www.youtube.com/c/tylerblanchard\
\
Outtro song ▶️ Axel Thesleff - Bad Karma\
YouTube: https://bit.ly/3k6Uadj\
Spotify: https://spoti.fi/3odq3TN\
Instagram: https://bit.ly/3lsccaz",
    "liveBroadcastContent": "none",
    "localized": {
      "description": "Thanks to SoFi for sponsoring the video! Enter to win $10,000: https://sofi.app.link/airrack \
      Must download & open an account to enter. \
      T&Cs: https://bit.ly/3ynn2Z9 \
      \
      Follow me on Instagram! \
      INSTAGRAM ▶️ https://urlgeni.us/instagram/jBHg \
      \
      FOLLOW MY FRIENDS:\
      Mack: https://www.instagram.com/mack\
      Tyler: https://www.youtube.com/c/tylerblanchard\
      \
      Outtro song ▶️ Axel Thesleff - Bad Karma\
      YouTube: https://bit.ly/3k6Uadj\
      Spotify: https://spoti.fi/3odq3TN\
      Instagram: https://bit.ly/3lsccaz",
      "title": "I Trapped 25 Strangers In A House",
    },
    "publishedAt": "2022-07-04T16:05:17Z",
    "thumbnails": {
      "default": {
        "height": 90,
        "url": "https://i.ytimg.com/vi/xcGiyOxZpCw/default.jpg",
        "width": 120,
      },
      "high": {
        "height": 360,
        "url": "https://i.ytimg.com/vi/xcGiyOxZpCw/hqdefault.jpg",
        "width": 480,
      },
      "maxres": {
        "height": 720,
        "url": "https://i.ytimg.com/vi/xcGiyOxZpCw/maxresdefault.jpg",
        "width": 1280,
      },
      "medium": {
        "height": 180,
        "url": "https://i.ytimg.com/vi/xcGiyOxZpCw/mqdefault.jpg",
        "width": 320,
      },
      "standard": {
        "height": 480,
        "url": "https://i.ytimg.com/vi/xcGiyOxZpCw/sddefault.jpg",
        "width": 640,
      },
    },
    "title": "I Trapped 25 Strangers In A House",
  },
  "statistics": {
    "commentCount": "14414",
    "favoriteCount": "0",
    "likeCount": "211398",
    "viewCount": "3163078",
  },
}