import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Custom theme based on Material Design
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#000000',
    border: '#E0E0E0',
    notification: '#FF3B30',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#BB86FC',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#2C2C2E',
    notification: '#FF453A',
  },
};

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? CustomDarkTheme : CustomLightTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: isDark ? '#FFFFFF' : '#000000',
          },
          headerTintColor: isDark ? '#BB86FC' : '#6200EE',
          contentStyle: {
            backgroundColor: isDark ? '#121212' : '#F5F5F5',
          },
          animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            title: 'QR Код Уншигч'
          }} 
        />
        <Stack.Screen 
          name="QRScannerScreen" 
          options={{ 
            presentation: 'fullScreenModal',
            headerShown: false,
            title: 'QR код уншигч',
            gestureEnabled: true,
            animation: 'slide_from_bottom',
          }} 
        />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor="transparent" translucent />
    </ThemeProvider>
  );
}