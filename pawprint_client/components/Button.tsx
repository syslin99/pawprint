import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';


interface Props {
    textColor: string;
    bgColor: string;
    label: string;
    onPress: () => void;
    style?: ViewStyle;
}

export default function Button({textColor, bgColor, label, onPress, style} : Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.target, {backgroundColor: bgColor}, style]}
        >
            <Text style={[styles.labelText, {color: textColor}]}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    target: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        height: 40,
        paddingLeft: 24,
        paddingRight: 24,
        borderRadius: 20,
    },
    labelText: {
        fontSize: 20,
    },
})
