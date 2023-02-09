import React from 'react';
import {StyleSheet, SafeAreaView, Image} from 'react-native';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default () => (
  <SafeAreaView style={styles.safe}>
    <Image source={require('../../assets/loader.gif')} />
  </SafeAreaView>
);
