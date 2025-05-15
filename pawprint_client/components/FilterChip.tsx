import { Pressable, Text, Image, StyleSheet } from 'react-native';

import { THEME } from '@/theme';


interface Props {
    icon?: string;
    label: string;
    item: number;
    set: Set<number>;
    onToggle: (id: number) => void;
}

export default function FilterChip({icon, label, item, set, onToggle} : Props) {
    return (
        <Pressable
            onPress={() => onToggle(item)}
            style={[styles.chip, set.has(item) && styles.selected]}
        >
            {icon && <Image
                source={{uri: icon}}
                style={styles.icon}
            />}
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
    selected: {
        backgroundColor: THEME.COLOR_LIGHT_BLUE,
    },
    icon: {
        height: 24,
        width: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 14,
    },
})
