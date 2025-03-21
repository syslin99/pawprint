import { View, StyleSheet} from 'react-native';
import { useEffect } from 'react';

import { THEME } from '@/theme';
import { Pet, Contact, Entry } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import MainHeader from '@/components/MainHeader';
import EntryList from '@/components/EntryList';


export default function Log() {

    /* ----- cache information -----*/
    const { state, dispatch } = useStoreContext();

    const HOST = 'http://192.168.86.81:8000';

    useEffect(() => {
        initializeAppData();
    }, [])

    const initializeAppData = async() => {
        const petData:Pet[] = await fetchPetData() ?? [];
        const entrysData:Entry[] = await fetchEntrysData(petData) ?? [];
        await fetchContactData();
    }

    const fetchPetData = async() => {
        try {
            const response = await fetch(`${HOST}/api/caretakers/${state.caretakerId}/pets`);
            const data:Pet[] = await response.json()
            data.forEach(pet => {
                dispatch({ type: 'ADD_PET', payload: pet});
            })
            return data;
        } catch (error) {
            console.error('Error fetching pet data:', error)
        }
    }

    const fetchContactData = async() => {
        try {
            const response = await fetch(`${HOST}/api/caretakers/${state.caretakerId}/contacts`);
            const data:Contact[] = await response.json()
            data.forEach(contact => {
                dispatch({ type: 'ADD_CONTACT', payload: contact});
            })
        } catch (error) {
            console.error('Error fetching contact data:', error)
        }
    }

    const fetchEntrysData = async(pets: Pet[]) => {
        const pet_ids = pets.map(pet => pet.id)
        const pet_id_query = pet_ids.join('&pets=');
        try {
            const response = await fetch(`${HOST}/api/entrys/?pets=${pet_id_query}`);
            const data:Entry[] = await response.json()
            data.forEach(entry => {
                dispatch({ type: 'ADD_ENTRY', payload: entry});
            })
            return data;
        } catch (error) {
            console.error('Error fetching entry data:', error)
        }
    }

    return (
        <View style={styles.screen}>
            <MainHeader title='Log' />
            <EntryList />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
});
