import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './Screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserProfileScreen } from './Screens/UserProfileScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignInScreen } from './Screens/SignInScreen';
import { useFonts } from '@expo-google-fonts/inter';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';

const Drawer = createDrawerNavigator();
const prefix = Linking.createURL('/');

const App = (): JSX.Element => {
  useEffect(() => {
    console.log('WORK BRO');
  }, []);
  useFonts({
    Montserrat: require('./assets/Montserrat-Medium.ttf'),
    MontserratBold: require('./assets/Montserrat-Bold.ttf'),
    MontserratSemiBold: require('./assets/Montserrat-SemiBold.ttf'),
  });
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: '*',
      },
    },
  };
  console.log('WORK GOD DAMN IT!!!');
  console.log('WORK BROP');
  return (
    <SafeAreaProvider>
      <SafeAreaView />
      <NavigationContainer linking={linking}>
        {isSignedIn ? (
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerTitle: 'Locus' }}
            />
            <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
          </Drawer.Navigator>
        ) : (
          <>
            <SignInScreen />
          </>
        )}
      </NavigationContainer>
      <SafeAreaView />
    </SafeAreaProvider>
  );
};

export default App;
