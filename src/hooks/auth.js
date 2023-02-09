import {Alert} from 'react-native';
import {useState, useCallback} from 'react';
import {revoke, refresh, authorize} from 'react-native-app-auth';

export default function useAuth(
  config,
  defaultAuthState = {
    accessToken: null,
    refreshToken: null,
    hasLoggedInOnce: false,
    accessTokenExpirationDate: null,
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
        sendClientId: true,
        tokenToRevoke: authState.accessToken,
      });

      setAuthState({
        accessToken: null,
        refreshToken: null,
        accessTokenExpirationDate: null,
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
