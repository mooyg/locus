import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './Components/HomeScreen';
import { UserProfile } from './Components/UserProfile';
import { StackParamList } from './types/screen.type';
const Stack = createStackNavigator<StackParamList>();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <Image
                source={{ uri: 'https://i.ibb.co/19X480x/logo.png' }}
                style={{ height: '40px', width: '30px' }}
              />
            ),
            headerStyle: {
              backgroundColor: '#111827',
            },
          }}
        />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
};

export default App;
