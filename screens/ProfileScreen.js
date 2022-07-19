import { SafeAreaView } from 'react-native';
import Login from '../credentials/login';
import SignOut from '../credentials/signout';
import { GLOBAL_STYLES } from '../components/constant';
import ProfileData from '../components/profiledata';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeareaview}>
      <Login icon={"person"} text={"Sign in to see your profile"}/>
      <ProfileData/>
      <SignOut/>
    </SafeAreaView>
  );
}