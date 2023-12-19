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
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { Toast } from "../components/Toast";

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
  const [fontsLoaded, fontError] = useFonts({
    "SF-Pro-Display-Black": require("../assets/SanFranciscoPro/SF-Pro-Display-Black.otf"),
    "SF-Pro-Display-BlackItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-BlackItalic.otf"),
    "SF-Pro-Display-Bold": require("../assets/SanFranciscoPro/SF-Pro-Display-Bold.otf"),
    "SF-Pro-Display-BoldItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-BoldItalic.otf"),
    "SF-Pro-Display-Heavy": require("../assets/SanFranciscoPro/SF-Pro-Display-Heavy.otf"),
    "SF-Pro-Display-HeavyItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-HeavyItalic.otf"),
    "SF-Pro-Display-Light": require("../assets/SanFranciscoPro/SF-Pro-Display-Light.otf"),
    "SF-Pro-Display-LightItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-LightItalic.otf"),
    "SF-Pro-Display-Medium": require("../assets/SanFranciscoPro/SF-Pro-Display-Medium.otf"),
    "SF-Pro-Display-MediumItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-MediumItalic.otf"),
    "SF-Pro-Display-Regular": require("../assets/SanFranciscoPro/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-RegularItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-RegularItalic.otf"),
    "SF-Pro-Display-Semibold": require("../assets/SanFranciscoPro/SF-Pro-Display-Semibold.otf"),
    "SF-Pro-Display-SemiboldItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-SemiboldItalic.otf"),
    "SF-Pro-Display-Thin": require("../assets/SanFranciscoPro/SF-Pro-Display-Thin.otf"),
    "SF-Pro-Display-ThinItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-ThinItalic.otf"),
    "SF-Pro-Display-Ultralight": require("../assets/SanFranciscoPro/SF-Pro-Display-Ultralight.otf"),
    "SF-Pro-Display-UltralightItalic": require("../assets/SanFranciscoPro/SF-Pro-Display-UltralightItalic.otf"),
    "SF-Pro-Rounded-Bold": require("../assets/SanFranciscoPro/SF-Pro-Rounded-Bold.otf"),
    "SF-Pro-Rounded-Heavy": require("../assets/SanFranciscoPro/SF-Pro-Rounded-Heavy.otf"),
    "SF-Pro-Rounded-Light": require("../assets/SanFranciscoPro/SF-Pro-Rounded-Light.otf"),
    "SF-Pro-Rounded-Medium": require("../assets/SanFranciscoPro/SF-Pro-Rounded-Medium.otf"),
    "SF-Pro-Rounded-Regular": require("../assets/SanFranciscoPro/SF-Pro-Rounded-Regular.otf"),
    "SF-Pro-Rounded-Semibold": require("../assets/SanFranciscoPro/SF-Pro-Rounded-Semibold.otf"),
    "SF-Pro-Rounded-Thin": require("../assets/SanFranciscoPro/SF-Pro-Rounded-Thin.otf"),
    "SF-Pro-Rounded-Ultralight": require("../assets/SanFranciscoPro/SF-Pro-Rounded-Ultralight.otf"),
    "SF-Pro-Text-Bold": require("../assets/SanFranciscoPro/SF-Pro-Text-Bold.otf"),
    "SF-Pro-Text-BoldItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-BoldItalic.otf"),
    "SF-Pro-Text-Heavy": require("../assets/SanFranciscoPro/SF-Pro-Text-Heavy.otf"),
    "SF-Pro-Text-HeavyItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-HeavyItalic.otf"),
    "SF-Pro-Text-Light": require("../assets/SanFranciscoPro/SF-Pro-Text-Light.otf"),
    "SF-Pro-Text-LightItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-LightItalic.otf"),
    "SF-Pro-Text-Medium": require("../assets/SanFranciscoPro/SF-Pro-Text-Medium.otf"),
    "SF-Pro-Text-MediumItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-MediumItalic.otf"),
    "SF-Pro-Text-Regular": require("../assets/SanFranciscoPro/SF-Pro-Text-Regular.otf"),
    "SF-Pro-Text-RegularItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-RegularItalic.otf"),
    "SF-Pro-Text-Semibold": require("../assets/SanFranciscoPro/SF-Pro-Text-Semibold.otf"),
    "SF-Pro-Text-SemiboldItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-SemiboldItalic.otf"),
    "SF-Pro-Text-Thin": require("../assets/SanFranciscoPro/SF-Pro-Text-Thin.otf"),
    "SF-Pro-Text-ThinItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-ThinItalic.otf"),
    "SF-Pro-Text-Ultralight": require("../assets/SanFranciscoPro/SF-Pro-Text-Ultralight.otf"),
    "SF-Pro-Text-UltralightItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-UltralightItalic.otf"),
    "SF-Pro-Text-Black": require("../assets/SanFranciscoPro/SF-Pro-Text-Black.otf"),
    "SF-Pro-Text-BlackItalic": require("../assets/SanFranciscoPro/SF-Pro-Text-BlackItalic.otf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView />
            <TamaguiProvider config={config}>
              <ToastProvider
                burntOptions={{
                  from: "bottom",
                }}
              >
                <ToastViewport
                  flexDirection="column"
                  bottom={20}
                  left={0}
                  right={0}
                />

                <Toast />
                <Slot />
              </ToastProvider>
            </TamaguiProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </api.Provider>
    </>
  );
}
