import { Stack } from 'expo-router';
import { AuthProvider } from './(auth)/AuthContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { TransactionProvider } from './Transactions/TransactionContent';
import { LanguageProvider } from './Languages/LanguageContente';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TransactionProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(signup)" options={{ headerShown: false }} />
              <Stack.Screen name="(profile)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </TransactionProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}