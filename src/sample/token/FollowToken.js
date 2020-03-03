import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import TextInput from '../components/TextInput';
import incognito from 'react-native-incognito-js';

const {AccountInstance} = incognito;

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
});

const FollowToken = ({account, onFollowed}) => {
  const [tokenId, setTokenId] = useState();

  if (account instanceof AccountInstance) {
    return (
      <View style={style.container}>
        <TextInput label="Token ID" onChangeText={setTokenId} />

        <Button
          title="Follow this token"
          onPress={async () => {
            try {
              if (!tokenId) {
                alert('Token ID is required');
                return;
              }

              await account.followTokenById(tokenId);

              alert('Followed new token, please reload Following List');
              onFollowed(tokenId);
            } catch (e) {
              alert('Followed token failed');
            }
          }}
        />
      </View>
    );
  }
  return null;
};

export default FollowToken;
