import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import incognito from 'react-native-incognito-js';
import TokenInfo from './TokenInfo';
import SectionSub1 from '../components/SectionSub1';
import SectionSub2 from '../components/SectionSub2';
import IssueToken from './IssueToken';
import FollowToken from './FollowToken';
import ListFollowing from './ListFollowing';
import Transfer from './Transfer';
import TxHistory from './TxHistory';

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
  item: {
    marginVertical: 5,
  },
});

const {AccountInstance} = incognito;

const TokenSection = ({account}) => {
  const [nativeToken, setNativeToken] = useState(account.nativeToken);

  useEffect(() => {
    if (account instanceof AccountInstance) {
      setNativeToken(account.nativeToken);
    }
  }, [account]);

  if (account instanceof AccountInstance) {
    return (
      <View style={style.container}>
        <SectionSub1
          label="Native token (PRV)"
          component={
            <>
              <TokenInfo token={nativeToken} />
              <SectionSub2
                label="Transfer"
                component={<Transfer token={nativeToken} nativeFee={50} />}
              />
              <SectionSub2
                label="History"
                component={<TxHistory token={nativeToken} />}
              />
            </>
          }
        />
        <SectionSub1
          label="Privacy token"
          component={
            <View>
              <SectionSub2
                label="Issue token"
                component={<IssueToken account={account} />}
              />
              <SectionSub2
                label="Follow token"
                component={
                  <FollowToken account={account} onFollowed={() => null} />
                }
              />
              <SectionSub2
                label="Following List"
                component={<ListFollowing account={account} />}
              />
            </View>
          }
        />
      </View>
    );
  }

  return null;
};

export default TokenSection;
