import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { THEME } from '@/theme';
import { convertDateTime, formatMeasurement } from '@/functions';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';


export default function EntryDetail() {
    const { id } = useLocalSearchParams();
    const { state, dispatch } = useStoreContext();
    const entry = state.entrys.get(Number(id));
    if (!entry) {
        console.error('Entry does not exist in cache.')
        return;
    }

    const pet_names = entry.pets.map(pet => pet.name).join(', ')
    const caretaker_names = entry.caretakers.map(caretaker => caretaker.name).join(', ')
    const [date, time] = convertDateTime(entry.recorded_on)
    const measurement = formatMeasurement(entry.kind.name, entry.measurement)

    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Entry Detail' hasEditActions={true} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ gap: 8 }}
            >
                {/* General Information */}
                <View style={styles.generalInfo}>
                    <Text style={styles.titleText}>{entry.title}</Text>
                    <Text style={styles.bodyText}>for {pet_names}</Text>
                    <Text style={styles.bodyText}>with {caretaker_names}</Text>
                    <Text style={styles.bodyText}>on {date} at {time}</Text>
                </View>
                {/* Measurement and Notes */}
                {entry.measurement && <Text style={styles.headerText}>Measurement: {measurement}</Text>}
                <View>
                    <Text style={styles.headerText}>Notes:</Text>
                    <Text style={styles.bodyText}>{entry.notes}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
        margin: 16,
    },
    generalInfo: {
        marginBottom: 16,
    },
    titleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    headerText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 20,
    },
    bodyText: {
        color: THEME.COLOR_MEDIUM_GREY,
        fontSize: 16,
        marginLeft: 16,
    },
})
