import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


interface Props {
    iconSet: string;
    iconName: keyof typeof FontAwesome5.glyphMap
    size: number;
    color: string;
    text: string;
    gap: number;
    style?: ViewStyle;
}


function Icon(props:Props) {
    switch (props.iconSet) {
        case 'FontAwesome5':
            return (
                <FontAwesome5
                    name={props.iconName}
                    color={props.color}
                    size={props.size}
                    style={{height: props.size, width: props.size, marginRight: props.gap }}
                />
        )
    }

}

export default function IconTextRow(props:Props) {
    const icon = Icon(props)

    return (
        <View style={[styles.row, props.style]}>
            {icon}
            <Text style={{ color: props.color, fontSize: props.size}}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
