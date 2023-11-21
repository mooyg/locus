import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { api } from "../client";
import { useState } from "react";
import superjson from "superjson";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import config from "../tamagui.config";
import * as SecureStore from "expo-secure-store";
import { TamaguiProvider } from "tamagui";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";

export default function Layout() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return api.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8000/trpc",
          async headers() {
            const sessionToken =
              await SecureStore.getItemAsync("session_token");
            return {
              Authorization: `Bearer ${sessionToken}`,
            };
          },
        }),
      ],
      transformer: superjson,
    });
  });

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView />
            <TamaguiProvider config={config}>
              <Slot />
            </TamaguiProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </api.Provider>
    </>
  );
}
