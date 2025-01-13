import { FlatList, Pressable, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { theme } from '@/theme';
import { FAKE_ID } from '@/constants';
import { Pet } from '@/api_interfaces';

export default function PetList({petData} : {petData:Pet[]}) {
    const addIcon = {id: FAKE_ID};

    const renderItem = ({item} : {item:Pet}) => {
        // add icon template
        if (item.id === Number.NEGATIVE_INFINITY) {
            return (
                <Pressable onPress={() => alert('add pet')} style={styles.petIcon}>
                    <Ionicons name='add' color={theme.colorDarkBlue} size={theme.fontSize32} style={styles.text} />
                    <Text style={styles.text}>Add Pet</Text>
                </Pressable>
            )
        }
        // pet icon template
        return (
            <Pressable onPress={() => alert('go to profile')} style={styles.petIcon}>
                <Text style={styles.text}>{item.name}</Text>
            </Pressable>
        )
    }

    return (
        <FlatList
            style={styles.container}
            data={[...petData, addIcon]}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorWhite,
        margin: 24,
    },
    petIcon: {
        backgroundColor: theme.colorWhite,
        height: 150,
        width: 150,
        borderRadius: '50%',
        borderWidth: 1,
        borderColor: theme.colorDarkBlue,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
    },
    text: {
        color: theme.colorDarkBlue,
        fontSize: 24,
    },
})