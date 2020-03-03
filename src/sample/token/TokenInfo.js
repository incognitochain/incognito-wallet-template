import React from 'react';
import {View, StyleSheet} from 'react-native';
import LabelValueItem from '../components/LabelValueItem';

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
  item: {
    marginVertical: 5,
  },
});

const TokenInfo = ({token}) => {
  return (
    <View style={style.container}>
      <LabelValueItem label="Name" value={token.name} />
      <LabelValueItem label="ID" value={token.tokenId} />
      <LabelValueItem label="Symbol" value={token.symbol} />
      {token.isPrivacyToken && (
        <>
          <LabelValueItem label="Total Supply" value={token.totalSupply} />
          <LabelValueItem
            label="Has exchange rate"
            asyncValue={token.hasExchangeRate.bind(token)}
          />
        </>
      )}
      <LabelValueItem
        label="Total balance"
        asyncValue={async () => (await token.getTotalBalance()).toNumber()}
      />
      <LabelValueItem
        label="Available balance"
        asyncValue={async () => (await token.getAvaiableBalance()).toNumber()}
      />
    </View>
  );
};

export default TokenInfo;
