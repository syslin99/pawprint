import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { THEME } from '@/theme';
import { Entry } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import EntryRow from '@/components/EntryRow';


export default function EntryList() {
    const { state, dispatch } = useStoreContext();

    const renderItem = ({item} : {item:Entry}) => {
        return (
            <Link
                href={{
                    pathname: '/entries/[id]',
                    params: {id:item.id},
                }}
                asChild
            >
                <Pressable>
                    <EntryRow entry={item}/>
                </Pressable>
            </Link>
        )
    }

    return (
        <FlatList
            style={styles.container}
            data={[...state.entrys.values()]}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
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
    topSpacer: {
        height: 12,
    },
    bottomSpacer: {
        height: 38,
    },
})