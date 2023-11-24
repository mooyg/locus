import { useEffect, useMemo, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import Handle from "../components/SheetHandle";
import { Avatar, Button, Heading, Stack, Text, XStack, YStack } from "tamagui";
import { api } from "../client";
import { Navigation, Plus, Search } from "@tamagui/lucide-icons";
import SettingsPage from "./settings";
import { Settings } from "../components/Settings";

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);
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
          flex: 1,
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
      <BottomSheet
        handleStyle={{
          backgroundColor: "#0D1E2B",
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        }}
        handleComponent={Handle}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
      >
        <YStack flex={1} bg="$color.bg-primary">
          <XStack
            alignItems="flex-start"
            justifyContent="space-between"
            marginTop={"$4"}
            padding="$2"
          >
            <YStack alignItems="center" gap={"$1"}>
              <Avatar circular size="$6">
                <Avatar.Image src="http://placekitten.com/200/300" />
                <Avatar.Fallback bc="red" />
              </Avatar>
              <Heading color={"$color.text-primary"}>{user?.username}</Heading>
            </YStack>
            <XStack gap="$2">
              <Button
                backgroundColor="$color.btn-primary"
                icon={<Plus size={24} color="$color.text-secondary" />}
                borderRadius="$12"
                size="$5"
                circular
              ></Button>
              <Button
                borderColor="$color.btn-primary"
                borderWidth={"$1"}
                borderRadius="$12"
                alignItems="center"
                backgroundColor="none"
                size="$5"
                circular
              >
                <Search size={24} color="$color.text-secondary" />
              </Button>
            </XStack>
          </XStack>
          <Stack padding="$2" gap="$6">
            <Button
              bg="$color.btn-secondary"
              icon={<Navigation color="white" size="24" />}
            >
              <Text fontWeight="900" fontSize="$7" color="white">
                SHARE YOUR LOCATION
              </Text>
            </Button>
            <Settings />
          </Stack>
        </YStack>
      </BottomSheet>
    </YStack>
  );
}
