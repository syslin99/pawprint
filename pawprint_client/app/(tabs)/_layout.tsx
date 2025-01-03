import { Tabs } from 'expo-router';


export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{ title: 'Log' }} />
            <Tabs.Screen name='events' options={{ title: 'Events' }} />
            <Tabs.Screen name='add_entry' options={{ title: 'Add Entry' }} />
            <Tabs.Screen name='vitals' options={{ title: 'Vitals' }} />
            <Tabs.Screen name='pets' options={{ title: 'Pets' }} />
        </Tabs>
    )
}
