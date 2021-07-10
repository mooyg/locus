import { StatusBar } from 'react-native';
import React from 'react';
import { NativeBaseProvider, Box, Image } from 'native-base';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <SafeAreaView>
          <Box
            bg="#111827"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Image
                source={{ uri: 'https://i.ibb.co/Gc6Ymym/logo.png' }}
                alt="logo"
                width="40px"
                height="40px"
              />
            </Box>
          </Box>
        </SafeAreaView>
      </SafeAreaProvider>
      <StatusBar backgroundColor="#4B5D67" />
    </NativeBaseProvider>
  );
}
