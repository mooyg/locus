import React, { Dispatch, SetStateAction } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Props } from '../types/screen.type';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { checkLocationServices } from '../utils/checkLocationServices';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { useState } from 'react';
import { useAppSelector } from '../redux/hook';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibW9veSIsImEiOiJja3F2dWd2YnUwYTg0Mm5ucmQ0N2E5cDNqIn0.fABybhJrX_mnoIVtAsLhpQ'
);

export const HomeScreen = ({ navigation }: Props): JSX.Element => {
  const locationSubscriptionRef = useRef<{ remove(): void }>();
  const [latitude, setLatitude] = useState<number>() as [
    number,
    Dispatch<SetStateAction<number>>
  ];
  const [longitude, setLongitude] = useState<number>() as [
    number,
    Dispatch<SetStateAction<number>>
  ];
  const user = useAppSelector((state) => state.user.value);
  useEffect(() => {
    (async () => {
      console.log(await checkLocationServices());
      if (!(await checkLocationServices())) {
        Alert.alert('Turn on your location');
      }
      await Location.requestForegroundPermissionsAsync();
      locationSubscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: LocationAccuracy.BestForNavigation,
        },
        (location) => {
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        }
      );
    })();
    return () => {
      if (!locationSubscriptionRef.current) return;
      locationSubscriptionRef.current.remove();
    };
  });
  /*https://cdn.discordapp.com/avatars/${user.discord_user_id}/${user.avatar}.png?size=64 */
  console.log(user);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'gray' }}>
      <View style={styles.nav}>
        <Pressable>
          <Image style={styles.icon} source={require('../assets/left.png')} />
        </Pressable>
        <Pressable style={styles.pressable}>
          <Image style={styles.icon} source={require('../assets/menu.png')} />
        </Pressable>
      </View>
      <View style={styles.container}>
        {longitude && <MapboxGL.MapView style={{ flex: 1 }}></MapboxGL.MapView>}
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
  icon: {
    width: 25,
    height: 14,
    tintColor: 'black',
  },
  pressable: {
    width: 25,
  },
  nav: {
    backgroundColor: 'white',
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
