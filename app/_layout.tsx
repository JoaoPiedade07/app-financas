import { Stack } from 'expo-router';
import { AuthProvider } from './(auth)/AuthContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { TransactionProvider } from './Transactions/TransactionContent';
import { LanguageProvider } from './Languages/LanguageContente';
import { ImageProvider } from './Image/ImageContent';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TransactionProvider>
            <ImageProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(signup)" options={{ headerShown: false }} />
                <Stack.Screen name="(profile)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
              </Stack>
            </ImageProvider>
          </TransactionProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}