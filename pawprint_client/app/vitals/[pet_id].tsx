import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { THEME } from '@/theme';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';
import VitalsChart from '@/components/VitalsChart';
import VitalsReadingList from '@/components/VitalsReadingList';


export default function VitalsHistory() {
    const { pet_id } = useLocalSearchParams();
    const { state, dispatch } = useStoreContext();
    const pet = state.pets.get(Number(pet_id));
    if (!pet) {
        console.error('Pet does not exist in cache.')
        return
    }

    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Vitals History' hasEditActions={false} />
            <Text style={styles.titleText}>{pet.name}'s Weight</Text>
            <VitalsChart pet_id={Number(pet_id)}/>
            <VitalsReadingList pet_id={Number(pet_id)}/>
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
