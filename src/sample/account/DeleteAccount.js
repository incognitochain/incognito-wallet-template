import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import incognito from 'react-native-incognito-js';

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
  item: {
    marginVertical: 5,
  },
});

const {WalletInstance, AccountInstance} = incognito;

const DeleteAccount = ({wallet, account, onDeleted}) => {
  if (wallet instanceof WalletInstance && account instanceof AccountInstance) {
    return (
      <View style={style.container}>
        <Button
          color="red"
          title="Delete this account"
          onPress={() => {
            wallet.masterAccount.removeAccount(account.name);
            onDeleted();
          }}
        />
      </View>
    );
  }

  return null;
};

export default DeleteAccount;
