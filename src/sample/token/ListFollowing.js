import React, {useState, useEffect, useCallback} from 'react';
import {View, ActivityIndicator, Button} from 'react-native';
import SectionSub2 from '../components/SectionSub2';
import TokenInfo from './TokenInfo';
import incognito from 'react-native-incognito-js';
import Transfer from './Transfer';
import UnfollowToken from './UnfollowToken';
import TxHistory from './TxHistory';

const {AccountInstance, PrivacyTokenInstance} = incognito;

const ListFollowing = ({account}) => {
  const [privacyTokens, setPrivacyTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(
    function reload() {
      if (account instanceof AccountInstance) {
        setLoading(true);
        account
          .getFollowingPrivacyToken()
          .then(setPrivacyTokens)
          .catch(() => {
            alert('Can not load token');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [account],
  );

  useEffect(() => {
    reload();
  }, [reload]);

  if (account instanceof AccountInstance) {
    return (
      <View>
        <Button title="Reload" onPress={reload} />
        {loading && <ActivityIndicator />}
        {privacyTokens &&
          privacyTokens.map(token => {
            if (token instanceof PrivacyTokenInstance) {
              return (
                <SectionSub2
                  key={token.tokenId}
                  label={`Token "${token.name}"`}
                  component={
                    <View>
                      <TokenInfo token={token} />
                      <SectionSub2
                        label="Transfer"
                        component={<Transfer token={token} nativeFee={50} />}
                      />
                      <SectionSub2
                        label="History"
                        component={<TxHistory token={token} />}
                      />
                      <UnfollowToken
                        tokenId={token.tokenId}
                        account={account}
                      />
                    </View>
                  }
                />
              );
            }
          })}
      </View>
    );
  }
  return null;
};

export default ListFollowing;
