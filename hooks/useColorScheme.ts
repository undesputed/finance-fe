import { useColorScheme as useNativeColorScheme } from 'react-native';

// A simple hook that wraps react-native's useColorScheme, for consistency with your import style
export function useColorScheme() {
  return useNativeColorScheme();
}
