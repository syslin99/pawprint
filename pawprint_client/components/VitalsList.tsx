import { FlatList, Pressable, View, StyleSheet} from 'react-native';
import { Link } from 'expo-router';

import { THEME } from '@/theme';
import { Pet } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import VitalsCard from './VitalsCard';


export default function VitalsList() {
    const { state, dispatch } = useStoreContext();
    const pets:Pet[] = [...state.pets.values()].map(({id, name, image}) => ({id, name, image}));

    const renderItem = ({item} : {item:Pet}) => {
        return (
            <Link
                href={{
                    pathname: '/vitals/[pet_id]',
                    params: {pet_id:item.id},
                }}
                asChild
            >
                <Pressable>
                    <VitalsCard pet={item}/>
                </Pressable>
            </Link>
        )
    }

    return (
        <FlatList
            style={styles.container}
            data={pets}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
            ListHeaderComponent={() => <View style={styles.topSpacer}></View>}
            ListFooterComponent={() => <View style={styles.bottomSpacer}></View>}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
        marginLeft: 16,
        marginRight: 16,
    },
    separator: {
        height: 8,
    },
    topSpacer: {
        height: 16,
    },
    bottomSpacer: {
        height: 38,
    },
})
