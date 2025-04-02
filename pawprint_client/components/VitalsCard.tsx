import { View, Text, StyleSheet} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { THEME } from '@/theme';
import { Pet, Kind } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import { convertDateTime, formatMeasurement } from '@/functions';


interface Props {
    pet: Pet
}
interface Vitals {
    kind: Kind,
    recorded_on: string,
    measurement: number,
}

export default function VitalsCard({pet} : Props) {
    const { state, dispatch } = useStoreContext();
    const vitals:Vitals[] = [...state.entrys.values()]
        .filter(entry => entry.pets[0].id === pet.id && entry.measurement)
        .map(({kind, recorded_on, measurement}) => ({kind, recorded_on, measurement: measurement ?? 0}));

    // retrieve last readings
    var weight:Vitals|null = null;
    var temperature:Vitals|null = null;
    var heartRate:Vitals|null = null;
    var respiratoryRate:Vitals|null = null;
    vitals.forEach(vital => {
        if (!weight && vital.kind.name === 'Weight') {
            weight = vital
        } else if (!temperature && vital.kind.name === 'Temperature') {
            temperature = vital
        } else if (!heartRate && vital.kind.name === 'Heart Rate') {
            heartRate = vital
        } else if (!respiratoryRate && vital.kind.name === 'Respiratory Rate') {
            respiratoryRate = vital
        }
    });

    return (
        <View style={styles.vitalsCard}>
            <Text style={styles.nameText}>{pet.name}</Text>
            {/* Weight */}
            <View style={styles.splitRow}>
                <View style={styles.iconTextRow}>
                    <FontAwesome5
                        name='weight'
                        color={THEME.COLOR_DARK_BLUE}
                        size={20}
                        style={styles.vitalsIcon}
                    />
                    {weight ?
                        <Text style={styles.vitalsText}>
                            {formatMeasurement('Weight', (weight as Vitals).measurement)}
                        </Text> :
                        <Text style={styles.blankText}>{'\u2014'}</Text>
                    }
                </View>
                {weight && <Text style={styles.vitalsText}>{convertDateTime((weight as Vitals).recorded_on, 'fullNumbers').date}</Text>}
            </View>
            {/* Temperature */}
            <View style={styles.splitRow}>
                <View style={styles.iconTextRow}>
                    <FontAwesome5
                        name='thermometer-three-quarters'
                        color={THEME.COLOR_DARK_BLUE}
                        size={20}
                        style={styles.vitalsIcon}
                    />
                    {temperature ?
                        <Text style={styles.vitalsText}>
                            {formatMeasurement('Temperature', (temperature as Vitals).measurement)}
                        </Text> :
                        <Text style={styles.blankText}>{'\u2014'}</Text>
                    }
                </View>
                {temperature && <Text style={styles.vitalsText}>{convertDateTime((temperature as Vitals).recorded_on, 'fullNumbers').date}</Text>}
            </View>
            {/* Heart Rate */}
            <View style={styles.splitRow}>
                <View style={styles.iconTextRow}>
                    <FontAwesome5
                        name='heartbeat'
                        color={THEME.COLOR_DARK_BLUE}
                        size={20}
                        style={styles.vitalsIcon}
                    />
                    {heartRate ?
                        <Text style={styles.vitalsText}>
                            {formatMeasurement('Heart Rate', (heartRate as Vitals).measurement)}
                        </Text> :
                        <Text style={styles.blankText}>{'\u2014'}</Text>
                    }
                </View>
                {heartRate && <Text style={styles.vitalsText}>{convertDateTime((heartRate as Vitals).recorded_on, 'fullNumbers').date}</Text>}
            </View>
            {/* Respiratory Rate */}
            <View style={styles.splitRow}>
                <View style={styles.iconTextRow}>
                    <FontAwesome5
                        name='lungs'
                        color={THEME.COLOR_DARK_BLUE}
                        size={20}
                        style={styles.vitalsIcon}
                    />
                    {respiratoryRate ?
                        <Text style={styles.vitalsText}>
                            {formatMeasurement('Respiratory Rate', (respiratoryRate as Vitals).measurement)}
                        </Text> :
                        <Text style={styles.blankText}>{'\u2014'}</Text>
                    }
                </View>
                {respiratoryRate && <Text style={styles.vitalsText}>{convertDateTime((respiratoryRate as Vitals).recorded_on, 'fullNumbers').date}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    vitalsCard: {
        padding: 16,
        backgroundColor: THEME.COLOR_LIGHT_BLUE,
        borderRadius: 12,
        gap: 8,
    },
    nameText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 24,
        fontWeight: 'bold',
    },
    splitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
    },
    iconTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    vitalsIcon: {
        width: 28,
        textAlign: 'center',
    },
    vitalsText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 20,
    },
    blankText: {
        color: THEME.COLOR_MEDIUM_GREY,
        fontSize: 20,
    },
})
