import { Pressable, StyleSheet } from 'react-native';
import { Tabs, Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { THEME } from '@/theme';


export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            // Navigation bar
            tabBarStyle: {
                height: 80,
                backgroundColor: THEME.COLOR_DARK_BLUE,
                paddingTop: THEME.SPACE_12,
                paddingBottom: THEME.SPACE_16,
            },
            tabBarLabelStyle: {
                fontSize: THEME.FONT_SIZE_12,
            },
            tabBarActiveTintColor: THEME.COLOR_LIGHT_BLUE,
            tabBarInactiveTintColor: THEME.COLOR_WHITE,
        }}>
            {/* Log tab */}
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Log',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='list' color={color} size={THEME.FONT_SIZE_24}/>
                    ),
                }}
            />
            {/* Events tab */}
            <Tabs.Screen
                name='events'
                options={{
                    title: 'Events',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='calendar-clear' color={color} size={THEME.FONT_SIZE_24}/>
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
                                <Ionicons name='add' color={color} size={THEME.FONT_SIZE_24} style={styles.centerIcon} />
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
                        <Ionicons name='medical' color={color} size={THEME.FONT_SIZE_24}/>
                    ),
                }}
            />
            {/* Pets tab */}
            <Tabs.Screen
                name='pets'
                options={{
                    title: 'Pets',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='paw' color={color} size={THEME.FONT_SIZE_24}/>
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
        backgroundColor: THEME.COLOR_MEDIUM_BLUE,
        height: 76,
        width: 76,
        top: -30,
        borderRadius: '50%',
        borderWidth: THEME.SPACE_4,
        borderColor: THEME.COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerIcon: {
        textAlign: 'center',
    },
    settingsButton: {
        height: 48,
        width: 48,
        marginRight: THEME.SPACE_4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsIcon: {
        textAlign: 'center',
    },
});
