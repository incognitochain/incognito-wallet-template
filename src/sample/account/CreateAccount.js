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

const CreateAccount = ({onCreated, wallet}) => {
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
        <Button
          title={`Create account ${name ? `"${name}"` : ''}`}
          onPress={async () => {
            try {
              if (name) {
                setLoading(true);
                const account = await wallet.masterAccount.addAccount(name);

                if (account) {
                  onCreated && onCreated(account);
                  alert('Account was created');
                }
              } else {
                alert('Account name is required');
              }
            } catch (e) {
              alert('Create account failed');
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

export default CreateAccount;
