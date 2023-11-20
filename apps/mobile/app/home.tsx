import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign, FontAwesome5, Feather } from "@expo/vector-icons";
import { api } from "../client";
import { useRouter } from "expo-router";

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
    <View className="flex-1">
      <MapView
        className="flex-[0.7]"
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
      <View className="bg-baby-blue-600 flex flex-col rounded-t-3xl flex-[0.3]">
        <View className="flex flex-row p-2 justify-between mt-2 items-start">
          <View className="flex flex-col items-center justify-center">
            <View className="bg-white rounded-full items-center flex w-14 h-14 justify-center">
              <Image
                source={{
                  uri: "https://i.ibb.co/kQbgxqk/avatar.png",
                }}
                className="w-12 h-12"
              />
            </View>
            <Text className="font-extrabold  text-baby-blue-700 text-lg">
              {user?.username}
            </Text>
          </View>
          <View className="flex flex-row gap-2 items-center">
            <Pressable
              className="rounded-full bg-baby-blue-700 items-center flex p-2"
              onPress={() => {
                router.push("/settings");
              }}
            >
              <Feather name="settings" size={24} color="white" />
            </Pressable>
            <Pressable className="rounded-full bg-baby-blue-700 p-2 items-center flex">
              <AntDesign name="search1" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View className="flex items-center justify-center self-center">
          <Pressable className="bg-baby-blue-700 p-2 rounded-lg flex flex-row space-x-2 items-center justify-center">
            <FontAwesome5 name="location-arrow" size={16} color="white" />
            <Text className="font-extrabold text-lg text-white">
              SEND YOUR LOCATION
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
