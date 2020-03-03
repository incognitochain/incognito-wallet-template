import React, {useState} from 'react';
import {View, Button, ActivityIndicator, StyleSheet} from 'react-native';
import TextInput from '../components/TextInput';
import incognito from 'react-native-incognito-js';

const style = StyleSheet.create({
  input: {
    marginVertical: 5,
  },
});

const {WalletInstance} = incognito;

const ImportAccount = ({onImported, wallet}) => {
  const [privateKey, setPrivateKey] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  if (wallet instanceof WalletInstance) {
    return (
      <View>
        <TextInput
          style={style.input}
          onChangeText={setName}
          label="Account name"
        />
        <TextInput
          style={style.input}
          onChangeText={setPrivateKey}
          label="Account private key"
        />
        <Button
          title="Import account"
          onPress={async () => {
            try {
              if (name && privateKey) {
                setLoading(true);
                const account = await wallet.masterAccount.importAccount(
                  name,
                  privateKey,
                );

                if (account) {
                  onImported && onImported(account);
                  alert('Account was imported');
                }
              } else {
                alert('Account name and private key is required');
              }
            } catch (e) {
              alert('Import account failed');
            } finally {
              setLoading(false);
            }
          }}
        />
        {loading && <ActivityIndicator />}
      </View>
    );
  }

  return null;
};

export default ImportAccount;
