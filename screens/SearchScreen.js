import { StyleSheet, SafeAreaView, View, Text, Animated } from 'react-native';
import SearchBar from '../components/searchbar';

const array = [];
for (let i = 0; i < 20; i++) {
  array.push(
    <View style={{padding: 20}} key={i}>
      <Text>{i}</Text>
    </View>
  );
}

export default function SearchScreen({ navigation }) {
  console.log('Home Screen rendering');
  return (
    <SafeAreaView>
      <SearchBar>
        {array}
      </SearchBar>
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