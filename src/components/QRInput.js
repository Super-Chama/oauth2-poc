import React from 'react';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';

const QRInput = props => (
  <View style={styles.container}>
    <TextInput {...props} />
    <Pressable style={styles.qrIconBtn}>
      <Image
        style={styles.qrIcon}
        source={require('../../assets/qr-code.png')}
      />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  qrIcon: {
    height: 35,
    width: 35,
  },
  qrIconBtn: {
    right: 5,
    alignSelf: 'center',
    position: 'absolute',
  },
});

export default QRInput;
