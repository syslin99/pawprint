import { View, ScrollView, Text, FlatList, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';

import { theme } from '@/theme';
import MainHeader from '@/components/MainHeader';


export default function Pets() {
    const [petData, setPetData] = useState();

    useEffect(() => {
        console.log('fetching...');
        fetchPetData();
    }, [])

    const fetchPetData = async() => {
        try {
            // CHANGE BACK TO PETS
            const response = await fetch('http://192.168.86.81:8000/api/pets/');
            const data = await response.json()
            console.log(data)
            setPetData(data);
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <View style={styles.screen}>
            <MainHeader title='Pets' />
            <FlatList
                style={styles.container}
                data={petData}
                renderItem={({item}) => (
                    <Text style={styles.text}>{item.name}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colorMediumBlue,
    },
    text: {
        color: theme.colorDarkBlue,
        fontSize: 46,
    },
});