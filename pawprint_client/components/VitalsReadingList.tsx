import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { THEME } from '@/theme';
import { Vitals } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import VitalsReadingRow from '@/components/VitalsReadingRow';
import { formatMeasurement } from '@/functions';


interface Props {
    pet_id: number;
    kind: 'Weight' | 'Temperature' | 'Heart Rate' | 'Respiratory Rate';
}

export default function VitalsReadingList({pet_id, kind} : Props) {
    const { state, dispatch } = useStoreContext();
    const data:Vitals[] = [...state.entrys.values()]
        .filter(entry => entry.pets[0].id === pet_id && entry.kind.name === kind)
        .map(({id, kind, recorded_on, measurement}) => ({id, kind, recorded_on, value: measurement ?? 0}));
    const units = formatMeasurement(kind)

    const renderItem = ({item, index} : {item:Vitals, index: number}) => {
        return (
            <Link
                href={{
                    pathname: '/entries/[id]',
                    params: {id:item.id},
                }}
                asChild
            >
                <Pressable>
                    <VitalsReadingRow vitals={item} index={index}/>
                </Pressable>
            </Link>
        )
    }

    return (
        <FlatList
            style={styles.container}
            data={data}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            ListHeaderComponent={() =>
                <View style={[styles.headerRow, styles.splitRow]}>
                    <Text style={styles.headerText}>{kind} ({units})</Text>
                    <Text style={styles.headerText}>Date</Text>
                </View>
            }
            ListFooterComponent={() => <View style={styles.bottomSpacer}></View>}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 32,
        marginRight: 32,
    },
    headerRow: {
        marginTop: 16,
        borderBottomWidth: 2,
        borderBottomColor: THEME.COLOR_DARK_BLUE,
    },
    splitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
    },
    bottomSpacer: {
        height: 12,
    }
})
