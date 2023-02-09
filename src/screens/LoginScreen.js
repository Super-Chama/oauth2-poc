import {Consumer} from '../context';
import React, {useState} from 'react';
import Page from '../components/Page';
import Button from '../components/Button';
import QRInput from '../components/QRInput';
import {StyleSheet, Image} from 'react-native';
import ActionContainer from '../components/ActionContainer';

const styles = StyleSheet.create({
  image: {
    width: '65%',
    marginTop: 50,
  },
  btnContainer: {
    top: 150,
    bottom: undefined,
  },
});

export default function HomeScreen() {
  const [instanceURL, setInstanceURL] = useState(null);

  return (
    <Consumer>
      {ctx => {
        // if (instanceURL === null) setInstanceURL(ctx.config.issuer);
        return (
          <Page>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require('../../assets/ohrm_branding.png')}
            />
            <ActionContainer style={styles.btnContainer}>
              <QRInput
                placeholder="Instance URL"
                value={instanceURL}
                onChange={e => setInstanceURL(e.target.value)}
              />
              <Button
                color="#f88400"
                onPress={() => ctx.signIn()}
                text="Sign In with OrangeHRM"
              />
            </ActionContainer>
          </Page>
        );
      }}
    </Consumer>
  );
}
