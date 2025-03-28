import { View, Text, StyleSheet } from 'react-native';

import { Entry } from '@/api_interfaces';


export default function EventRow({event} : {event:Entry}) {
    return (
        <View>
            <Text>event row for event {event.id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
})
