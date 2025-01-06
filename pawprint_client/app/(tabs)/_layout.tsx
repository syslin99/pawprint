import { Pressable, StyleSheet } from 'react-native';
import { Tabs, Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { theme } from '@/theme';


export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            // Navigation bar
            tabBarStyle: {
                height: 80,
                backgroundColor: theme.colorDarkBlue,
                paddingTop: theme.space12,
                paddingBottom: theme.space16,
            },
            tabBarLabelStyle: {
                fontSize: theme.fontSize12,
            },
            tabBarActiveTintColor: theme.colorLightBlue,
            tabBarInactiveTintColor: theme.colorWhite,
        }}>
            {/* Log tab */}
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Log',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='list' color={color} size={theme.fontSize24}/>
                    ),
                }}
            />
            {/* Events tab */}
            <Tabs.Screen
                name='events'
                options={{
                    title: 'Events',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='calendar-clear' color={color} size={theme.fontSize24}/>
                    ),
                }}
            />
            {/* Add Entry tab */}
            <Tabs.Screen
                name='add_entry'
                options={{
                    title: 'Add Entry',
                    tabBarIcon: ({ color }) => (
                        <Link href='/add_entry' asChild>
                            <Pressable style={styles.centerTab}>
                                <Ionicons name='add' color={color} size={theme.fontSize48} style={styles.centerIcon} />
                            </Pressable>
                        </Link>
                    ),
                }}
            />

            {/* Vitals tab */}
            <Tabs.Screen
                name='vitals'
                options={{
                    title: 'Vitals',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='medical' color={color} size={theme.fontSize24}/>
                    ),
                }}
            />
            {/* Pets tab */}
            <Tabs.Screen
                name='pets'
                options={{
                    title: 'Pets',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='paw' color={color} size={theme.fontSize24}/>
                    ),
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
    },
    centerTab: {
        backgroundColor: theme.colorMediumBlue,
        height: 76,
        width: 76,
        top: -30,
        borderRadius: '50%',
        borderWidth: theme.space4,
        borderColor: theme.colorWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerIcon: {
        textAlign: 'center',
    },
    settingsButton: {
        height: 48,
        width: 48,
        marginRight: theme.space4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsIcon: {
        textAlign: 'center',
    },
});
