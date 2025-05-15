import { Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { THEME } from '@/theme';


interface Props {
    icon: string;
    label: string;
    onPress: () => void;
}

export default function AssistChip({icon, label, onPress} : Props) {
    return (
        <Pressable
            onPress={onPress}
            style={styles.chip}
        >
            <FontAwesome5
                name={icon}
                color={THEME.COLOR_DARK_BLUE}
                size={14}
            />
            <Text style={styles.labelText}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    chip: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.COLOR_WHITE,
        height: 32,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 8,
        borderColor: THEME.COLOR_DARK_BLUE,
        borderRadius: 8,
        borderWidth: 1,
    },
    labelText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 14,
    },
})
