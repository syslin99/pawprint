import { View, Text, Pressable } from 'react-native';

import { THEME } from '@/theme';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';


interface Props {
    kindId: number;
    onClose: () => void;
}

export default function AddEntryPage2({kindId, onClose} : Props) {
    const { state, dispatch } = useStoreContext();

    const submitForm = () => {
        let newEntryData = {
            title: 'TESTING POST REQUEST',
            kind: 15,
            measurement: 122,
            recorded_on: '2025-05-01T14:16:00-07:00',
            caretakers: [1],
            pets: [5],
            pictures: [],
            resourcetype: 'Vitals',
        }

        console.log('sending request...')
        console.log(JSON.stringify(newEntryData))
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
                console.log('Success:', data);
                // retrieve newly created entry
                fetch(`http://192.168.86.81:8000/api/entrys/${data.id}`)
                    .then(response => {
                        if (!response.ok) {
                            console.error(`HTTP error fetching entry data! status: ${response.status}`)
                        }
                        return response.json();
                    })
                    .then(newEntry => {
                        // FRONTEND TRANSFORMATIONS
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
        <View>
            <SecondaryHeader title='Add Entry' hasEditActions={false} onClose={onClose}/>
            <Text>SECOND PAGE - KIND: {kindId}</Text>
            <Pressable
                onPress={submitForm}
                style={{
                    backgroundColor: THEME.COLOR_LIGHT_BLUE,
                    borderWidth: 2,
                    borderColor: THEME.COLOR_DARK_BLUE,
                    padding: 8,
                    margin: 24,
                }}
            >
                <Text>Submit Test</Text>
            </Pressable>
        </View>
    )
}
