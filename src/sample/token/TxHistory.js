import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Button, ActivityIndicator} from 'react-native';
import incognito from 'react-native-incognito-js';
import LabelValueItem from '../components/LabelValueItem';
import SectionSub2 from '../components/SectionSub2';

const {historyServices} = incognito;

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
  item: {
    marginVertical: 5,
  },
});

const TxHistory = ({token}) => {
  const [txHistories, setTxHistories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTxs = useCallback(
    async function() {
      try {
        setLoading(true);
        await historyServices.checkCachedHistories();
        setTxHistories(await token.getTxHistories());
      } catch (e) {
        alert('Load history failed');
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    loadTxs();
  }, [loadTxs]);

  return (
    <View style={style.container}>
      <Button title="Reload" onPress={loadTxs} />
      {loading && <ActivityIndicator />}
      {txHistories &&
        txHistories.map(txHistory => (
          <SectionSub2
            key={txHistory.txId}
            label={txHistory.txId}
            component={
              <>
                <LabelValueItem label="txId" value={txHistory.txId} />
                <LabelValueItem label="txType" value={txHistory.txType} />
                <LabelValueItem label="lockTime" value={txHistory.lockTime} />
                <LabelValueItem label="status" value={txHistory.status} />
                <LabelValueItem label="meta" value={txHistory.meta} />
                <LabelValueItem
                  label="nativeTokenInfo"
                  value={txHistory.nativeTokenInfo}
                />
                <LabelValueItem
                  label="privacyTokenInfo"
                  value={txHistory.privacyTokenInfo}
                />
              </>
            }
          />
        ))}
    </View>
  );
};

export default TxHistory;
