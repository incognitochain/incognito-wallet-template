import React from 'react';
import {View, StyleSheet} from 'react-native';
import incognito from 'react-native-incognito-js';
import LabelValueItem from '../components/LabelValueItem';

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
  item: {
    marginVertical: 5,
  },
});

const {WalletInstance} = incognito;

const WalletInfo = ({wallet}) => {
  if (wallet instanceof WalletInstance) {
    return (
      <View style={style.container}>
        <LabelValueItem label="Name" value={wallet.name} />
        <LabelValueItem label="Passphrase" value={wallet.passPhrase} />
        <LabelValueItem label="Mnemonic" value={wallet.mnemonic} />
        <LabelValueItem label="Seed" value={wallet.seed} />
      </View>
    );
  }

  return null;
};

export default WalletInfo;
