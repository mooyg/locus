import React, { Dispatch, SetStateAction } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Props } from '../types/screen.type';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { checkLocationServices } from '../utils/checkLocationServices';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import { useState } from 'react';
import { useAppSelector } from '../redux/hook';
import { Button } from 'react-native';

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
              style={{ borderRadius: 20, overflow: 'hidden' }}
              onPress={() => console.log('CLICKED ON MARKER')}
            >
              <View style={{ height: 64, width: 64 }}>
                <Image
                  style={{ height: '100%', width: '100%', borderRadius: 50 }}
                  source={{
                    uri: `https://cdn.discordapp.com/avatars/${user.discordUserId}/${user.avatar}.png?size=128`,
                  }}
                />
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={require('../assets/CustomMarker.png')}
                />
              </View>
            </Marker>
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
