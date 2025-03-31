import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { THEME } from '@/theme';
import { Entry } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import EventRow from '@/components/EventRow';


interface Props {
    version: 'upcoming' | 'completed';
}

export default function EventList({version} : Props) {
    const { state, dispatch } = useStoreContext();
    let events:Entry[];
    switch (version) {
        case 'upcoming':
            events = [...state.entrys.values()].filter(entry => entry.is_event && !entry.is_completed).reverse()
            break;
        case 'completed':
            events = [...state.entrys.values()].filter(entry => entry.is_event && entry.is_completed)
            break;
        default:
            events = []
            break;
    }

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
                    <EventRow event={item}/>
                </Pressable>
            </Link>
        )
    }

    return (
        <FlatList
            style={styles.container}
            data={events}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
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
    bottomSpacer: {
        height: 38,
    },
})
