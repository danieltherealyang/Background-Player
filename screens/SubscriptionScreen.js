import { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { FETCH_HEADER, GLOBAL_STYLES } from '../components/constant';
import Header from '../components/header';
import Login from '../credentials/login';
import { API_URL, API_KEY } from '../credentials/api_cred';
import { AccessTokenContext } from '../components/constant';
import { MappedChannels } from '../components/channelcard';
import { fetchChannelVideos } from '../components/query';

export default function SubscriptionScreen({ navigation }) {
  const { accessToken } = useContext(AccessTokenContext);
  const [ channels, setChannels ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ pageToken, setPageToken ] = useState("");
  useEffect(() => {
    fetchSubscriptions(accessToken, setChannels, tokenArray, setTokenArray, pageToken, setPageToken);
  }, [accessToken]);
  const channelCards = MappedChannels(channels, 
    (name, profile, id) => {
      navigation.navigate("VideoList", {
        backScreen: "Subscription",
        name: name,
        profile: profile,
        id: id,
        circle: true,
        fetchfn: (id, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) => fetchChannelVideos(id, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery)
      }
    );
  });
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
      <Login icon={"albums-sharp"} text={"Sign in to see updates from your favorite channels"}/>
      <Header
        searchHandle={() => navigation.navigate("Search", {backScreen: "Subscription",})}
        onBottomScroll={() => fetchSubscriptions(accessToken, setChannels, tokenArray, setTokenArray, pageToken, setPageToken)}
      >
        {channelCards}
      </Header>
    </SafeAreaView>
  );
}

async function fetchSubscriptions(accessToken, setState, tokenArray, setTokenArray, pageToken, setPageToken) {
  if (!accessToken) {
    setState([]);
    setTokenArray(new Set());
    setPageToken("");
    return;
  }
  if (!pageToken && tokenArray.size)
    return;
  var searchlist_url = API_URL
    + 'subscriptions?part=snippet%2CcontentDetails&mine=true'
    + '&key=' + API_KEY;
  if (pageToken) {
    if (tokenArray.has(pageToken))
      return;
    searchlist_url += '&pageToken=' + pageToken;
    setTokenArray(tokenArray.add(pageToken));
  }
  var searchjson = await fetch(searchlist_url, {
    headers: {Authorization: 'Bearer ' + accessToken, ...FETCH_HEADER}
  }).then(response => response.json());
  var channelIds = searchjson['items'].map((channel) => channel['snippet']['resourceId']['channelId']).join('%2C');
  var channellist_url = API_URL
    + 'channels?part=snippet%2CcontentDetails%2Cstatistics&maxResults=5'
    + '&id=' + channelIds
    + '&key=' + API_KEY;
  var json = await fetch(channellist_url).then(response => response.json());
  setPageToken(searchjson['nextPageToken'] ? searchjson['nextPageToken'] : "");
  setState((prevState) => prevState.concat(json['items']));
}

const fakeData = {
  "kind": "youtube#channel",
  "etag": "ASXE3rsEnS9QvuJJTFZV5xzZbV0",
  "id": "UC-eegKVWEgBCa4OzjnK_PtA",
  "snippet": {
    "title": "TLDR News EU",
    "description": "",
    "customUrl": "tldrnewseu",
    "publishedAt": "2019-12-02T11:53:43.394738Z",
    "thumbnails": {
      "default": {
        "url": "https://yt3.ggpht.com/ytc/AKedOLRSg9sXE-d6IL-2LK00YT76vhN7as_AbwTEfPpJbA=s88-c-k-c0x00ffffff-no-rj",
        "width": 88,
        "height": 88
      },
      "medium": {
        "url": "https://yt3.ggpht.com/ytc/AKedOLRSg9sXE-d6IL-2LK00YT76vhN7as_AbwTEfPpJbA=s240-c-k-c0x00ffffff-no-rj",
        "width": 240,
        "height": 240
      },
      "high": {
        "url": "https://yt3.ggpht.com/ytc/AKedOLRSg9sXE-d6IL-2LK00YT76vhN7as_AbwTEfPpJbA=s800-c-k-c0x00ffffff-no-rj",
        "width": 800,
        "height": 800
      }
    },
    "localized": {
      "title": "TLDR News EU",
      "description": ""
    },
    "country": "GB"
  },
  "contentDetails": {
    "relatedPlaylists": {
      "likes": "",
      "uploads": "UU-eegKVWEgBCa4OzjnK_PtA"
    }
  },
  "statistics": {
    "viewCount": "66216991",
    "subscriberCount": "462000",
    "hiddenSubscriberCount": false,
    "videoCount": "265"
  }
};