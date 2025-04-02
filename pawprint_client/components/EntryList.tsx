import { SectionList, View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { THEME } from '@/theme';
import { Entry } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import { convertDateTime } from '@/functions';
import EntryRow from '@/components/EntryRow';


interface Section {
    date: string;
    data: Entry[];
}

export default function EntryList() {
    const { state, dispatch } = useStoreContext();
    const completed_entries = [...state.entrys.values()].filter(entry => entry.is_completed)

    // group entries by date
    var sections:Section[] = [];
    var curr_date:string|null = null;
    var curr_data:Entry[] = [];
    completed_entries.forEach(entry => {
        const {date, time} = convertDateTime(entry.recorded_on, 'fullText')
        // new date section
        if (!curr_date || curr_date !== date) {
            // add new section, if not initial runthrough
            if (curr_date) {
                const curr_section = {date: curr_date, data: curr_data}
                sections.push(curr_section)
            }
            // reset trackers
            curr_date = date
            curr_data = [entry]
        } else {
        // current date section
            curr_data.push(entry)
        }
    });

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
        <SectionList
            style={styles.container}
            sections={sections}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            renderSectionHeader={({section}) => {
                return (
                    <View>
                        <View style={styles.dateDivider}></View>
                        <Text style={styles.dateText}>{section.date}</Text>
                    </View>
                )
            }}
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
    dateDivider: {
        height: 1,
        backgroundColor: THEME.COLOR_DARK_BLUE,
        marginTop: 8,
        marginBottom: 8,
    },
    dateText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
    },
    topSpacer: {
        height: 12,
    },
    bottomSpacer: {
        height: 38,
    },
})