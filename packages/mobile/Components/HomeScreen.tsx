import { Button, Text, View } from 'react-native';
import React from 'react';
import { Props } from '../types/screen.type';
export const HomeScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Profile"
        onPress={() => navigation.navigate('UserProfile')}
      />
    </View>
  );
};
