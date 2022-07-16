import { StyleSheet, View, Text } from 'react-native';
import Login from '../credentials/login';

export default function ProfileScreen({ navigation }) {
  console.log('Profile Screen rendering');
  return (
    <View style={{width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 5}}>
      <Login/>
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
});