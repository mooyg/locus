import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>HEADER</Text>
      </View>
    </View>
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
  },
});
