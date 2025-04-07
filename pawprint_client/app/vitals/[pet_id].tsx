import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { THEME } from '@/theme';
import { Vitals } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';
import VitalsChart from '@/components/VitalsChart';


export default function VitalsHistory() {
    const { pet_id } = useLocalSearchParams();
    const { state, dispatch } = useStoreContext();
    const pet = state.pets.get(Number(pet_id));
    if (!pet) {
        console.error('Pet does not exist in cache.')
        return
    }
    const vitals:Vitals[] = [...state.entrys.values()]
        .filter(entry => entry.pets[0].id === pet.id && entry.measurement)
        .map(({kind, recorded_on, measurement}) => ({kind, recorded_on, value: measurement ?? 0}));

    // retrieve readings data
    var weightData: Vitals[] = [];
    var weightSum = 0;
    vitals.forEach(vital => {
        if (vital.kind.name === 'Weight') {
            weightData.push(vital)
            weightSum += vital.value
        }
    });
    weightData.reverse()
    const weightAvg = weightSum / weightData.length

    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Vitals History' hasEditActions={false} />
            <Text style={styles.titleText}>{pet.name}'s Weight</Text>
            <VitalsChart data={weightData} avg={weightAvg}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
    titleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
})
