import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { THEME } from '@/theme';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';


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
            <Text>Vitals History for {pet.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
})
