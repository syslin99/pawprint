import { View, ScrollView, Text, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
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
        backgroundColor: THEME.COLOR_MEDIUM_BLUE,
    },
    text: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 46,
    },
});