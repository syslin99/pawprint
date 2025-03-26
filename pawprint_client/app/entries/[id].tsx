import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';


export default function EntryDetail() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>ENTRY DETILS FOR ENTRY {id}</Text>
        </View>
    )
}
