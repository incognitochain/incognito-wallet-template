import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import incognito from 'react-native-incognito-js';

const {AccountInstance} = incognito;

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
});

const UnfollowToken = ({account, tokenId, onUnfollowed}) => {
  if (account instanceof AccountInstance) {
    return (
      <View style={style.container}>
        <Button
          color="red"
          title="Unfollow this token"
          onPress={async () => {
            try {
              if (!tokenId) {
                alert('Token ID is required');
                return;
              }

              await account.unfollowTokenById(tokenId);

              alert('Unfollowed token, please reload Following List');
              onUnfollowed(tokenId);
            } catch (e) {
              alert('Unfollowed token failed');
            }
          }}
        />
      </View>
    );
  }
  return null;
};

export default UnfollowToken;
