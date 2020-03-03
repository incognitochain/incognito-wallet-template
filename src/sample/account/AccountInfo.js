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

const {AccountInstance} = incognito;

const AccountInfo = ({account}) => {
  if (account instanceof AccountInstance) {
    return (
      <View style={style.container}>
        <LabelValueItem label="Name" value={account.name} />
        <LabelValueItem
          label="From"
          value={account.isImport ? 'Import' : 'Create'}
        />
        <LabelValueItem
          label="Payment address"
          value={account.key.keySet.paymentAddressKeySerialized}
        />
        <LabelValueItem
          label="Public key"
          value={account.key.keySet.publicKeySerialized}
        />
        <LabelValueItem
          label="Private key"
          value={account.key.keySet.privateKeySerialized}
        />
        <LabelValueItem
          label="Viewing key"
          value={account.key.keySet.viewingKeySerialized}
        />
        <LabelValueItem
          label="BLS public key encode"
          asyncValue={account.getBLSPublicKeyB58CheckEncode.bind(account)}
        />
      </View>
    );
  }

  return null;
};

export default AccountInfo;
