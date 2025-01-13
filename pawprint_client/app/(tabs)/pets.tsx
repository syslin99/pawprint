import { View, ScrollView, Text, FlatList, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';

import { theme } from '@/theme';
import { Pet } from '@/api_interfaces';
import MainHeader from '@/components/MainHeader';
import PetList from '@/components/PetList';


export default function Pets() {
    const [petData, setPetData] = useState<Pet[]>([]);

    useEffect(() => {
        console.log('fetching...');
        fetchPetData();
    }, [])

    const fetchPetData = async() => {
        try {
            const response = await fetch('http://192.168.86.81:8000/api/pets/');
            const data:Pet[] = await response.json()
            console.log(data)
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