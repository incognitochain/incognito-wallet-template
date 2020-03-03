import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import TextInput from '../components/TextInput';
import CopyText from '../components/CopyText';
import incognito from 'react-native-incognito-js';

const style = StyleSheet.create({
  input: {
    marginVertical: 5,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultInput: {
    margin: 10,
  },
});

const {WalletInstance} = incognito;

const BackupWallet = ({wallet}) => {
  const [backupStr, setBackupStr] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    setBackupStr();
  }, [wallet]);

  if (wallet instanceof WalletInstance) {
    return (
      <View>
        <TextInput
          style={style.input}
          label="Backup password"
          onChangeText={setPassword}
        />
        <Button
          title="Get Backup"
          onPress={() => {
            try {
              if (password) {
                setBackupStr(wallet.backup(password));
              } else {
                alert('Backup password is required');
              }
            } catch (e) {
              alert('Backup failed');
            }
          }}
        />
        {backupStr && (
          <View style={style.resultContainer}>
            <Text>
              Encrypted wallet (use these encrypted string to restore the
              wallet)
            </Text>
            <CopyText style={style.resultInput}>{backupStr}</CopyText>
          </View>
        )}
      </View>
    );
  }

  return null;
};

export default BackupWallet;
