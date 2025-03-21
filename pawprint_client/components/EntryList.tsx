import { FlatList, View, Text, StyleSheet } from 'react-native';

import { THEME } from '@/theme';
import { Entry } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import EntryRow from '@/components/EntryRow';


export default function EntryList() {
    const { state, dispatch } = useStoreContext();

    const renderItem = ({item} : {item:Entry}) => {
        return (
            <EntryRow entry={item}/>
        )
    }

    return (
        <FlatList
            style={styles.container}
            data={[...state.entrys.values()]}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            ListFooterComponent={() => <View style={styles.spacer}></View>}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
        marginTop: 12,
        marginLeft: 16,
        marginRight: 16,
    },
    spacer: {
        height: 38,
    },
})