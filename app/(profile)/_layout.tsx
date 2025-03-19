import React from 'react';
import { Stack } from 'expo-router';
import { LanguageProvider } from '../Languages/LanguageContente';

export default function ProfileLayout() {
  return (
    <LanguageProvider>
      <Stack>
        <Stack.Screen name="settings" options={{ headerTitle: "Settings" }} />
        {/* Add other profile screens here if needed */}
      </Stack>
    </LanguageProvider>
  );
}