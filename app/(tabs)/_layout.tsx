import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { Ionicons } from '@expo/vector-icons';
import TransactionProvider from '../Transactions/TransactionContent';

export default function RootLayout() {
    return (
        <TransactionProvider>
            <Tabs tabBar = { props => <TabBar {...props} /> }>
                <Tabs.Screen name = "home" options= {{ headerShown: false, tabBarIcon: ({ color, size }) => ( 
                    <Ionicons name = "home-outline" size = {size} color = {color} /> ),
                    }} />
                <Tabs.Screen name = "finances" options= {{ headerShown: false, tabBarIcon: ({ color, size }) => ( 
                    <Ionicons name = "bar-chart-outline" size = {size} color = {color} /> ),
                    }} />
                <Tabs.Screen name = "budget" options= {{ headerShown: false, tabBarIcon: ({ color, size }) => ( 
                    <Ionicons name = "list-outline" size = {size} color = {color} /> ),
                    }} />
                <Tabs.Screen name = "profile" options= {{ headerShown: false, tabBarIcon: ({ color, size }) => ( 
                    <Ionicons name = "person-outline" size = {size} color = {color} /> ),
                    }} />
            </Tabs>
        </TransactionProvider>
    );
};