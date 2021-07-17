import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export const SignInScreen = () => {
  const [result, setResult] = useState<WebBrowser.WebBrowserResult>();

  const handleLogin = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.io');
    setResult(result);
  };
  return (
    <View style={styles.signinscreencontainer}>
      <View style={styles.headercontainer}>
        <Image style={styles.tinyLogo} source={require('../assets/logo.png')} />
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
            <Pressable
              onPress={() => Alert.alert('Button with adjusted color pressed')}
              style={styles.signinbutton}
            >
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
