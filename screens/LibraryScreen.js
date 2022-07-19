import { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Header from '../components/header';
import Login from '../credentials/login';
import { FETCH_HEADER, GLOBAL_STYLES } from '../components/constant';
import { API_URL, API_KEY } from '../credentials/api_cred';
import { AccessTokenContext } from '../components/constant';
import { MappedPlaylists } from '../components/playlistcard';
import { fetchPlaylistVideos } from '../components/query';

export default function LibraryScreen({ navigation }) {
  const { accessToken } = useContext(AccessTokenContext);
  const [ playlists, setPlaylists ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ pageToken, setPageToken ] = useState("");
  useEffect(() => {
    fetchPlaylists(accessToken, setPlaylists, tokenArray, setTokenArray, pageToken, setPageToken);
  }, [accessToken]);
  const playlistCards = MappedPlaylists(playlists,
    (name, profile, id) => {
      navigation.navigate("VideoList", {
        backScreen: "Library",
        name: name,
        profile: profile,
        id: id,
        fetchfn: (id, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) => fetchPlaylistVideos(id, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery)
      }
    );
  });
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
      <Login icon={"library-sharp"} text={"Sign in to access your favorite videos"}/>
      <Header searchHandle={() => navigation.navigate("Search", {backScreen: "Library",})}>
        {playlistCards}
      </Header>
    </SafeAreaView>
  );
}

async function fetchPlaylists(accessToken, setState, tokenArray, setTokenArray, pageToken, setPageToken) {
  if (!accessToken) {
    setState([]);
    setTokenArray(new Set());
    setPageToken("");
    return;
  }
  if (!pageToken && tokenArray.size)
    return;
  var searchlist_url = API_URL
    + 'playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true'
    + '&key=' + API_KEY;
  if (pageToken) {
    if (tokenArray.has(pageToken))
      return;
    searchlist_url += '&pageToken=' + pageToken;
    setTokenArray(tokenArray.add(pageToken));
  }
  var json = await fetch(searchlist_url, {
    headers: { Authorization: 'Bearer ' + accessToken, ...FETCH_HEADER}
  }).then(response => response.json());
  setPageToken(json['nextPageToken']);
  setState((prevState) => prevState.concat(json['items']));
}

const fakeData = {
  "kind": "youtube#playlist",
  "etag": "XD_YT192Ok9pHNZ4JJN47z01mtE",
  "id": "PL1tRdDNKYv9FOayuUMsynRtcNpeuaHLo-",
  "snippet": {
    "publishedAt": "2021-12-18T05:51:08Z",
    "channelId": "UCcEkPGwn9HixaFBvCnWmbvg",
    "title": "Propaganda Songs",
    "description": "",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/tZ228CKcPgs/default.jpg",
        "width": 120,
        "height": 90
      },
      "medium": {
        "url": "https://i.ytimg.com/vi/tZ228CKcPgs/mqdefault.jpg",
        "width": 320,
        "height": 180
      },
      "high": {
        "url": "https://i.ytimg.com/vi/tZ228CKcPgs/hqdefault.jpg",
        "width": 480,
        "height": 360
      },
      "standard": {
        "url": "https://i.ytimg.com/vi/tZ228CKcPgs/sddefault.jpg",
        "width": 640,
        "height": 480
      },
      "maxres": {
        "url": "https://i.ytimg.com/vi/tZ228CKcPgs/maxresdefault.jpg",
        "width": 1280,
        "height": 720
      }
    },
    "channelTitle": "Daniel Yang",
    "localized": {
      "title": "Propaganda Songs",
      "description": ""
    }
  },
  "contentDetails": {
    "itemCount": 13
  }
};