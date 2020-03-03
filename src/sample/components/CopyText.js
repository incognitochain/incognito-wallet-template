import React from 'react';
import {Text, StyleSheet, Clipboard, TouchableOpacity} from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    width: 50,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  textBox: {
    borderWidth: 0.1,
    borderStyle: 'dotted',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

const CopyText = ({
  children,
  style: containerStyle,
  textStyle,
  ...textProps
}) => {
  const stringData =
    typeof children === 'string'
      ? children
      : [null, undefined].indexOf(children) === -1
      ? JSON.stringify(children)
      : '---';
  return (
    <TouchableOpacity
      style={[style.container, containerStyle]}
      onPress={() => {
        try {
          Clipboard.setString(stringData);
          alert('Copied');
        } catch (e) {
          alert('Copy failed');
        }
      }}>
      <Text style={[style.textBox, textStyle]} {...textProps}>
        {stringData}
      </Text>
      <Text style={style.label}>Copy</Text>
    </TouchableOpacity>
  );
};

export default CopyText;
