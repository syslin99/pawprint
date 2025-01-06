import { View, ScrollView, Text, StyleSheet} from 'react-native';

import { theme } from '@/theme';
import MainHeader from '@/components/MainHeader';


export default function AddEntry() {
    return (
        <View style={styles.screen}>
            <MainHeader title='Add Entry' />
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Add Entry Screen</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colorMediumBlue,
    },
    text: {
        color: theme.colorDarkBlue,
        fontSize: 46,
    },
});