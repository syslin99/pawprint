import { View, ScrollView, Text, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import MainHeader from '@/components/MainHeader';


export default function Events() {
    return (
        <View style={styles.container}>
            <MainHeader title='Events'/>
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Events Screen</Text>
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