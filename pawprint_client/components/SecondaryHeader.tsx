import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { theme } from '@/theme';


export default function SecondaryHeader({title, hasEditActions} : {title:string, hasEditActions:boolean}) {
    return (
        <View style={styles.headerBar}>
            <Pressable
                onPress={() => router.back()}
                style={[styles.headerButton, styles.backButton]}
            >
                <FontAwesome name='close' color={theme.colorWhite} size={theme.fontSize24} style={styles.icon} />
            </Pressable>
            <Text style={styles.headerTitle}>{title}</Text>
            { (hasEditActions) &&
                <View style={styles.editRow}>
                    {/* <Link href='/edit' asChild> */}
                        <Pressable onPress={() => alert('edit')} style={styles.headerButton}>
                            <FontAwesome5 name='pen' color={theme.colorWhite} size={theme.fontSize24} style={styles.icon} />
                        </Pressable>
                    {/* </Link> */}
                    {/* <Link href='/delete' asChild> */}
                        <Pressable onPress={() => alert('delete')} style={styles.headerButton}>
                            <FontAwesome5 name='trash' color={theme.colorWhite} size={theme.fontSize24} style={styles.icon} />
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
        backgroundColor: theme.colorDarkBlue,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerTitle: {
        flex: 1,
        color: theme.colorWhite,
        fontSize: theme.fontSize24,
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
        marginLeft: theme.space4,
        marginRight: theme.space4,
    },
    editRow : {
        flexDirection: 'row',
        marginRight: theme.space4,
    },
});
