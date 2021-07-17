import React, { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
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
          <Text
            style={{
              color: '#EEEEEE',
              fontWeight: '700',
              fontSize: 24,
              fontFamily: 'Montserrat',
            }}
          >
            Login to Locus
          </Text>
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
    padding: 40,
    borderRadius: 16,
  },
});
