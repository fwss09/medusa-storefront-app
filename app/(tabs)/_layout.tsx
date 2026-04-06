import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
                borderTopWidth: 0.6,
                borderTopColor: '#919191',
                height: 55 + insets.bottom,
                paddingBottom: insets.bottom
            },
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20
            },
            headerShadowVisible: false
        }}>
            <Tabs.Screen 
                name='home'
                options={{
                    title: 'Товари',
                    tabBarLabel: 'Товари',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='storefront-outline' size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name='cart'
                options={{
                    title: 'Кошик',
                    tabBarLabel: 'Кошик',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='bag-outline' size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}
