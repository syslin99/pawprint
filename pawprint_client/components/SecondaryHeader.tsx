import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { THEME } from '@/theme';


export default function SecondaryHeader({title, hasEditActions} : {title:string, hasEditActions:boolean}) {
    return (
        <View style={styles.headerBar}>
            <Pressable
                onPress={() => router.back()}
                style={[styles.headerButton, styles.backButton]}
            >
                <FontAwesome name='close' color={THEME.COLOR_WHITE} size={THEME.FONT_SIZE_24} style={styles.icon} />
            </Pressable>
            <Text style={styles.headerTitle}>{title}</Text>
            { (hasEditActions) &&
                <View style={styles.editRow}>
                    {/* <Link href='/edit' asChild> */}
                        <Pressable onPress={() => alert('edit')} style={styles.headerButton}>
                            <FontAwesome5 name='pen' color={THEME.COLOR_WHITE} size={THEME.FONT_SIZE_24} style={styles.icon} />
                        </Pressable>
                    {/* </Link> */}
                    {/* <Link href='/delete' asChild> */}
                        <Pressable onPress={() => alert('delete')} style={styles.headerButton}>
                            <FontAwesome5 name='trash' color={THEME.COLOR_WHITE} size={THEME.FONT_SIZE_24} style={styles.icon} />
                        </Pressable>
                    {/* </Link> */}
                </View>
            }
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
        color: THEME.COLOR_WHITE,
        fontSize: THEME.FONT_SIZE_24,
    },
    headerButton: {
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        textAlign: 'center',
    },
    backButton: {
        marginLeft: THEME.SPACE_4,
        marginRight: THEME.SPACE_4,
    },
    editRow : {
        flexDirection: 'row',
        marginRight: THEME.SPACE_4,
    },
});
