import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Pressable
        onPress={async () => {
          await AsyncStorage.clear();
          console.log('DONE');
        }}
      >
        <Text>Clear</Text>
      </Pressable>
    </View>
  );
};
