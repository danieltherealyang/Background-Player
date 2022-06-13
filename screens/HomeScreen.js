import { StyleSheet, SafeAreaView, View, Text, Animated } from 'react-native';
import Header from '../components/header';

const array = [];
for (let i = 0; i < 20; i++) {
  array.push(
    <View style={{padding: 20}} key={i}>
      <Text>{i}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  console.log('Home Screen rendering');
  return (
    <SafeAreaView>
      <Header>
        {array}
      </Header>
    </SafeAreaView>
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