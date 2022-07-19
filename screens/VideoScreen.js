import { useState, useEffect, useRef } from 'react';
import { StatusBar, View, ScrollView, Text, Image, TouchableHighlight, Modal, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from '@expo/vector-icons/Ionicons';
import { GLOBAL_STYLES, GRAY } from '../components/constant';
import { clearQuery, fetchRelated } from '../components/query';
import { MappedCards } from '../components/videocard';
import { BOTTOM_SCROLL_PADDING } from '../components/constant';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { getShortNum, getDTdiff, getDateTime, convertDate } from '../components/etc';

const windowHeight = Dimensions.get('window').height;

export default function VideoScreen(props) {
  const {source, title, views, date, profile, channel, subscribers, description} = props.data;
  const scrollRef = useRef();
  const [ queryList, setQueryList ] = useState([]);
  const [ tokenArray, setTokenArray ] = useState(new Set());
  const [ pageToken, setPageToken ] = useState("");
  const fetchfn = (source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) => {
    (props.fetchfn) ? props.fetchfn(source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery)
    : fetchRelated(source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery);
  };
  useEffect(() => {
    fetchfn(source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken);
  }, []);
  const videoCards = (props.videoCards) ? props.videoCards : 
  MappedCards(queryList,
    (source, title, views, date, profile, channel, subscribers, description, thumbnail) => {
      props.setData({
        source: source,
        title: title,
        views: views,
        date: date,
        profile: profile,
        channel: channel,
        subscribers: subscribers,
        description: description,
      });
      props.setThumbnail(thumbnail);
      clearQuery(setTokenArray, setPageToken);
      fetchfn(source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken, true);
      scrollRef.current?.scrollTo({ y: 0, animated: false});
    }
  );
  return (
    <GestureHandlerRootView>
      <Modal animationType="slide" visible={props.modalVisible}>
        <View style={GLOBAL_STYLES.safeareaview}>
          <StatusBar hidden={true}/>
          <PanGestureHandler 
            activeOffsetY={windowHeight*0.1}
            onGestureEvent={(event) => {if (event.nativeEvent.velocityY > 0) props.setModalVisible(false)}}
          >
            <View style={{width: '100%', height: undefined, aspectRatio: 16/9}}>
              <WebView
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                allowsFullscreenVideo={true}
                mediaPlaybackRequiresUserAction={false}
                source={{uri: 'https://www.youtube.com/embed/' + source + '?autoplay=1'}}
              />
            </View>
          </PanGestureHandler>
          <ScrollView
            ref={scrollRef}
            onScroll={
              (event) => {
                let maxOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
                if (event.nativeEvent.contentOffset.y >= maxOffset + BOTTOM_SCROLL_PADDING) {
                  fetchfn(source, setQueryList, tokenArray, setTokenArray, pageToken, setPageToken);
                }
              }
            }
            scrollEventThrottle={16}
          >
            <InfoCard
              title={title}
              views={views}
              date={date}
              profile={profile}
              channel={channel}
              subscribers={subscribers}
              description={description}
            />
            <Text style={{padding: 12}}>Up Next</Text>
            <View>
              {videoCards}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

function InfoCard(props) {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <View style={{width: '100%'}}>
      <VideoInfo
        title={props.title}
        views={props.views}
        date={props.date}
        onPress={() => setShowDescription(!showDescription)}
      />
      <View style={{height: (showDescription) ? undefined : 0}}>
        <Text style={{paddingLeft: 12, paddingRight: 12}}>{props.description}</Text>
      </View>
      <ChannelInfo profile={props.profile} channel={props.channel} subscribers={props.subscribers}/>
    </View>
  );
}

function VideoInfo(props) {
  return (
    <TouchableHighlight
      style={{padding: 12, borderColor: 'black', borderWidth: 0}}
      activeOpacity={1}
      underlayColor="#DDDDDD"
      onPress={() => props.onPress()}
    >
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={{flexGrow: 1}}>
          <Text style={GLOBAL_STYLES.titlenf} numberOfLines={2} ellipSizeMode="tail">{props.title}</Text>
          <Text style={[GLOBAL_STYLES.infonf, {fontWeight: '600'}]} numberOfLines={2} ellipSizeMode="tail">{getShortNum(props.views) + ' views' + ' • ' + convertDate(props.date.split('T')[0])}</Text>
        </View>
        <Icon name='chevron-down-outline' size={24}/>
      </View>
    </TouchableHighlight>
  );
}

function ChannelInfo(props) {
  return (
    <View style={{paddingTop: 12}}>
      <View style={{flexDirection: 'row', padding: 12, borderTopColor: GRAY, borderTopWidth: 1, borderBottomColor: GRAY, borderBottomWidth: 1}}>
        <Image
          style={{width: 44, borderRadius: 44, aspectRatio: 1}}
          source={{uri: props.profile}}
        />
        <View style={{flex: 1, paddingLeft: 12}}>
          <Text style={GLOBAL_STYLES.titlenf}>{props.channel}</Text>
          <Text style={GLOBAL_STYLES.infonf}>{getShortNum(props.subscribers) + ' subscribers'}</Text>
        </View>
      </View>
    </View>  
  );
}