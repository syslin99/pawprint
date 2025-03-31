import { SectionList, View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { THEME } from '@/theme';
import { Entry } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import { isOverdue } from '@/functions';
import EventRow from '@/components/EventRow';


interface Props {
    version: 'upcoming' | 'completed';
}
interface Section {
    title: string,
    data: Entry[]
}

export default function EventList({version} : Props) {
    const { state, dispatch } = useStoreContext();
    let sections:Section[];
    switch (version) {
        case 'upcoming':
            const overdue_events = [...state.entrys.values()].filter(entry => entry.is_event && !entry.is_completed && isOverdue(entry.recorded_on)).reverse()
            const upcoming_events = [...state.entrys.values()].filter(entry => entry.is_event && !entry.is_completed && !isOverdue(entry.recorded_on)).reverse()
            sections = [
                {title: 'Overdue', data: overdue_events,},
                {title: 'Upcoming', data: upcoming_events,},
            ]
            break;
        case 'completed':
            const completed_events = [...state.entrys.values()].filter(entry => entry.is_event && entry.is_completed)
            sections = [
                {title: 'Completed', data: completed_events,},
            ]
            break;
        default:
            sections = []
            break;
    }

    const renderItem = ({item, section} : {item:Entry, section:Section}) => {
        return (
            <Link
                href={{
                    pathname: '/entries/[id]',
                    params: {id:item.id},
                }}
                asChild
            >
                <Pressable>
                    <EventRow event={item} overdue={section.title === 'Overdue'}/>
                </Pressable>
            </Link>
        )
    }

    return (
        <SectionList
            style={styles.container}
            sections={sections}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            renderSectionHeader={({section}) => {
                if (section.title === 'Overdue') {
                    return <Text style={styles.overdueText}>{section.title}</Text>
                } else if (section.title === 'Upcoming') {
                    return <View style={styles.overdueDivider}></View>
                }
                return null;
            }}
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
    overdueText: {
        color: THEME.COLOR_ERROR,
        fontSize: 16,
        marginLeft: 16,
    },
    overdueDivider: {
        height: 1,
        backgroundColor: THEME.COLOR_ERROR,
    },
    bottomSpacer: {
        height: 38,
    },
})
