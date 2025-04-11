import { View, Text, StyleSheet } from 'react-native';

import { THEME } from '@/theme';
import { Vitals } from '@/api_interfaces';
import { convertDateTime } from '@/functions';


interface Props {
    vitals: Vitals;
    index: number;
}

export default function VitalsReadingRow({vitals, index}: Props) {
    const {date, time} = convertDateTime(vitals.recorded_on, 'fullNumbers');
    const bgColor = index % 2 == 0 ? THEME.COLOR_LIGHT_GREY : THEME.COLOR_WHITE;

    return (
        <View style={[styles.vitalsReadingRow, styles.splitRow, {backgroundColor: bgColor}]}>
            <Text style={styles.rowText}>{vitals.value}</Text>
            <Text style={styles.rowText}>{date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    vitalsReadingRow: {
        flex: 1,
        padding: 8,
    },
    splitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
    },
})
