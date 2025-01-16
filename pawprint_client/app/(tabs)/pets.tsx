import { View, ScrollView, Text, FlatList, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';

import { Pet } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import MainHeader from '@/components/MainHeader';
import PetList from '@/components/PetList';


export default function Pets() {

    // test stored cache
    const { state, dispatch } = useStoreContext();
    console.log('pets', state.pets)
    console.log('contacts', state.contacts)

    const [petData, setPetData] = useState<Pet[]>([]);

    useEffect(() => {
        fetchPetData();
    }, [])

    const fetchPetData = async() => {
        try {
            const response = await fetch('http://192.168.86.81:8000/api/pets/');
            const data:Pet[] = await response.json()
            setPetData(data);
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <View style={styles.screen}>
            <MainHeader title='Pets' />
            <PetList petData={petData}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});