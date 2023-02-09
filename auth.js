import {Alert} from 'react-native';
import {useState, useCallback} from 'react';
import {revoke, refresh, authorize} from 'react-native-app-auth';

export default function useAuth(
  config,
  defaultAuthState = {
    hasLoggedInOnce: false,
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
  },
) {
  const [authState, setAuthState] = useState(defaultAuthState);

  const handleAuthorize = useCallback(async () => {
    try {
      const newAuthState = await authorize({
        ...config,
        connectionTimeoutSeconds: 5,
        iosPrefersEphemeralSession: true,
      });

      setAuthState({
        hasLoggedInOnce: true,
        ...newAuthState,
      });
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  }, [config]);

  const handleRefresh = useCallback(async () => {
    try {
      const newAuthState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });

      setAuthState(current => ({
        ...current,
        ...newAuthState,
        refreshToken: newAuthState.refreshToken || current.refreshToken,
      }));
    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  }, [config, authState]);

  const handleRevoke = useCallback(async () => {
    try {
      await revoke(config, {
        tokenToRevoke: authState.accessToken,
        sendClientId: true,
      });

      setAuthState({
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  }, [config, authState]);

  return {
    authState,
    handleRevoke,
    handleRefresh,
    handleAuthorize,
  };
}
