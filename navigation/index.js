import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/Ionicons';
//BottomTab
import HomeScreen from '../screens/HomeScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
//Other
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTab" component={BottomNavigationBar} options={{headerShown: false}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomNavigationBar() {
  const iconSize = 25;
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {return <Icon name={focused ? 'home-sharp' : 'home-outline'} size={iconSize}/>},
        }}
      />
      <BottomTab.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {return <Icon name={focused ? 'albums-sharp' : 'albums-outline'} size={iconSize}/>},
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {return <Icon name={focused ? 'library-sharp' : 'library-outline'} size={iconSize}/>}
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {return <Icon name={focused ? 'person' : 'person-outline'} size={iconSize}/>}
        }}
      />
    </BottomTab.Navigator>
  );
}