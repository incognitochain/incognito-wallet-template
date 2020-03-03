import React, {useState} from 'react';
import {View, StyleSheet, Button, ActivityIndicator} from 'react-native';
import TextInput from '../components/TextInput';
import LabelValueItem from '../components/LabelValueItem';
import incognito from 'react-native-incognito-js';

const {AccountInstance} = incognito;

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
  item: {
    marginVertical: 5,
  },
});

const IssueToken = ({account}) => {
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState();

  if (account instanceof AccountInstance) {
    return (
      <View style={style.container}>
        <TextInput label="Name" onChangeText={setName} />
        <TextInput label="Symbol" onChangeText={setSymbol} />
        <TextInput
          label="Supply amount"
          onChangeText={setAmount}
          keyboardType="number-pad"
        />
        {txId ? (
          <LabelValueItem label="Tx Id" value={txId} />
        ) : loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Issue"
            onPress={async () => {
              try {
                setLoading(true);

                const parsedAmount = Number.parseInt(amount, 10);
                if (typeof name !== 'string') {
                  alert('Name must be a string');
                  return;
                }
                if (typeof symbol !== 'string') {
                  alert('Symbol must be a string');
                  return;
                }
                if (typeof parsedAmount !== 'number') {
                  alert('Amount must be a number');
                  return;
                }

                const tx = await account.issuePrivacyToken({
                  tokenName: name,
                  tokenSymbol: symbol,
                  supplyAmount: parsedAmount,
                });

                alert(`Issued token ${name}, take a while to complete`);
                setTxId(tx.txId);
              } catch (e) {
                alert('Issue token failed');
              } finally {
                setLoading(false);
              }
            }}
          />
        )}
      </View>
    );
  }
  return null;
};

export default IssueToken;
