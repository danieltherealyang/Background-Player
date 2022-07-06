import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import Header from '../components/header';

const array = [];
for (let i = 0; i < 20; i++) {
  array.push(
    <View style={{padding: 20}} key={i}>
      <Text>{i}</Text>
    </View>
  );
}

export default function LibraryScreen({ navigation }) {
  console.log('Subscription Screen rendering');
  return (
    <SafeAreaView>
      <Header searchHandle={() => navigation.navigate("Search", {backScreen: "Library",})}>
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