import * as Browser from "expo-web-browser";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import { api } from "../client";
import { useRouter } from "expo-router";
import { Button, Heading, YStack } from "tamagui";

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
    <YStack flex={1} alignItems={"center"} justifyContent={"center"}>
      <Heading>Welcome to locus</Heading>
      <Button icon={<AntDesign name="google" size={16} />} onPress={signIn}>
        Continue with google
      </Button>
    </YStack>
  );
}
