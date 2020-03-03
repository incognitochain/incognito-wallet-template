import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const style = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingVertical: 3,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  label: {
    flex: 1,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'black',
  },
  componentView: {
    flex: 1,
    padding: 5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
});

const Section = ({
  label,
  component,
  isShow = false,
  headerStyle,
  labelStyle,
  containerStyle,
}) => {
  const [show, setShow] = useState(isShow);

  return (
    <View style={[style.container, containerStyle]}>
      <View style={[style.header, headerStyle]}>
        <Text style={[style.label, labelStyle]}>{label}</Text>
        <Button
          title={show ? 'Hide' : 'Show'}
          onPress={() => {
            setShow(!show);
          }}
        />
      </View>
      {show && <View style={style.componentView}>{component}</View>}
    </View>
  );
};

export default Section;
