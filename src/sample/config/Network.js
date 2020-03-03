import React, {useState} from 'react';
import {View, Button} from 'react-native';
import TextInput from '../components/TextInput';
import incognito from 'react-native-incognito-js';

const {getConfig, setConfig} = incognito;

const Network = () => {
  const [network, setNetwork] = useState(getConfig().chainURL);

  return (
    <View>
      <TextInput onChangeText={setNetwork} value={network} label="Chain URL" />
      <Button
        title="Set URL"
        onPress={() => {
          setConfig({
            chainURL: network,
          });
          alert('Your config was applied');
        }}
      />
    </View>
  );
};

export default Network;
