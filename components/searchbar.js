import { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { API_KEY, API_URL } from '../credentials/api_cred';
import { PADDING } from './constant';

export default function SearchBar(props) {
  const HEADER_HEIGHT = 40;
  const [ query, setQuery ] = useState("");
  const [ querySuggest, setQuerySuggest ] = useState([]);
  const [ barFocused, setBarFocused ] = useState(false);
  useEffect(() => {
    suggestedQueries(query, setQuerySuggest);
  }, [query]);
  useEffect(() => {
    fetchQuery(props.setState);
  }, []);
  const backHandle = (barFocused) ? () => {Keyboard.dismiss()} : props.backHandle;
  return (
    <View style={{width: "100%", paddingTop: PADDING, paddingBottom: PADDING}}>
        <StaticHeader
          onFocus={() => setBarFocused(true)} 
          onBlur={() => setBarFocused(false)}
          buttonVisible={!query.length} 
          textValue={query} setQuery={setQuery} 
          backHandle={backHandle} 
          searchHandle={() => {}} 
          closeHandle={() => setQuery("")}
        />
        <View>
          {barFocused && querySuggest.map((suggestion, index) => 
            <QueryRow key={index} query={suggestion} setState={props.setState} setState={setQuery} length={query.length}/>
          )}
        </View>
    </View>
  );
}

async function fetchQuery(setState) {
  var videoIds = searchQueries['items'].map((video) => video['id']['videoId']).join('%2C');
  var vidlist_url = API_URL
    + 'videos?part=snippet%2CcontentDetails%2Cstatistics'
    + '&id=' + videoIds
    + '&key=' + API_KEY;
  var json = await fetch(vidlist_url).then(response => response.json());
  setState(json['items']);
  console.log(json);
}

const iconSize = 25;
const buttonSize = iconSize + 15;
const fontSize = 16;

function QueryRow(props) {
  return (
    <TouchableHighlight
      style={{paddingBottom: 8, paddingTop: 8}}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        props.setState(props.query);
        props.setState(<Text style={{borderColor: 'black', borderWidth: 5}}>{props.query}</Text>);
        Keyboard.dismiss();
      }}
    >
      <View style={{width: '100%', flexDirection: 'row', borderColor: 'black', borderWidth: 0}}>
        <View style={{paddingLeft: 15, paddingRight: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name='search-outline' size={iconSize}/>
        </View>
        <View style={{paddingLeft: 13, justifyContent: 'center', flexGrow: 1}}>
          <Text style={{fontSize: fontSize}}>
            <Text>{props.query.slice(0, props.length)}</Text>
            <Text style={{fontWeight: 'bold'}}>{props.query.slice(props.length)}</Text>
          </Text>
        </View>
        <View style={{paddingRight: 5}}>
          <TouchableHighlight
            style={{width: buttonSize, height: buttonSize, borderRadius: buttonSize, alignItems: 'center', justifyContent: 'center'}}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {props.setState(props.query)}}
          >
            <Icon name='chevron-up-outline' size={iconSize}/>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableHighlight> 
  );
}

async function suggestedQueries(query, setState) {
  if (query == '')
    return;
  var api_url = "http://suggestqueries.google.com/complete/search?output=firefox&q=" + query;
  var queries = await fetch(api_url)
    .then(response => response.json())
    .then(json => json[1])
    .catch((error) => console.error('Error: ', error));
  setState(queries);
}

function StaticHeader(props) {
  const crossSize = iconSize + 5;
  const buttonVisible = (props.buttonVisible) ? {width: undefined, height: undefined} : {width: 0, height: 0};
  const crossVisible = (props.buttonVisible) ? {width: 0, height: 0} : {width: crossSize, height: crossSize, borderRadius: crossSize};

  return (
    <View style={styles.HeaderView}>
      <View style={styles.BackButton}>
        <TouchableHighlight
          style={{width: buttonSize, height: buttonSize, borderRadius: buttonSize, alignItems: 'center', justifyContent: 'center'}}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={props.backHandle}
        >
          <Icon name='chevron-back-outline' size={iconSize}/>
        </TouchableHighlight>
      </View>
      <View style={styles.SearchBar}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput autoFocus={true} onFocus={props.onFocus} onBlur={props.onBlur} style={{fontSize: fontSize, flexGrow: 1, paddingTop: 7, paddingBottom: 7, paddingLeft: 8}} value={props.textValue} onChangeText={(text) => {props.setQuery(text)}}/>
          <TouchableHighlight
            style={[{alignItems: 'center', justifyContent: 'center'}, crossVisible]}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={props.closeHandle}
          >
            <Icon name='close-outline' size={iconSize}/>
          </TouchableHighlight>
        </View>
      </View>
      <View style={[styles.SearchButton, buttonVisible]}>
        <TouchableHighlight
          style={{width: buttonSize, height: buttonSize, borderRadius: buttonSize, alignItems: 'center', justifyContent: 'center'}}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={props.searchHandle}
        >
          <Icon name='search-outline' size={iconSize}/>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 3,
  },
  SearchBar: {
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#e9e9f1",
    borderRadius: 5,
  },
  BackButton: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  SearchButton: {
    paddingRight: 5,
    paddingLeft: 5,
  }
});

