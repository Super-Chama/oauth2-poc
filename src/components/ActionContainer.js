import React from 'react';
import {StyleSheet, View} from 'react-native';

const ActionContainer = props => {
  const {style, ...rest} = props;
  return <View style={{...styles.view, ...(style && style)}} {...rest} />;
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    margin: 20,
    gap: 10,
  },
});

export default ActionContainer;
