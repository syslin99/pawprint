import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/theme';


export default function MainHeader({title} : {title:string}) {
    return (
        <View style={styles.headerBar}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Link href='/settings' asChild>
                <Pressable style={styles.settingsButton} >
                    <Ionicons name='settings' color={theme.colorWhite} size={theme.fontSize24} style={styles.icon} />
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBar: {
        height: 64,
        backgroundColor: theme.colorDarkBlue,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerTitle: {
        flex: 1,
        marginLeft: 48 + theme.space4,
        textAlign: 'center',
        color: theme.colorWhite,
        fontSize: theme.fontSize24,
    },
    icon: {
        textAlign: 'center',
    },
    settingsButton: {
        height: 48,
        width: 48,
        marginRight: theme.space4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
