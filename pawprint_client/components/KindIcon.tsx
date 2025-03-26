import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { Kind } from '@/api_interfaces';
import { KIND_ICONS, KIND_COLORS } from '@/constants';


interface Props {
    kind: Kind;
    font_size: number,
    target_size: number,
    border: number,
}

export default function KindIcon(props:Props) {
    const icon_name = KIND_ICONS[props.kind.name]
    const color = KIND_COLORS[props.kind.category]

    return (
        <View style={styles(props.target_size, color, props.border).target}>
            <FontAwesome5
                name={icon_name}
                color={color}
                size={props.font_size}
            />
        </View>
    )
}

const styles = (target_size:number, color:string, border:number) => StyleSheet.create({
    target: {
        height: target_size,
        width: target_size,
        borderRadius: target_size / 2,
        borderWidth: border,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
