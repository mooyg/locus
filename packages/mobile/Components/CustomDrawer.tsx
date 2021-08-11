import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Linking } from 'react-native';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
    </DrawerContentScrollView>
  );
}
