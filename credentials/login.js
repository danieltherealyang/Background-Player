import { useContext, useState, useEffect } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { AccessTokenContext } from '../components/constant';
import Icon from '@expo/vector-icons/Ionicons';

WebBrowser.maybeCompleteAuthSession();

export default function Login(props) {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "1096185187470-op5m0msckb18jgo9mcf3hj9asufu7ege.apps.googleusercontent.com",
    expoClientId: "1096185187470-op5m0msckb18jgo9mcf3hj9asufu7ege.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"]
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <View>
      {
        !accessToken ?
        <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={props.icon} size={100} style={{padding: 50}}/>
          <View style={{width: '75%'}}>
            <Text style={{textAlign: 'center', color: 'gray'}} numberOfLines={2}>{props.text ? props.text : null}</Text>
          </View>
          <View style={{padding: 25}}>
            <View style={{backgroundColor: '#0066ff', borderRadius: 3, borderColor: 'black', borderWidth: 0}}>
              <Button
                title={'SIGN IN'}
                color={'white'}
                onPress={() => promptAsync({useProxy: true, showInRecents: true})}
              />
            </View>
          </View>
        </View> :
        null
      }
    </View>
  );
}