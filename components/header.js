import { StyleSheet, View, Text, TouchableHighlight, Animated, Image } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const HEADER_HEIGHT = 40;

export default function Header(props) {
  const minScroll = 2*HEADER_HEIGHT;
  const activeRange = 3*HEADER_HEIGHT;
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(
      scrollY,
      -minScroll,
      activeRange + minScroll
  );

  const translateY = diffClamp.interpolate({
      inputRange: [0, 4*HEADER_HEIGHT],
      outputRange: [0, -2*HEADER_HEIGHT],
      extrapolate: "clamp",
  });

  return (
    <View style={{width: "100%", height: "100%"}}>
      <Animated.View style={{
        zIndex: 2,
        transform: [
          {translateY: translateY}
        ],
      }}>
        <StaticHeader searchHandle={props.searchHandle}/>
      </Animated.View>
      <Animated.ScrollView style={{height: '100%', width: '100%', position: 'absolute', top: 0}} contentContainerStyle={{alignItems: 'center', paddingTop: HEADER_HEIGHT}}
        onScroll = {Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
      >
        <View>
          {props.children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

function StaticHeader(props) {
  const iconSize = 25;
  const searchButtonSize = iconSize + 15;
  return (
    <View style={styles.HeaderView}>
      <View style={styles.LeftHeader}>
        <Image style={{flex: 1, width: undefined, height: undefined}} resizeMode='contain' source={require("../assets/VGPlayer.png")}/>
        <View style={{flex: 1}}/>
      </View>
      <View style={styles.RightHeader}>
        <TouchableHighlight
          style={{width: searchButtonSize, height: searchButtonSize, borderRadius: searchButtonSize, alignItems: 'center', justifyContent: 'center'}}
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
  },
  LeftHeader: {
    flex: 1,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  RightHeader: {
    flex: 1,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
});