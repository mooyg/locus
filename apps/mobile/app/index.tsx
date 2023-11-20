import { Pressable, Text, View } from "react-native";
import * as Browser from "expo-web-browser";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import { api } from "../client";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  api.user.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (data) {
        router.push("/home");
      }
    },
  });

  const signIn = async () => {
    const result = await Browser.openAuthSessionAsync(
      "http://localhost:8000/api/oauth/google",
    );

    if (result.type !== "success") return;

    const url = Linking.parse(result.url);

    const sessionToken = url.queryParams?.session_token?.toString() ?? null;

    if (!sessionToken) return;
    await SecureStore.setItemAsync("session_token", sessionToken);
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Pressable
        onPress={signIn}
        className="flex flex-row gap-1 items-center justify-center border p-2 rounded-md"
      >
        <AntDesign name="google" size={24} color="black" />
        <Text className="font-bold">Continue with google</Text>
      </Pressable>
    </View>
  );
}
