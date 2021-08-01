import React, { Dispatch, SetStateAction } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Props } from '../types/screen.type';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { checkLocationServices } from '../utils/checkLocationServices';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { useAppSelector } from '../redux/hook';

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
        {longitude && (
          <MapView
            loadingEnabled={true}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            followsUserLocation={true}
            style={{ flex: 1 }}
          >
            <Marker
              coordinate={{ latitude: latitude, longitude: longitude }}
              image={{
                uri: `https://cdn.discordapp.com/avatars/${user.discordUserId}/${user.avatar}.png?size=64`,
              }}
            />
          </MapView>
        )}
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
