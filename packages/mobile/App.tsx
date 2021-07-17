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

const Drawer = createDrawerNavigator();
const App = (): JSX.Element => {
  useFonts({
    Montserrat:
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap',
  });
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView />
      <NavigationContainer>
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
