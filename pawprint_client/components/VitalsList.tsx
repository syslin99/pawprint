import { FlatList, View, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import { Pet } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import VitalsCard from './VitalsCard';


export default function VitalsList() {
    const { state, dispatch } = useStoreContext();
    const pets:Pet[] = [...state.pets.values()].map(({id, name, image}) => ({id, name, image}));

    const renderItem = ({item} : {item:Pet}) => {
        return (
            <VitalsCard pet={item}/>
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
