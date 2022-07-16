import { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { AccessTokenContext } from '../components/constant';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "1096185187470-op5m0msckb18jgo9mcf3hj9asufu7ege.apps.googleusercontent.com",
    expoClientId: "1096185187470-op5m0msckb18jgo9mcf3hj9asufu7ege.apps.googleusercontent.com",
  });

  useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
      console.log('user info', data);
    });
    console.log('access token', accessToken);
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button 
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({useProxy: true, showInRecents: true}) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});