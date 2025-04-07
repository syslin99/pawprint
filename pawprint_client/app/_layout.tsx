import { Stack } from 'expo-router';

import { StoreProvider } from '@/components/StoreContext';


export default function RootLayout() {
    return (
        <StoreProvider>
            <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false, statusBarStyle: 'light' }} />
                <Stack.Screen name='settings' options={{ headerShown: false }} />
                <Stack.Screen name='pets/[id]' options={{ headerShown: false }} />
                <Stack.Screen name='entries/[id]' options={{headerShown: false }} />
                <Stack.Screen name='vitals/[pet_id]' options={{headerShown: false }} />
            </Stack>
        </StoreProvider>
    )
}
