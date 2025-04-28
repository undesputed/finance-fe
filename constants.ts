// Central place for client-server base URL
import { Platform } from 'react-native';

// Use your computer's LAN IP for physical device access
export const SERVER_URL = Platform.select({
  ios: 'http://192.168.100.26:8000',
  android: 'http://192.168.100.26:8000',
  default: 'http://192.168.100.26:8000',
});
