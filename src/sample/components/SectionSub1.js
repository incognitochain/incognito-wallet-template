import React from 'react';
import {StyleSheet} from 'react-native';
import Section from './Section';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1111',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  label: {
    flex: 1,
    color: 'grey',
    fontSize: 12,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 3,
  },
});

const SectionSub1 = ({
  isShow = false,
  headerStyle,
  labelStyle,
  ...sectionProps
}) => {
  return (
    <Section
      containerStyle={style.container}
      headerStyle={style.header}
      labelStyle={style.label}
      isShow={isShow}
      {...sectionProps}
    />
  );
};

export default SectionSub1;
