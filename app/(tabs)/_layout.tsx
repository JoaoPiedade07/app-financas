import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '@/components/TabBar';
import { useTheme } from '@/components/ThemeContext';
import { useLanguage } from '../Languages/LanguageContente';

export default function TabsLayout() {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  
  const isDark = theme === 'dark';
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0a7ea4',
        tabBarInactiveTintColor: isDark ? '#9BA1A6' : '#687076',
        tabBarStyle: {
          backgroundColor: isDark ? '#1C1E1F' : '#ffffff',
          borderTopColor: isDark ? '#2A2D2E' : '#e0e0e0',
        }
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: getText('home'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finances"
        options={{
          title: getText('finances'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: getText('budget'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: getText('profile'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}