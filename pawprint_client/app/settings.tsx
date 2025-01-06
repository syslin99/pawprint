import { View, ScrollView, Text, StyleSheet} from 'react-native';

import { theme } from '@/theme';
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
        backgroundColor: theme.colorMediumBlue,
    },
    text: {
        color: theme.colorDarkBlue,
        fontSize: 46,
    },
});