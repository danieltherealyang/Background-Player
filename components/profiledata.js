import { useState, useEffect, useContext } from 'react';
import { View, Image, Text } from 'react-native';
import { AccessTokenContext, GLOBAL_STYLES } from './constant';

export default function ProfileData() {
  const { accessToken } = useContext(AccessTokenContext);
  const [ userInfo, setUserInfo ] = useState();
  useEffect(() => {
    getUserData(accessToken, setUserInfo);
  }, [accessToken]);
  return (
    <View style={{width: '100%', height: '65%', justifyContent: 'center'}}>
      <View style={{borderColor: 'red', borderWidth: 0, height: '70%', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Image
          style={{width: 100, borderRadius: 100, aspectRatio: 1}}
          source={{uri: (userInfo) ? userInfo.picture : null}}
        />
      </View>
      <View style={{alignItems: 'center', paddingTop: 25, borderColor: 'blue', borderWidth: 0}}>
        <Text style={GLOBAL_STYLES.titlenf}>{(userInfo) ? userInfo.name : null}</Text>
      </View>
      <View style={{alignItems: 'center', paddingTop: 10, borderColor: 'purple', borderWidth: 0}}>
        <Text style={GLOBAL_STYLES.titlenf}>{(userInfo) ? userInfo.email : null}</Text>
      </View>
    </View>
  );
}

async function getUserData(accessToken, setUserInfo) {
  if (!accessToken)
    return;
  await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${accessToken}`}
  }).then(response => response.json()).then(data => {
    setUserInfo(data);
  });
}