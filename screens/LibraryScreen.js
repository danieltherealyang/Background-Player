import { StyleSheet, View, Text } from 'react-native';

export default function LibraryScreen({ navigation }) {
  console.log('Library Screen rendering');
  return (
    <View style={{width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 5}}>
      <Text>Library</Text>
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