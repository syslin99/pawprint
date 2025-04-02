import { View, Text, Pressable, StyleSheet} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

import { THEME } from '@/theme';
import MainHeader from '@/components/MainHeader';
import EventList from '@/components/EventList';


export default function Events() {
    const [selectedSegment, setSelectedSegment] = useState<'upcoming'|'completed'>('upcoming');

    return (
        <GestureHandlerRootView style={styles.screen}>
            <MainHeader title='Events'/>
            <View style={styles.centerContent}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.segmentButton, styles.leftSegment, selectedSegment === 'upcoming' && styles.selected]}
                        onPress={() => setSelectedSegment('upcoming')}
                    >
                        <FontAwesome5
                            name={'check'}
                            color={THEME.COLOR_DARK_BLUE}
                            size={16}
                            style={selectedSegment !== 'upcoming' && styles.hidden}
                        />
                        <Text style={styles.buttonText}>Upcoming</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.segmentButton, styles.rightSegment, selectedSegment === 'completed' && styles.selected]}
                        onPress={() => setSelectedSegment('completed')}
                    >
                        <FontAwesome5
                            name={'check'}
                            color={THEME.COLOR_DARK_BLUE}
                            size={16}
                            style={selectedSegment !== 'completed' && styles.hidden}
                        />
                        <Text style={styles.buttonText}>Completed</Text>
                    </Pressable>
                </View>
            </View>
            <EventList version={selectedSegment}/>
        </GestureHandlerRootView>
    );
    }

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
    centerContent: {
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 16,
    },
    segmentButton: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: THEME.COLOR_WHITE,
        borderWidth: 1,
        borderColor: THEME.COLOR_DARK_BLUE,
    },
    leftSegment: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightSegment: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    selected: {
        backgroundColor: THEME.COLOR_LIGHT_BLUE,
    },
    hidden: {
        display: 'none',
    },
    buttonText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
    },
});