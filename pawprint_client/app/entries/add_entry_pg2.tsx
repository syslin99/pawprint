import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

import { THEME } from '@/theme';
import { KINDS } from '@/constants';
import { formatMeasurement } from '@/functions';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';
import TextField from '@/components/TextField';
import RadioButton from '@/components/RadioButton';
import FilterChip from '@/components/FilterChip';
import AssistChip from '@/components/AssistChip';
import Button from '@/components/Button';


interface Props {
    kindId: number;
    onClose: () => void;
}

export default function AddEntryPage2({kindId, onClose} : Props) {
    const router = useRouter();
    const { state, dispatch } = useStoreContext();
    const isVitals = [13, 14, 15, 16].includes(kindId) ? true : false

    // form values
    const [title, setTitle] = useState(KINDS[kindId].name);
    const [recordedOn, setRecordedOn] = useState(new Date());
    const [mode, setMode] = useState<'date'|'time'>('date');
    const [show, setShow] = useState(false);
    const [entry, setEntry] = useState('log');
    const [caretakers, setCaretakers] = useState(new Set<number>([state.caretakerId]));
    const [pets, setPets] = state.pets.size === 1 ? useState(new Set<number>(state.pets.keys())) : useState(new Set<number>());
    const [measurement, setMeasurement] = useState('');
    const [pictures, setPictures] = useState([]);
    const [notes, setNotes] = useState('');

    // supplementary state variables and functions
    const showMode = (mode:'date'|'time') => {
        setMode(mode);
        setShow(true);
    }
    const showDatePicker = () => {
        showMode('date');
    }
    const showTimePicker = () => {
        showMode('time')
    }
    const onChange = (event:DateTimePickerEvent, selectedDate?:Date) => {
        if (selectedDate) {
            setRecordedOn(selectedDate);
        }
        setShow(false);
    }

    const handleToggleCaretaker = (id: number) => {
        setCaretakers(caretakers => {
            const newCaretakers = new Set(caretakers);
            // remove caretaker, if exists
            if (newCaretakers.has(id)) {
                newCaretakers.delete(id);
            }
            // add caretaker if doesn't exist
            else {
                newCaretakers.add(id);
            }
            return newCaretakers
        })
    }

    const handleTogglePet = (id: number) => {
        setPets(pets => {
            const newPets = new Set(pets);
            // remove pet, if exists
            if (newPets.has(id)) {
                newPets.delete(id);
            }
            // add pet if doesn't exist
            else {
                newPets.add(id);
            }
            return newPets
        })
    }

    // form submission
    const submitForm = () => {
        const newEntryData = isVitals ? {
            title: title,
            kind: kindId,
            measurement: parseFloat(measurement),
            recorded_on: recordedOn,
            caretakers: [...caretakers],
            pets: [...pets],
            pictures: pictures,
            notes: notes,
            is_event: entry === 'event' ? true : false,
            is_completed: entry === 'log' ? true : false,
            resourcetype: 'Vitals',
        } : {
            title: title,
            kind: kindId,
            recorded_on: recordedOn,
            caretakers: [...caretakers],
            pets: [...pets],
            pictures: pictures,
            notes: notes,
            is_event: entry === 'event' ? true : false,
            is_completed: entry === 'log' ? true : false,
            resourcetype: 'Entry',
        }

        // ----- Backend Transformations -----
        fetch('http://192.168.86.81:8000/api/entrys/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntryData),
        })
            // server side response
            .then(response => {
                if (!response.ok) {
                    console.error(`HTTP error saving entry data! status: ${response.status}`)
                }
                return response.json();
            })
            // client side success
            .then(data => {
                // retrieve newly created entry
                fetch(`http://192.168.86.81:8000/api/entrys/${data.id}`)
                    .then(response => {
                        if (!response.ok) {
                            console.error(`HTTP error fetching entry data! status: ${response.status}`)
                        }
                        return response.json();
                    })
                    .then(newEntry => {
                        // ----- Frontend Transformations -----
                        dispatch({ type: 'ADD_ENTRY', payload: newEntry});
                    })
                    .catch(error => {
                        console.error('Error fetching entry data:', error);
                    })
            })
            // client side error
            .catch(error => {
                console.error('Error saving entry data:', error);
            })
    }

    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Add Entry' hasEditActions={false} onClose={onClose}/>
            <ScrollView>
                {/* Title */}
                <View style={styles.fieldset}>
                    <Text style={styles.headerText}>Title</Text>
                    <View style={styles.fields}>
                        <TextField
                            placeholder='Title'
                            value={title}
                            setValue={setTitle}
                        />
                    </View>
                </View>
                {/* Date and Time */}
                <View style={styles.fieldset}>
                    <Text style={styles.headerText}>Date and Time</Text>
                    <View style={styles.fields}>
                        <View style={styles.dateTimeGroup}>
                            <Pressable
                                onPress={showDatePicker}
                                style={styles.iconTextRow}
                            >
                                <FontAwesome5
                                    name='calendar-alt'
                                    color={THEME.COLOR_DARK_BLUE}
                                    size={20}
                                    style={{width: 24}}
                                />
                                <Text style={styles.datetimeText}>{recordedOn.toLocaleDateString([], {year:'numeric', month: '2-digit', day: '2-digit'})}</Text>
                            </Pressable>
                            <Pressable
                                onPress={showTimePicker}
                                style={styles.iconTextRow}
                            >
                                <FontAwesome5
                                    name='clock'
                                    color={THEME.COLOR_DARK_BLUE}
                                    size={20}
                                    style={{width: 24}}
                                />
                                <Text style={styles.datetimeText}>{recordedOn.toLocaleTimeString([], {hour:'numeric', minute: 'numeric'})}</Text>
                            </Pressable>
                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={recordedOn}
                                mode={mode}
                                onChange={onChange}
                                />
                            )}
                        </View>
                        <View style={styles.eventLogGroup}>
                            <RadioButton
                                option='log'
                                value={entry}
                                setValue={setEntry}
                                label={'save to Log'}
                            />
                            <RadioButton
                                option='event'
                                value={entry}
                                setValue={setEntry}
                                label={'save to Events'}
                            />
                        </View>
                    </View>
                </View>
                {/* Caretakers */}
                <View style={styles.fieldset}>
                    <Text style={styles.headerText}>Caretakers</Text>
                    <View style={[styles.fields, styles.chipGrid]}>
                        {Array.from(state.caretakers.entries()).map(([id, caretaker]) =>
                            <FilterChip
                                key={id}
                                label={caretaker.name}
                                item={id}
                                set={caretakers}
                                onToggle={handleToggleCaretaker}
                            />
                        )}
                    </View>
                </View>
                {/* Pets */}
                <View style={styles.fieldset}>
                    <Text style={styles.headerText}>Pets</Text>
                    <View style={[styles.fields, styles.chipGrid]}>
                        {Array.from(state.pets.entries()).map(([id, pet]) =>
                            <FilterChip
                                key={id}
                                icon={pet.image}
                                label={pet.name}
                                item={id}
                                set={pets}
                                onToggle={handleTogglePet}
                            />
                        )}
                    </View>
                </View>
                {/* Measurement */}
                {isVitals && <View style={styles.fieldset}>
                    <Text style={styles.headerText}>Measurement</Text>
                    <View style={styles.fields}>
                        <View style={styles.row}>
                            <TextField
                                placeholder='value'
                                value={measurement}
                                setValue={setMeasurement}
                                numeric={true}
                            />
                            <Text style={styles.unitsText}>{formatMeasurement(KINDS[kindId].name)}</Text>
                        </View>
                    </View>
                </View>}
                {/* Pictures */}
                <View style={styles.fieldset}>
                    <Text style={styles.headerText}>Pictures</Text>
                    <View style={styles.fields}>
                        <AssistChip
                            icon='plus'
                            label='image'
                            onPress={() => alert('Select image')}
                        />
                    </View>
                </View>
                {/* Notes */}
                <View style={styles.fieldset}>
                    <Text style={styles.headerText}>Notes</Text>
                    <View style={styles.fields}>
                        <TextField
                            placeholder='Add notes...'
                            value={notes}
                            setValue={setNotes}
                            multiline={true}
                        />
                    </View>
                </View>

                <Button
                    textColor={THEME.COLOR_WHITE}
                    bgColor={THEME.COLOR_MEDIUM_BLUE}
                    label='Save'
                    onPress={() => {
                        submitForm()
                        onClose()
                        router.push('/')
                    }}
                    style={styles.submitButton}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
    fieldset: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLOR_DARK_BLUE,
    },
    fields: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    dateTimeGroup: {
        gap: 4,
    },
    eventLogGroup: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
    },
    chipGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        rowGap: 8,
    },
    row: {
        flexDirection: 'row',
    },
    iconTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 16,
    },
    datetimeText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
    },
    unitsText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
        textAlignVertical: 'center',
        marginLeft: 16,
        marginRight: 16,
    },
    submitButton: {
        alignSelf: 'flex-end',
        marginTop: 16,
        marginBottom: 16,
        marginRight: 24,
    },
})
