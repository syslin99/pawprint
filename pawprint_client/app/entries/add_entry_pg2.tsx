import { View, Text, Pressable } from 'react-native';

import { THEME } from '@/theme';
import SecondaryHeader from '@/components/SecondaryHeader';


interface Props {
    kindId: number;
    onClose: () => void;
}

export default function AddEntryPage2({kindId, onClose} : Props) {

    const submitForm = () => {
        const newEntryData = {
            title: 'TESTING POST REQUEST',
            kind: 15,
            measurement: 122,
            recorded_on: '2025-05-01T14:16:00-07:00',
            caretakers: [1],
            pets: [1],
            resourcetype: 'Vitals',
        }
        console.log('sending request...')
        console.log(JSON.stringify(newEntryData))

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
                    console.error(`HTTP error! status: ${response.status}`)
                }
                return response.json();
            })
            // client side success
            .then(data => {
                console.log('Success:', data);
            })
            // client side error
            .catch(error => {
                console.error('Error:', error);
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
