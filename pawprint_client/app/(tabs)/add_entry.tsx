import { View, Text, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import SecondaryHeader from '@/components/SecondaryHeader';


export default function AddEntry() {
    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Add Entry' hasEditActions={false}/>
            <Text>ADD ENTRY FORM</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
});