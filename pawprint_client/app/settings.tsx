import { View, ScrollView, Text, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import SecondaryHeader from '@/components/SecondaryHeader';


export default function Settings() {
    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Settings' hasEditActions={true} />
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Settings Screen</Text>
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