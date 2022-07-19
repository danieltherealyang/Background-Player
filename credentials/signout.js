import { useContext } from 'react';
import { View, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { AccessTokenContext } from '../components/constant';

export default function SignOut() {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);

  async function signOut() {
    if (accessToken) {
      try {
        await AuthSession.revokeAsync({token: accessToken }, Google.discovery);
        setAccessToken(null);
      } catch (error) {
        console.log('ERROR: ', error)
      }
    }
  }

  return (
    <View>
      {accessToken ?
        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', backgroundColor: '#0066ff', borderRadius: 3}}>
            <Button
              title={"Sign out"}
              color={'white'}
              onPress={() => signOut()}
            />
          </View>
        </View>
        : null
      }
    </View>
  );
}