import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/SignupScreen';
import firebase from '@react-native-firebase/app';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import EventChatScreen from './src/screens/EventChatScreen';
import { View, Text } from 'react-native';
import COLORS from './src/constants/Colors';
import { UserProvider } from './src/context/UserContext';
import Config from 'react-native-config';


// const firebaseConfig = {
//   apiKey: 'AIzaSyCTYAsQV5HxLup_LUJ84c_5Uek9TVr5uOM',
//   authDomain: 'smartchatevents.firebaseapp.com',
//   projectId: 'smartchatevents',
//   storageBucket: 'smartchatevents.firebasestorage.app',
//   messagingSenderId: '1059854561709',
//   appId: '1:1059854561709:android:c737cf58a0f24e2c177124',
// };
const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: true,
                headerTitle: () => (
                  <Text style={{ fontSize: 18, fontWeight: '700' }}>
                    Events
                  </Text>
                ),
                headerBackVisible: false, // hides the back button
                headerTitleAlign: 'center', // centers the title
              }}
            />
            <Stack.Screen
              name="Chat"
              component={EventChatScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default App;
