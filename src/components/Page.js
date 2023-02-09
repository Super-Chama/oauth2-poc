import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

const Page = ({children}) => (
  <SafeAreaView style={styles.safe}>{children}</SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Page;
