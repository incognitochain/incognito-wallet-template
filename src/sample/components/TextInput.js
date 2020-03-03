import React from 'react';
import {View, TextInput, Text, StyleSheet, Platform} from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 5,
  },
  label: {
    color: 'black',
    marginBottom: 3,
    fontSize: 12,
  },
  input: {
    height: Platform.OS === 'ios' ? 30 : 40,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 5,
  },
});

const TInput = ({style: inputStyle, label, ...props}) => {
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>
      <TextInput style={[style.input, inputStyle]} {...props} />
    </View>
  );
};

export default TInput;
