import React, {useState} from 'react';
import {View, StyleSheet, Button, ActivityIndicator} from 'react-native';
import TextInput from '../components/TextInput';
import LabelValueItem from '../components/LabelValueItem';

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
  item: {
    marginVertical: 5,
  },
});

const Transfer = ({token, nativeFee, privacyFee}) => {
  const [paymentAddress, setPaymentAddress] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState();

  const parsedAmount = Number.parseInt(amount, 10);

  return (
    <View style={style.container}>
      <TextInput label="Payment Address" onChangeText={setPaymentAddress} />
      <TextInput
        label="Amount"
        onChangeText={setAmount}
        keyboardType="number-pad"
      />

      {txId ? (
        <LabelValueItem label="Tx Id" value={txId} />
      ) : loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Transfer"
          onPress={async () => {
            try {
              setLoading(true);

              if (typeof paymentAddress !== 'string') {
                alert('Payment address must be a string');
                return;
              }
              if (typeof parsedAmount !== 'number') {
                alert('Amount must be a number');
                return;
              }

              // can send to multiple receiver
              const tx = await token.transfer(
                [
                  {
                    paymentAddressStr: paymentAddress,
                    amount: parsedAmount,
                    message: '',
                  },
                ],
                nativeFee,
                privacyFee,
              );

              setTxId(tx.txId);
            } catch (e) {
              alert('Transfer token failed');
            } finally {
              setLoading(false);
            }
          }}
        />
      )}
    </View>
  );
};

export default Transfer;