const searchQueries = {
  "kind": "youtube#searchListResponse",
  "etag": "Qe5eD-VkO9Lz33jfwvn3Fpno0Uc",
  "nextPageToken": "CAUQAA",
  "regionCode": "US",
  "pageInfo": {
    "totalResults": 1000000,
    "resultsPerPage": 5
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "1Tgb7GX9fxmNCLpdF6w58ymm4gQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "pJ_d6zzzCQE"
      },
      "snippet": {
        "publishedAt": "2022-07-07T11:00:26Z",
        "channelId": "UCzcQOTuXYGuCvTekySb_CeQ",
        "title": "This Is Why Surfers Love Uluwatu",
        "description": "With a good sized swell, not too much variation in the tide and an offshore wind that blew from dawn to dusk - there were plenty of ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/pJ_d6zzzCQE/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/pJ_d6zzzCQE/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/pJ_d6zzzCQE/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Surfers of Bali",
        "liveBroadcastContent": "none",
        "publishTime": "2022-07-07T11:00:26Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "6eIMPD9YSTUq-Dq7cpE0CY0KSvw",
      "id": {
        "kind": "youtube#video",
        "videoId": "gzJPnHAcAow"
      },
      "snippet": {
        "publishedAt": "2022-07-06T21:45:30Z",
        "channelId": "UC_F4Iy5korq2mEWZDQhG07w",
        "title": "Is this the best place for a surf trip?! Nonstop barrels! Fiji Pt. 3",
        "description": "Probably the best place you could ever go on a surf trip, Tavarua island in Fiji! This was such a good trip, Honestly one of the best ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/gzJPnHAcAow/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/gzJPnHAcAow/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/gzJPnHAcAow/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Koa Rothman",
        "liveBroadcastContent": "none",
        "publishTime": "2022-07-06T21:45:30Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "pp7yqX45H8Mr81m50XbmmcS1Yhk",
      "id": {
        "kind": "youtube#video",
        "videoId": "c6lU-xYRjFA"
      },
      "snippet": {
        "publishedAt": "2022-03-28T18:58:35Z",
        "channelId": "UC--3c8RqSfAqYBdDjIG3UNA",
        "title": "The World Loves Surfing | Best Of Red Bull Surfing 2021",
        "description": "What a year. 2021 was packed to the gills with everything the surfing world has to offer. Whether it be world title races, the biggest ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/c6lU-xYRjFA/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/c6lU-xYRjFA/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/c6lU-xYRjFA/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Red Bull Surfing",
        "liveBroadcastContent": "none",
        "publishTime": "2022-03-28T18:58:35Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "3b0uAJv_I_QOfYbqUs7R4cryzLU",
      "id": {
        "kind": "youtube#video",
        "videoId": "ma67yOdMQfs"
      },
      "snippet": {
        "publishedAt": "2021-01-23T17:00:15Z",
        "channelId": "UC--3c8RqSfAqYBdDjIG3UNA",
        "title": "These Were The All-Time Surfing Moments Of The Year | Best Of 2020",
        "description": "Well, that was a weird ride. Though it hasn't been easy, at least when we fixed our gaze on the ocean — or favorite place in the ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/ma67yOdMQfs/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/ma67yOdMQfs/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/ma67yOdMQfs/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Red Bull Surfing",
        "liveBroadcastContent": "none",
        "publishTime": "2021-01-23T17:00:15Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "QVWMfuQ9zfWH7qUduP3kaMkjHUM",
      "id": {
        "kind": "youtube#video",
        "videoId": "eSWST13stO4"
      },
      "snippet": {
        "publishedAt": "2022-03-27T15:00:32Z",
        "channelId": "UCVo06dBGK9VBBhq15wJxZHQ",
        "title": "🔵4k (ASMR) 10 Hour Store Loop - Hawaii Surfing - With Relaxing Music☑️",
        "description": "Waves of the World Filmers: Chris Kincade: https://www.instagram.com/chriskincade.wotw Andre Botha: ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/eSWST13stO4/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/eSWST13stO4/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/eSWST13stO4/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Chris Kincade Media - Waves of the World ",
        "liveBroadcastContent": "none",
        "publishTime": "2022-03-27T15:00:32Z"
      }
    }
  ]
}
