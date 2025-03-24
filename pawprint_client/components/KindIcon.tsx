import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { THEME } from '@/theme';
import { Kind } from '@/api_interfaces';


const ICONS : {[key:string] : string}  = {
    'Meal': 'utensils',
    'Water': 'tint',
    'Treat': 'bone',
    'Groom': 'bath',
    'Brush Teeth': 'tooth',
    'Clip Nails': 'cut',
    'Walk': 'walking',
    'Train': 'dog',
    'Play': 'baseball-ball',
    'Pee': 'toilet',
    'Poop': 'poop',
    'Weight': 'weight',
    'Temperature': 'thermometer-three-quarters',
    'Heart Rate': 'heartbeat',
    'Respiratory Rate': 'lungs',
    'Medicine': 'pills',
    'Vet Appointment': 'stethoscope',
    'Other': 'paw',
};

const COLORS : {[key:string]: string} = {
    'Food and Water': THEME.COLOR_FOOD_WATER,
    'Care': THEME.COLOR_CARE,
    'Activity': THEME.COLOR_ACTIVITY,
    'Health': THEME.COLOR_HEALTH,
    'Other': THEME.COLOR_OTHER,
};

interface Props {
    kind: Kind;
    font_size: number,
    target_size: number,
    border: number,
}

export default function KindIcon(props:Props) {
    const icon_name = ICONS[props.kind.name]
    const color = COLORS[props.kind.category]

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
