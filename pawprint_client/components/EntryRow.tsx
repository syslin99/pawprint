import { View, Text, Pressable, StyleSheet } from 'react-native';

import { THEME } from '@/theme';
import { Entry } from '@/api_interfaces';
import KindIcon from '@/components/KindIcon';


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function convertDateTime(recorded_on:string) {
    const datetime = new Date(recorded_on)
    const month = MONTHS[datetime.getMonth()]
    const day = datetime.getDate().toString().padStart(2, '0')
    const year = datetime.getFullYear()
    const date = `${month} ${day}, ${year}`
    const hours = datetime.getHours() % 12 == 0 ? 12 : datetime.getHours() % 12
    const minutes = datetime.getMinutes().toString().padStart(2, '0')
    const am_pm = datetime.getHours() < 12 ? 'am' : 'pm'
    const time = `${hours}:${minutes} ${am_pm}`
    return [date, time]
}

export default function EntryRow({entry} : {entry:Entry}) {
    const [date, time] = convertDateTime(entry.recorded_on)

    return (
        <Pressable
            onPress={() => alert(`entry - ${entry.title}`)}
            style={styles.entryRow}>

            <View style={styles.kindIcon}>
                <KindIcon
                    kind={entry.kind}
                    font_size={24}
                    target_size={45}
                    border={1}
                />
            </View>
            <View style={styles.textInfo}>
                <View style={styles.headerRow}>
                    <Text style={[styles.titleText, styles.leftText]}>{entry.title}</Text>
                    <Text style={styles.secondaryText}>{time}</Text>
                </View>
                <Text style={styles.secondaryText}>placeholder notes / measurement text</Text>
                <Text style={styles.primaryText}>with caretakers{entry.caretakers}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    entryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: THEME.COLOR_WHITE,
        borderBottomWidth: 1,
        borderColor: THEME.COLOR_LIGHT_BLUE,
    },
    kindIcon: {
        marginRight: 16,
    },
    textInfo: {
        flex: 1,
        gap: 2,
    },
    titleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 14,
        fontWeight: 'bold',
    },
    primaryText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 12,
    },
    secondaryText: {
        color: THEME.COLOR_MEDIUM_GREY,
        fontSize: 12,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftText: {
        textAlign: 'left',
    },
    rightText: {
        textAlign: 'right',
    }
})
