import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import TextInput from '../components/TextInput';
import incognito from 'react-native-incognito-js';

const style = StyleSheet.create({
  input: {
    marginVertical: 5,
  },
});

const {WalletInstance} = incognito;

const RestoreWallet = ({onRestored}) => {
  const [encryptedStr, setEncryptedStr] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <View>
      <TextInput
        style={style.input}
        label="Encrypted wallet"
        onChangeText={setEncryptedStr}
      />
      <TextInput
        style={style.input}
        label="Password"
        onChangeText={setPassword}
      />
      <Button
        title="Restore wallet"
        onPress={async () => {
          try {
            if (password && encryptedStr) {
              const wallet = await WalletInstance.restore(
                encryptedStr,
                password,
              );

              onRestored(wallet);
            } else {
              alert('Encrypted wallet & password is required');
            }
          } catch (e) {
            alert('Restore failed');
          }
        }}
      />
    </View>
  );
};

export default RestoreWallet;
