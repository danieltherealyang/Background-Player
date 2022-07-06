import { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

export default function SearchBar(props) {
  const HEADER_HEIGHT = 40;
  const [ query, setQuery ] = useState("");
  const [ querySuggest, setQuerySuggest ] = useState([]);
  const [ barFocused, setBarFocused ] = useState(false);
  useEffect(() => {
    suggestedQueries(query, setQuerySuggest);
  }, [query]);
  const backHandle = (barFocused) ? () => {Keyboard.dismiss()} : props.backHandle;
  return (
    <View style={{width: "100%"}}>
        <StaticHeader
          onFocus={() => setBarFocused(true)} 
          onBlur={() => setBarFocused(false)}
          buttonVisible={!query.length} 
          textValue={query} setQuery={setQuery} 
          backHandle={backHandle} 
          searchHandle={() => {}} 
          closeHandle={() => setQuery("")}
        />
        <View style={{borderColor: 'red', borderWidth: 0}}>
          {barFocused && querySuggest.map((suggestion, index) => 
            <QueryRow key={index} query={suggestion} setComponents={props.setComponents} setState={setQuery} length={query.length}/>
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
      onPress={() => {props.setState(props.query); props.setComponents(<Text style={{borderColor: 'black', borderWidth: 5}}>{props.query}</Text>); Keyboard.dismiss();}}
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
  var queries = await fetch(api_url).then(response => response.json()).then(json => json[1]).catch((error) => console.error('Error: ', error));
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