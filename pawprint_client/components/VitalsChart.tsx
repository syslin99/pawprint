import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { THEME } from '@/theme';
import { Vitals } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import { calculateAverage, formatMeasurement, getChartProps } from '@/functions';


interface Props {
    pet_id: number;
    kind: 'Weight' | 'Temperature' | 'Heart Rate' | 'Respiratory Rate';
}

export default function VitalsChart({pet_id, kind} : Props) {
    const { state, dispatch } = useStoreContext();
    const data:Vitals[] = [...state.entrys.values()]
        .filter(entry => entry.pets[0].id === pet_id && entry.kind.name === kind)
        .map(({id, kind, recorded_on, measurement}) => ({id, kind, recorded_on, value: measurement ?? 0}));
    const avg = data.length > 0 ? formatMeasurement(kind, calculateAverage(data)) : '\u2014';
    const {min, step} = getChartProps(kind)
    const chartWidth = Dimensions.get('window').width - 120;

    return (
        <View style={styles.chart}>
            <Text style={styles.avgText}>average: {avg}</Text>
            <LineChart
                data={data}
                width={chartWidth}
                backgroundColor={THEME.COLOR_WHITE}
                color={THEME.COLOR_MEDIUM_BLUE}
                thickness={3}
                dataPointsColor={THEME.COLOR_MEDIUM_BLUE}
                hideDataPoints={data.length > 1}
                hideRules
                xAxisColor={THEME.COLOR_DARK_BLUE}
                yAxisColor={THEME.COLOR_DARK_BLUE}                yAxisTextStyle={styles.axisText}
                yAxisOffset={min}
                stepValue={step}
                formatYLabel={(value) => {
                    if (kind === 'Weight') {
                        return value
                    }
                    return parseFloat(value).toFixed(0)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chart: {
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
