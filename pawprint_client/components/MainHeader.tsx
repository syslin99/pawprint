import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '@/theme';


export default function MainHeader({title} : {title:string}) {
    return (
        <View style={styles.headerBar}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Link href='/settings' asChild>
                <Pressable style={styles.settingsButton} >
                    <Ionicons name='settings' color={THEME.COLOR_WHITE} size={THEME.SPACE_24} style={styles.icon} />
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBar: {
        height: 64,
        backgroundColor: THEME.COLOR_DARK_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerTitle: {
        flex: 1,
        marginLeft: 48 + THEME.SPACE_4,
        textAlign: 'center',
        color: THEME.COLOR_WHITE,
        fontSize: THEME.FONT_SIZE_24,
    },
    icon: {
        textAlign: 'center',
    },
    settingsButton: {
        height: 48,
        width: 48,
        marginRight: THEME.SPACE_4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
