import { useState, useRef } from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import SearchBar from '../components/searchbar';
import { MappedCards } from '../components/videocard';
import { GLOBAL_STYLES, BOTTOM_SCROLL_PADDING } from '../components/constant';
import { fetchQuery } from '../components/query';

export default function SearchScreen({ route, navigation }) {
  console.log('Search Screen rendering');
  const {backScreen} = route.params;
  const scrollRef = useRef();
  const [ query, setQuery ] = useState("");
  const [ queryList, setQueryList ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ pageToken, setPageToken ] = useState("");
  const videoCards = MappedCards(queryList,
    (source) => navigation.navigate('Video', {source: source})
  );
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
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
      >
        {videoCards}
      </ScrollView>
    </SafeAreaView>
  );
}
