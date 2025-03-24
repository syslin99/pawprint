import { FlatList, Pressable, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { THEME } from '@/theme';
import { FAKE_ID } from '@/constants';
import { Pet } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import PetIcon from '@/components/PetIcon';


export default function PetList() {
    const { state, dispatch } = useStoreContext();
    const addIcon = {id: FAKE_ID};

    const renderItem = ({item} : {item:Pet}) => {
        // add icon template
        if (item.id === Number.NEGATIVE_INFINITY) {
            return (
                <Pressable onPress={() => alert('add pet')} style={styles.addIcon}>
                    <Ionicons
                        name='add'
                        color={THEME.COLOR_DARK_BLUE}
                        size={THEME.FONT_SIZE_32}
                        style={styles.text}
                    />
                    <Text style={styles.text}>Add Pet</Text>
                </Pressable>
            )
        }
        // pet icon template
        return (
            <Link
                href={{
                    pathname: '/pets/[id]',
                    params: { id: item.id},
                }}
                asChild
            >
                <Pressable style={styles.petIcon}>
                    <PetIcon
                        pet={item}
                        target_size={150}
                        color={THEME.COLOR_DARK_BLUE}
                        border={1}
                    />
                </Pressable>
            </Link>
        )
    }

    return (
        <FlatList
            style={styles.container}
            data={[...state.pets.values(), addIcon]}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
        margin: 24,
    },
    addIcon: {
        backgroundColor: THEME.COLOR_WHITE,
        height: 150,
        width: 150,
        borderRadius: 150 / 2,
        borderWidth: 1,
        borderColor: THEME.COLOR_DARK_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
    },
    petIcon: {
        margin: 16,
    },
    text: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 24,
    },
})