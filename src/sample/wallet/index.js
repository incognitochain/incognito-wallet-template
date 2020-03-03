import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CreateWallet from './CreateWallet';
import RestoreWallet from './RestoreWallet';
import WalletInfo from './WalletInfo';
import BackupWallet from './BackupWallet';
import Section from '../components/Section';

const style = StyleSheet.create({
  content: {
    padding: 3,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

const MODE = {
  CREATE: 1,
  RESTORE: 2,
};

const WalletSection = ({wallet, setWallet}) => {
  const [mode, setMode] = useState(MODE.CREATE);

  function switchMode(_mode) {
    setMode(_mode);

    // clear wallet
    setWallet();
  }

  return (
    <View>
      <View>
        <View style={style.tabContainer}>
          <TouchableOpacity
            style={style.tab}
            onPress={() => switchMode(MODE.CREATE)}>
            <Text>CREATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.tab}
            onPress={() => switchMode(MODE.RESTORE)}>
            <Text>RESTORE</Text>
          </TouchableOpacity>
        </View>
        <View style={style.content}>
          {mode === MODE.CREATE && <CreateWallet onCreated={setWallet} />}
          {mode === MODE.RESTORE && <RestoreWallet onRestored={setWallet} />}
        </View>
      </View>
      {wallet && (
        <Section
          label="Wallet info"
          component={<WalletInfo wallet={wallet} />}
        />
      )}
      {wallet && (
        <Section
          label="Backup wallet"
          component={<BackupWallet wallet={wallet} />}
        />
      )}
    </View>
  );
};

export default WalletSection;
