import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import incognito from 'react-native-incognito-js';
import CreateAccount from './CreateAccount';
import AccountInfo from './AccountInfo';
import ImportAccount from './ImportAccount';
import Section from '../components/Section';
import SectionSub1 from '../components/SectionSub1';
import DeleteAccount from './DeleteAccount';
import TokenSection from '../token';

const style = StyleSheet.create({
  container: {
    padding: 3,
  },
  item: {
    marginVertical: 5,
  },
});

const {WalletInstance} = incognito;

const AccountSection = ({wallet}) => {
  const [accounts, setAccount] = useState([]);

  useEffect(() => {
    wallet && setAccount([...wallet.masterAccount.getAccounts()]);
  }, [wallet]);

  function loadAccountList() {
    setAccount([...wallet.masterAccount.getAccounts()]);
  }

  if (wallet instanceof WalletInstance) {
    return (
      <View style={style.container}>
        <Section
          label="Create account"
          component={
            <CreateAccount wallet={wallet} onCreated={loadAccountList} />
          }
        />
        <Section
          label="Import account"
          component={
            <ImportAccount wallet={wallet} onImported={loadAccountList} />
          }
        />
        <Section
          label="Account list"
          component={accounts.map(account => {
            return (
              <SectionSub1
                key={account.name}
                label={`Account "${account.name}"`}
                component={
                  <View>
                    <AccountInfo account={account} />
                    <TokenSection account={account} />
                    <DeleteAccount
                      account={account}
                      wallet={wallet}
                      onDeleted={loadAccountList}
                    />
                  </View>
                }
              />
            );
          })}
        />
      </View>
    );
  }

  return null;
};

export default AccountSection;
