import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { api } from "../client";
import { useRouter } from "expo-router";
import {
  Avatar,
  Button,
  ButtonNestingContext,
  Heading,
  Stack,
  XStack,
  YStack,
} from "tamagui";
import { Navigation, Search } from "@tamagui/lucide-icons";

export default function Home() {
  const router = useRouter();
  const { data: user } = api.user.me.useQuery();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Didn't got permission");
      }

      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();
  }, []);
  if (!location) {
    return;
  }
  return (
    <YStack flex={1}>
      <MapView
        style={{
          flex: 0.7,
        }}
        initialRegion={{
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.000021,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          ></Marker>
        )}
      </MapView>
      <YStack
        flex={0.3}
        borderTopStartRadius={20}
        borderTopEndRadius={20}
        backgroundColor={"$bg-primary"}
        padding={"$3"}
      >
        <XStack alignItems="center" justifyContent="space-between">
          <Avatar circular size="$6">
            <Avatar.Image src="http://placekitten.com/200/300" />
            <Avatar.Fallback bc="$btn-primary" />
          </Avatar>
          <Button
            icon={<Search size={24} color="white" />}
            bg={"$btn-primary"}
            size={"$5"}
            circular
          />
        </XStack>
        <Stack alignItems="center" justifyContent="center" flex={1}>
          <Button
            alignSelf="center"
            icon={<Navigation size={24} strokeWidth={3} />}
            backgroundColor={"$btn-secondary"}
            color={"white"}
            size={"$4"}
          >
            SEND YOUR LOCATION
          </Button>
        </Stack>
      </YStack>
    </YStack>
  );
}
