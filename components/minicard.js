import { useState } from 'react';
import { Animated, View, TouchableHighlight, Image, Text, Dimensions } from 'react-native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import { GLOBAL_STYLES } from './constant';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MiniCard(props) {
  const translateX = new Animated.Value(0);
  const [ panning, setPanning ] = useState(false);
  return (
    <PanGestureHandler 
      onGestureEvent={Animated.event(
        [{ nativeEvent: { translationX: translateX }}],
        { useNativeDriver: true}
      )}
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE)
          setPanning(true);
        if (nativeEvent.state === State.END || nativeEvent.state === State.CANCELLED) {
          if (Math.abs(nativeEvent.translationX) < 0.25*windowWidth)
            Animated.spring(translateX, {restSpeedThreshold: 40, friction: 3, tension: 100, useNativeDriver: true}).start(({finished}) => setPanning(false));
          else
            Animated.timing(translateX, {toValue: (nativeEvent.translationX < 0) ? -windowWidth : windowWidth, duration: 100, easing: (t) => t, useNativeDriver: true}).start(({finished}) => props.setDismissed(true));
        }
      }}
    >
      <Animated.View style={[{backgroundColor: 'white', transform: [{translateX: translateX}]}, (props.style) ? props.style : null]}>
        <TouchableHighlight
          style={{flexGrow: 1, height: (props.dismissed) ? 0 : windowHeight*0.08}}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {if (!panning) props.setModalVisible(true)}}
        >
          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%'}}>
            <Image
              style={{height: '100%', width: undefined, aspectRatio: 16/9}}
              resizeMode='cover'
              source={{uri: props.thumbnail}}
            />
            <Text style={[GLOBAL_STYLES.title, {paddingLeft: 10}]}>{props.title}</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    </PanGestureHandler>
  );
}