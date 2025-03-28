import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useRef } from 'react';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

import { THEME } from '@/theme';
import { convertDateTime, formatMeasurement } from '@/functions';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';


export default function EntryDetail() {
    const { id } = useLocalSearchParams();
    const { state, dispatch } = useStoreContext();
    const entry = state.entrys.get(Number(id));
    if (!entry) {
        console.error('Entry does not exist in cache.')
        return;
    }

    const pet_names = entry.pets.map(pet => pet.name).join(', ')
    const caretaker_names = entry.caretakers.map(caretaker => caretaker.name).join(', ')
    const [date, time] = convertDateTime(entry.recorded_on)
    const measurement = formatMeasurement(entry.kind.name, entry.measurement)

    const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);
    const renderItem = ({item} : {item:string}) => (
        <Animated.Image
            source={{uri: item}}
            style={{height: 300, width: windowWidth, borderRadius: 20}}
        />
    )
    const onPressPagination = (index:number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: false,
        })
    }
    const windowWidth = Dimensions.get('window').width;

    return (
        <GestureHandlerRootView style={styles.screen}>
            <SecondaryHeader title='Entry Detail' hasEditActions={true} />
            <ScrollView
                contentContainerStyle={{ gap: 8 }}
                stickyHeaderIndices={[0]}
            >
                {/* Photo Carousel */}
                {entry.pictures.length > 0 &&
                <View style={styles.carouselContainer}>
                    <Carousel
                        data={entry.pictures}
                        height={300}
                        width={windowWidth}
                        style={{width: windowWidth}}
                        loop={false}
                        pagingEnabled={true}
                        snapEnabled={true}
                        mode='parallax'
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 50,
                        }}
                        onProgressChange={progress}
                        renderItem={renderItem}
                    />
                    <Pagination.Basic
                        progress={progress}
                        data={entry.pictures}
                        size={8}
                        dotStyle={styles.paginationDot}
                        activeDotStyle={styles.activePaginationDot}
                        containerStyle={styles.paginationRow}
                        onPress={onPressPagination}
                    />
                </View>
                }
                <View style={styles.textContainer}>
                    {/* General Information */}
                    <View style={styles.generalInfo}>
                        <Text style={styles.titleText}>{entry.title}</Text>
                        <Text style={styles.bodyText}>for {pet_names}</Text>
                        <Text style={styles.bodyText}>with {caretaker_names}</Text>
                        <Text style={styles.bodyText}>on {date} at {time}</Text>
                    </View>
                    {/* Measurement and Notes */}
                    {entry.measurement && <Text style={styles.headerText}>Measurement: {measurement}</Text>}
                    <View>
                        <Text style={styles.headerText}>Notes:</Text>
                        <Text style={styles.bodyText}>{entry.notes}</Text>
                    </View>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
    carouselContainer: {
        backgroundColor: THEME.COLOR_WHITE,
    },
    paginationRow: {
        gap: 4,
    },
    paginationDot: {
        borderRadius: 100,
        backgroundColor: THEME.COLOR_LIGHT_GREY,
    },
    activePaginationDot: {
        backgroundColor: THEME.COLOR_MEDIUM_GREY,
    },
    textContainer: {
        margin: 16,
        marginTop: 12,
    },
    generalInfo: {
        marginBottom: 16,
    },
    titleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    headerText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 20,
    },
    bodyText: {
        color: THEME.COLOR_MEDIUM_GREY,
        fontSize: 16,
        marginLeft: 16,
    },
})
