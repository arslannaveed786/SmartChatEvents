import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/SignupScreen'; // adjust path if needed
import firebase from '@react-native-firebase/app';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import EventChatScreen from './src/screens/EventChatScreen';
import { View, Text } from 'react-native';
import COLORS from './src/constants/Colors';

// Optional: Firebase config, if not already done via native setup
const firebaseConfig = {
  apiKey: 'AIzaSyCTYAsQV5HxLup_LUJ84c_5Uek9TVr5uOM',
  authDomain: 'smartchatevents.firebaseapp.com', // This one is inferred, it's always projectId + .firebaseapp.com
  projectId: 'smartchatevents',
  storageBucket: 'smartchatevents.firebasestorage.app',
  messagingSenderId: '1059854561709',
  appId: '1:1059854561709:android:c737cf58a0f24e2c177124',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
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
                // <View >
                <Text style={{ fontSize: 18, fontWeight: '700' }}>Events</Text>
                // </View>
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
    </GestureHandlerRootView>
  );
};

export default App;
