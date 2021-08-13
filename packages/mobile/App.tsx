import { useState } from 'react';
import * as React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './Screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserProfileScreen } from './Screens/UserProfileScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SignInScreen } from './Screens/SignInScreen';
import { useFonts } from '@expo-google-fonts/inter';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { StackParamList } from './types/screen.type';
import { getUser } from './utils/getUser';
import { setUser } from './redux/features/User/user.slice';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const Drawer = createDrawerNavigator<StackParamList>();

const prefix = Linking.createURL('/');

const App = (): JSX.Element => {
  useFonts({
    Montserrat: require('./assets/Montserrat-Medium.ttf'),
    MontserratBold: require('./assets/Montserrat-Bold.ttf'),
    MontserratSemiBold: require('./assets/Montserrat-SemiBold.ttf'),
  });

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [checkSign, setCheckSign] = useState<boolean>();
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: '*',
      },
    },
  };

  useEffect(() => {
    (async () => {
      const userDetails = await getUser();
      console.log('USER DETAILS', userDetails);
      if (userDetails) {
        store.dispatch(setUser(userDetails));
        setIsSignedIn(true);
      }
    })();
  }, [checkSign]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
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
              <SignInScreen signInUpdate={setCheckSign} />
            </>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
