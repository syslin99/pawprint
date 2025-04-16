import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

import { THEME } from '@/theme';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';
import VitalsChart from '@/components/VitalsChart';
import VitalsReadingList from '@/components/VitalsReadingList';


export default function VitalsHistory() {
    const { pet_id } = useLocalSearchParams();
    const { state, dispatch } = useStoreContext();
    const [selectedSegment, setSelectedSegment] = useState<'Weight'|'Temperature'|'Heart Rate'|'Respiratory Rate'>('Weight');

    const pet = state.pets.get(Number(pet_id));
    if (!pet) {
        console.error('Pet does not exist in cache.')
        return
    }

    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Vitals History' hasEditActions={false} />
            <View style={styles.centerContent}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.segmentButton, styles.leftSegment, selectedSegment === 'Weight' && styles.selected]}
                        onPress={() => setSelectedSegment('Weight')}
                    >
                        <FontAwesome5
                            name={'check'}
                            color={THEME.COLOR_DARK_BLUE}
                            size={14}
                            style={selectedSegment !== 'Weight' && styles.hidden}
                        />
                        <Text style={styles.buttonText}>Weight</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.segmentButton, selectedSegment === 'Temperature' && styles.selected]}
                        onPress={() => setSelectedSegment('Temperature')}
                    >
                        <FontAwesome5
                            name={'check'}
                            color={THEME.COLOR_DARK_BLUE}
                            size={14}
                            style={selectedSegment !== 'Temperature' && styles.hidden}
                        />
                        <Text style={styles.buttonText}>Temp.</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.segmentButton, selectedSegment === 'Heart Rate' && styles.selected]}
                        onPress={() => setSelectedSegment('Heart Rate')}
                    >
                        <FontAwesome5
                            name={'check'}
                            color={THEME.COLOR_DARK_BLUE}
                            size={14}
                            style={selectedSegment !== 'Heart Rate' && styles.hidden}
                        />
                        <Text style={styles.buttonText}>Heart Rate</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.segmentButton, styles.rightSegment, selectedSegment === 'Respiratory Rate' && styles.selected]}
                        onPress={() => setSelectedSegment('Respiratory Rate')}
                    >
                        <FontAwesome5
                            name={'check'}
                            color={THEME.COLOR_DARK_BLUE}
                            size={14}
                            style={selectedSegment !== 'Respiratory Rate' && styles.hidden}
                        />
                        <Text style={styles.buttonText}>Resp. Rate</Text>
                    </Pressable>
                </View>
            </View>
            <Text style={styles.titleText}>{pet.name}'s {selectedSegment}</Text>
            <VitalsChart pet_id={Number(pet_id)} kind={selectedSegment}/>
            <VitalsReadingList pet_id={Number(pet_id)} kind={selectedSegment}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
    centerContent: {
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 16,
    },
    segmentButton: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: THEME.COLOR_WHITE,
        borderWidth: 1,
        borderColor: THEME.COLOR_DARK_BLUE,
    },
    leftSegment: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightSegment: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    selected: {
        backgroundColor: THEME.COLOR_LIGHT_BLUE,
    },
    hidden: {
        display: 'none',
    },
    titleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 14,
    },
})
