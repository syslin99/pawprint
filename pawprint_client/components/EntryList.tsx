import { FlatList, View, Text, StyleSheet } from 'react-native';

import { THEME } from '@/theme';
import { Entry } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';

export default function EntryList() {
    const { state, dispatch } = useStoreContext();

    const renderItem = ({item} : {item:Entry}) => {
        return (
            <View style={styles.entryRow}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.subtitleText}>for pets {item.pets}</Text>
                <Text style={styles.subtitleText}>with caretakers {item.caretakers}</Text>
                <Text style={styles.subtitleText}>on {item.recorded_on}</Text>
            </View>
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
    entryRow: {
        margin: 12,
    },
    titleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 14,
    },
    subtitleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 12,
    },
})