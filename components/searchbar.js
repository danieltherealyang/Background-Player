import { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { PADDING, GRAY } from './constant';
import { clearQuery, fetchQuery } from './query';

export default function SearchBar(props) {
  const HEADER_HEIGHT = 40;
  const [ querySuggest, setQuerySuggest ] = useState([]);
  const [ barFocused, setBarFocused ] = useState(false);
  useEffect(() => {
    suggestedQueries(props.query, setQuerySuggest);
  }, [props.query]);
  useEffect(() => {
    fetchQuery('', props.setState, props.tokenArray, props.setTokenArray, props.pageToken, props.setPageToken);
  }, []);
  const backHandle = (barFocused) ? () => {Keyboard.dismiss()} : props.backHandle;
  return (
    <View style={{
      width: "100%",
      borderBottomColor: GRAY, borderBottomWidth: 1,
      paddingTop: PADDING,
      paddingBottom: PADDING
    }}>
        <StaticHeader
          onFocus={() => setBarFocused(true)} 
          onBlur={() => setBarFocused(false)}
          buttonVisible={!props.query.length} 
          textValue={props.query}
          setQuery={props.setQuery} 
          backHandle={backHandle} 
          searchHandle={() => {}} 
          closeHandle={() => props.setQuery("")}
        />
        <View>
          {barFocused && querySuggest.map((suggestion, index) => 
            <QueryRow
              key={index}
              query={suggestion}
              onPress={
                () => {
                  clearQuery(props.setTokenArray, props.setPageToken);
                  fetchQuery(suggestion, props.setState, props.tokenArray, props.setTokenArray, props.pageToken, props.setPageToken, true);
                  props.scrollRef.current?.scrollTo({ y: 0, animated: false});
                }
              }
              setQueryList={props.setQueryList} 
              setState={props.setQuery} 
              length={props.query.length}
            />
          )}
        </View>
    </View>
  );
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
        props.onPress();
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
  var api_url = "http://suggestqueries.google.com/complete/search?output=firefox&q=" + encodeURI(query);
  await fetch(api_url)
    .then(response => response.json())
    .then(json => setState(json[1]))
    .catch((error) => console.log(error));
  console.log(api_url);
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