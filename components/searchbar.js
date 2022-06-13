import { StyleSheet, View, TextInput, TouchableHighlight, Animated } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

export default function SearchBar({children}) {
  const HEADER_HEIGHT = 40;
  const minScroll = 2*HEADER_HEIGHT;
  const headerHeight = 65;
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
        <StaticHeader/>
      </Animated.View>
      <Animated.ScrollView style={{height: '100%', width: '100%', position: 'absolute', top: 0,}} contentContainerStyle={{alignItems: 'center', paddingTop: HEADER_HEIGHT}}
        onScroll = {Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
      >
        <View>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

function StaticHeader() {
  const iconSize = 25;
  const searchButtonSize = iconSize + 15;
  return (
    <View style={styles.HeaderView}>
      <TextInput/>
      <TouchableHighlight
        style={{width: searchButtonSize, height: searchButtonSize, borderRadius: searchButtonSize, alignItems: 'center', justifyContent: 'center'}}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {console.log("pressed")}}
      >
        <Icon name='search-outline' size={iconSize}/>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
  },
});