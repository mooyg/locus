import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Props } from '../types/screen.type';
import { SafeAreaView } from 'react-native-safe-area-context';
export const HomeScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="ios-menu"
            size={40}
            color="black"
            onPress={() => navigation.openDrawer()}
            style={{ color: 'white' }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 4,
    color: 'white',
  },
  container: {
    backgroundColor: '#111827',
    height: '100%',
    color: 'white',
    flex: 1,
  },
});
