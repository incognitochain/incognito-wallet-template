import React, {useState} from 'react';
import {View, Button, ActivityIndicator, StyleSheet} from 'react-native';
import TextInput from '../components/TextInput';
import incognito from 'react-native-incognito-js';

const style = StyleSheet.create({
  input: {
    marginVertical: 5,
  },
});

async function initWallet(passPharse, name) {
  const wallet = new incognito.WalletInstance();
  return await wallet.init(passPharse, name);
}

const CreateWallet = ({onCreated}) => {
  const [passPharse, setPassPharse] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <TextInput
        style={style.input}
        onChangeText={setName}
        label="Wallet name"
      />
      <TextInput
        style={style.input}
        onChangeText={setPassPharse}
        label="Wallet passphrase"
      />
      <Button
        title={`Create wallet ${name ? `"${name}"` : ''}`}
        onPress={async () => {
          try {
            setLoading(true);
            const wallet = await initWallet(passPharse, name);

            onCreated(wallet);
          } catch (e) {
            alert('Create wallet failed');
          } finally {
            setLoading(false);
          }
        }}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
};

export default CreateWallet;
