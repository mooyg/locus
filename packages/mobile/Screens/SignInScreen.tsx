import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { storeData } from '../utils/storeData';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  signInUpdate: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
export const SignInScreen = ({ signInUpdate }: Props) => {
  const [result, setResult] = useState<WebBrowser.WebBrowserResult>();
  const userDetails = async (url: string) => {
    const { queryParams } = Linking.parse(url);
    console.log('1');
    await storeData(queryParams, '@user_details');
    console.log('2');
    signInUpdate(true);
  };
  const urlHandler = ({ url }: any) => {
    userDetails(url);
  };
  useEffect(() => {
    Linking.addEventListener('url', urlHandler);
    return () => Linking.removeEventListener('url', urlHandler);
  }, []);
  const handleLogin = async () => {
    let result = await WebBrowser.openBrowserAsync(
      'http://10.0.2.2:4000/api/auth/discord/mobileapp'
    );
    setResult(result);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.signinscreencontainer}>
        <View style={styles.headercontainer}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/logo.png')}
          />
        </View>
        <View style={styles.signincontainer}>
          <View style={styles.signinbox}>
            <View>
              <Text
                style={{
                  color: '#EEEEEE',
                  fontSize: 24,
                  fontFamily: 'MontserratSemiBold',
                  marginBottom: 10,
                }}
              >
                Login To Locus
              </Text>
              <Text
                style={{
                  color: '#EEEEEE',
                  fontFamily: 'MontserratSemiBold',
                }}
              >
                Stay Safe.
              </Text>
            </View>
            <View>
              <Pressable onPress={handleLogin} style={styles.signinbutton}>
                <Image
                  style={styles.discordpng}
                  source={require('../assets/Discord.png')}
                />
                <Text
                  style={{
                    fontFamily: 'MontserratSemiBold',
                    color: 'white',
                    padding: 8,
                  }}
                >
                  Continue with Discord
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  signinscreencontainer: {
    height: '100%',
    backgroundColor: '#111827',
    color: 'white',
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  headercontainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 4,
    justifyContent: 'space-between',
  },
  signincontainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinbox: {
    backgroundColor: '#3A4750',
    padding: 50,
    borderRadius: 16,
  },
  signinbutton: {
    color: 'white',
    backgroundColor: '#4B5D67',
    borderRadius: 12,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  discordpng: {
    marginRight: 2,
    tintColor: 'white',
  },
});
