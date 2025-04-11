import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { THEME } from '@/theme';
import { Vitals } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import { calculateAverage } from '@/functions';


interface Props {
    pet_id: number;
}

export default function VitalsChart({pet_id} : Props) {
    const { state, dispatch } = useStoreContext();
    const data:Vitals[] = [...state.entrys.values()]
        .filter(entry => entry.pets[0].id === pet_id && entry.kind.name === 'Weight')
        .map(({id, kind, recorded_on, measurement}) => ({id, kind, recorded_on, value: measurement ?? 0}));
    const avg = calculateAverage(data)

    const chartWidth = Dimensions.get('window').width - 120;

    return (
        <View style={styles.chart}>
            <Text style={styles.avgText}>average: {avg.toFixed(1)}</Text>
            <LineChart
                data={data}
                width={chartWidth}
                backgroundColor={THEME.COLOR_WHITE}
                color={THEME.COLOR_MEDIUM_BLUE}
                thickness={3}
                dataPointsColor={THEME.COLOR_MEDIUM_BLUE}
                hideDataPoints={data.length > 1}
                hideRules
                yAxisColor={THEME.COLOR_DARK_BLUE}
                xAxisColor={THEME.COLOR_DARK_BLUE}
                yAxisTextStyle={styles.axisText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chart: {
        flex: 1,
        marginLeft: 32,
        marginRight: 32,
    },
    avgText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 14,
        marginBottom: 8,
    },
    axisText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 12,
    }
})
