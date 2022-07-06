import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import VideoCard from '../components/videocard';
import Header from '../components/header';
import { API_URL, API_KEY } from '../credentials/api_cred';

const jsonArray = [];
for (let i = 0; i < 20; i++) {
  jsonArray.push(
    <View style={{padding: 20}} key={i}>
      <Text>{i}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  console.log('Home Screen rendering');
  const [ trending, setTrending ] = useState([]);
  useEffect(() => {
    fetchTrending(setTrending);
  }, []);
  const trendingPage = Trending(trending);
  return (
    <SafeAreaView>
      <Header searchHandle={() => navigation.navigate("Search", {backScreen: "Home"})}>
        {trendingPage}
      </Header>
    </SafeAreaView>
  );
}

async function fetchTrending(setState) {
  console.log('fetching Trending');
  var api_url = API_URL
    + 'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key='
    + API_KEY;
  var queries = await fetch(api_url).then(response => response.json()).then(json => json['items']);
  console.log(queries);
  setState(queries);
}

function Trending(jsonArray) {
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