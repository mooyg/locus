import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { api } from "../client";
import { Slot } from "expo-router";
import { useState } from "react";
import superjson from "superjson";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, View } from "react-native";

import * as SecureStore from "expo-secure-store";
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
  return (
    <>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView />
            <Slot />
          </SafeAreaProvider>
        </QueryClientProvider>
      </api.Provider>
    </>
  );
}
