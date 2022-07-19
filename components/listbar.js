import { StyleSheet, Image, Text, View, TouchableHighlight } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { PADDING, GRAY, GLOBAL_STYLES } from './constant';

export default function ListBar(props) {
  return (
    <View style={{
      width: "100%",
      backgroundColor: 'white',
      borderBottomColor: GRAY, borderBottomWidth: 1,
      paddingTop: PADDING,
      paddingBottom: PADDING
    }}>
        <StaticHeader
          onFocus={() => setBarFocused(true)} 
          onBlur={() => setBarFocused(false)}
          profile={props.profile}
          channel={props.channel}
          backHandle={props.backHandle}
          circle={props.circle}
        />
    </View>
  );
}

const iconSize = 25;
const buttonSize = iconSize + 15;

function StaticHeader(props) {
  const circle = (props.circle) ? {borderRadius: 40} : null;
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
      <View style={{flexDirection: 'row', flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 96}}>
          <View style={{paddingRight: 24}}>
            <Image
              style={[{width: 40, aspectRatio: 1}, circle]}
              source={{uri: props.profile}}
            />
          </View>
          <Text style={GLOBAL_STYLES.titlenf}>{props.channel}</Text>
        </View>
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
  BackButton: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});