import { View, Text, Pressable, StyleSheet } from 'react-native';

import { THEME } from '@/theme';


interface Props {
    option: string;
    value: string;
    setValue: (text:string) => void;
    label: string;
}

export default function RadioButton({option, value, setValue, label} : Props) {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.target}
                onPress={() => {setValue(option)}}
            >
                {/* outer circle */}
                <View style={[styles.button, value === option && styles.selected]}></View>
                {/* inner circle */}
                {value === option && <View style={styles.indicator}></View>}
            </Pressable>
            <Text style={styles.labelText}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    target: {
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: THEME.COLOR_DARK_BLUE,
    },
    selected: {
        borderColor: THEME.COLOR_LIGHT_BLUE,
    },
    indicator: {
        position: 'absolute',
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: THEME.COLOR_LIGHT_BLUE,
    },
    labelText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
    },
})
