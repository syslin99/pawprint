import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { THEME } from '@/theme';
import { Vitals } from '@/api_interfaces';


interface Props {
    data: Vitals[];
    avg: number;
}

export default function VitalsChart({data, avg} : Props) {
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
