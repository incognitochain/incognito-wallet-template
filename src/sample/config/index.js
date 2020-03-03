import React from 'react';
import {View, StyleSheet} from 'react-native';
import Network from './Network';

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 3,
    paddingBottom: 20,
  },
});

const ConfigSection = () => {
  return (
    <View style={style.container}>
      <Network />
    </View>
  );
};

export default ConfigSection;
