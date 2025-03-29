import { View, Text, StyleSheet } from 'react-native';

import { THEME } from '@/theme';
import { useStoreContext } from '@/components/StoreContext';
import { Entry } from '@/api_interfaces';
import { convertDateTime, formatMeasurement, isOverdue } from '@/functions';
import KindIcon from '@/components/KindIcon';
import PetIconRow from '@/components/PetIconRow';


export default function EventRow({event} : {event:Entry}) {
    const { state, dispatch } = useStoreContext();

    const [date, time] = convertDateTime(event.recorded_on, 'abbreviated')
    const overdue = !event.is_completed && isOverdue(event.recorded_on)
    const measurement_string = formatMeasurement(event.kind.name, event.measurement)
    const caretaker_names = event.caretakers.map(caretaker => caretaker.name).join(', ')
    const pets = event.pets.map(pet => state.pets.get(pet.id)).filter(pet => pet !== undefined)

    return (
        <View style={styles.eventRow}>
            {/* Due Date */}
            <View style={[styles.dueDate, overdue && styles.overdue]}>
                <Text style={[styles.dateText, overdue && styles.overdue]}>{date}</Text>
                <Text style={[styles.timeText, overdue && styles.overdue]}>{time}</Text>
            </View>
            {/* General Information */}
            <View style={styles.kindIcon}>
                <KindIcon
                    kind={event.kind}
                    font_size={24}
                    target_size={45}
                    border={1}
                />
            </View>
            <View style={styles.textInfo}>
                {/* first row - header */}
                <Text style={styles.titleText}>{event.title}</Text>
                {/* second row (optional) - vitals measurement or notes */}
                {event.measurement !== undefined ? (
                    <Text style={styles.secondaryText}>{measurement_string}</Text>
                ) : event.notes && <Text style={styles.secondaryText} numberOfLines={1} ellipsizeMode='tail'>{event.notes}</Text>}
                {/* third row - caretakers and pets */}
                <View style={styles.splitRow}>
                    <Text style={styles.primaryText}>with {caretaker_names}</Text>
                    <PetIconRow pets={pets}/>
                </View>
                {/* spacer, if no second row */}
                {!event.measurement && !event.notes && <Text style={styles.secondaryText}></Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    eventRow: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: THEME.COLOR_WHITE,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dueDate: {
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 8,
        borderRightWidth: 1,
        borderColor: THEME.COLOR_MEDIUM_GREY,
        width: 8 * 14 * 0.62,    // max_characters * font_size * multiplier
    },
    overdue: {
        borderColor: THEME.COLOR_ERROR,
        color: THEME.COLOR_ERROR,
    },
    dateText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeText: {
        color: THEME.COLOR_MEDIUM_GREY,
        fontSize: 14,
    },
    kindIcon: {
        marginLeft: 8,
        marginRight: 8,
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
    splitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
