import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import CopyText from '../components/CopyText';

const style = StyleSheet.create({
  container: {
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    flexBasis: 100,
    fontWeight: '300',
    color: 'black',
  },
  value: {
    flex: 1,
  },
});

const LabelValueItem = ({value, asyncValue, label}) => {
  const [loading, setLoading] = useState(false);
  const [asyncValueResult, setAsyncValueResult] = useState(null);

  useEffect(() => {
    if (typeof asyncValue === 'function') {
      setLoading(true);
      asyncValue()
        .then(setAsyncValueResult)
        .catch(() => setAsyncValueResult(null))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [asyncValue]);

  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>
      {value && <CopyText style={style.value}>{value}</CopyText>}
      {asyncValue &&
        (loading ? (
          <ActivityIndicator />
        ) : (
          <CopyText style={style.value}>{asyncValueResult}</CopyText>
        ))}
    </View>
  );
};

export default LabelValueItem;
