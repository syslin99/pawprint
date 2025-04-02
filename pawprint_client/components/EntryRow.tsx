import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { THEME } from '@/theme';
import { convertDateTime, formatMeasurement } from '@/functions';
import { Entry } from '@/api_interfaces';
import KindIcon from '@/components/KindIcon';
import { useStoreContext } from '@/components/StoreContext';
import PetIconRow from '@/components/PetIconRow';


export default function EntryRow({entry} : {entry:Entry}) {
    const { state, dispatch } = useStoreContext();

    const {date, time} = convertDateTime(entry.recorded_on, 'fullText')
    const measurement_string = formatMeasurement(entry.kind.name, entry.measurement)
    const caretaker_names = entry.caretakers.map(caretaker => caretaker.name).join(', ')
    const pets = entry.pets.map(pet => state.pets.get(pet.id)).filter(pet => pet !== undefined)

    const imageWidth = Dimensions.get('window').width / 3
    const imageHeight = imageWidth * 0.7
    const renderItem = ({item} : {item:string}) => (
        <Animated.Image
            source={{uri:item}}
            style={{height: imageHeight, width: imageWidth, borderRadius: 10, marginRight: 8}}
        />
    )

    return (
        <View style={styles.entryRow}>
            {/* General Information */}
            <View style={styles.generalInfo}>
                <View style={styles.kindIcon}>
                    <KindIcon
                        kind={entry.kind}
                        font_size={24}
                        target_size={45}
                        border={1}
                    />
                </View>
                <View style={styles.textInfo}>
                    {/* first row - header */}
                    <View style={styles.splitRow}>
                        <Text style={styles.titleText}>{entry.title}</Text>
                        <Text style={styles.secondaryText}>{time}</Text>
                    </View>
                    {/* second row (optional) - vitals measurement or notes */}
                    {entry.measurement !== undefined ? (
                        <Text style={styles.secondaryText}>{measurement_string}</Text>
                    ) : entry.notes && <Text style={styles.secondaryText} numberOfLines={1} ellipsizeMode='tail'>{entry.notes}</Text>}
                    {/* third row - caretakers and pets */}
                    <View style={styles.splitRow}>
                        <Text style={styles.primaryText}>with {caretaker_names}</Text>
                        <PetIconRow pets={pets}/>
                    </View>
                    {/* spacer, if no second row */}
                    {!entry.measurement && !entry.notes && <Text style={styles.secondaryText}></Text>}
                </View>
            </View>
            {/* Photo Carousel */}
            {entry.pictures.length > 0 &&
            <Carousel
                data={entry.pictures}
                height={imageHeight}
                width={imageWidth + 8}
                style={{width: '100%'}}
                loop={false}
                overscrollEnabled={false}
                pagingEnabled={true}
                snapEnabled={true}
                renderItem={renderItem}
            />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    entryRow: {
        gap: 8,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: THEME.COLOR_WHITE,
        borderBottomWidth: 1,
        borderColor: THEME.COLOR_LIGHT_BLUE,
    },
    generalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
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
    splitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
