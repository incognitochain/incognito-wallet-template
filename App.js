/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import incognitoJs from 'react-native-incognito-js';
import storageService from './src/services/storage';
import WalletSection from './src/sample/wallet';
import AccountSection from './src/sample/account';
import NetworkSection from './src/sample/config';

// implement incognito module
incognitoJs.storageService.implement({
  setMethod: storageService.setItem,
  getMethod: storageService.getItem,
  removeMethod: storageService.removeItem,
});

const App = () => {
  const [wallet, setWallet] = useState(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>
              <NetworkSection />
              <WalletSection wallet={wallet} setWallet={setWallet} />
              <AccountSection wallet={wallet} setWallet={setWallet} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
