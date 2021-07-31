import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Props } from '../types/screen.type';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { checkLocationServices } from '../utils/checkLocationServices';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
export const HomeScreen = ({ navigation }: Props): JSX.Element => {
  const locationSubscriptionRef = useRef<{ remove(): void }>();
  useEffect(() => {
    (async () => {
      console.log(await checkLocationServices());
      if (!(await checkLocationServices())) {
        Alert.alert('Turn on your location');
      }
      Location.requestForegroundPermissionsAsync();
      locationSubscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: LocationAccuracy.BestForNavigation,
        },
        (location) => {
          console.log(location);
        }
      );
    })();
    return () => {
      if (!locationSubscriptionRef.current) return;
      locationSubscriptionRef.current.remove();
    };
  });
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
