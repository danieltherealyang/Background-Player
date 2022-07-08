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
  const [ pageToken, setPageToken ] = useState("");
  useEffect(() => {
    fetchTrending(setTrending, tokenArray, setTokenArray, pageToken, setPageToken);
  }, []);
  const trendingPage = MappedCards(trending);
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
      <Header
        searchHandle={() => navigation.navigate("Search", {backScreen: "Home"})}
        onBottomScroll={() => {}}//fetchTrending(setTrending, tokenArray, setTokenArray, pageToken, setPageToken)}
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
  if (pageToken) {
    if (tokenArray.has(pageToken))
      return;
    api_url += '&pageToken=' + pageToken;
    setTokenArray(tokenArray.add(pageToken));
  }
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