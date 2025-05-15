import { TextInput, StyleSheet } from 'react-native';

import { THEME } from '@/theme';


interface Props {
    placeholder: string;
    value: string;
    setValue: (text:string) => void;
    multiline?: boolean;
    numeric?: boolean;
}

export default function TextField({placeholder, value, setValue, multiline=false, numeric=false} : Props) {
    // single-line text input
    if (!multiline) {
        return (
            <TextInput
                style={[styles.input, styles.singleLine]}
                placeholder={placeholder}
                placeholderTextColor={THEME.COLOR_MEDIUM_GREY}
                value={value}
                onChangeText={setValue}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                keyboardType={numeric ? 'numeric' : 'default'}
            />
        )
    }
    // multi-line text input
    return (
        <TextInput
            style={[styles.input, styles.multiLine]}
            placeholder={placeholder}
            placeholderTextColor={THEME.COLOR_MEDIUM_GREY}
            value={value}
            onChangeText={setValue}
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            multiline={true}
        />
    )

}

const styles = StyleSheet.create({
    input: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
    },
    singleLine: {
        flexGrow: 1,
        backgroundColor: THEME.COLOR_LIGHT_GREY,
        paddingLeft: 16,
        paddingRight: 16,
        height: 56,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLOR_DARK_BLUE,
    },
    multiLine: {
        padding: 0,
    },
})
