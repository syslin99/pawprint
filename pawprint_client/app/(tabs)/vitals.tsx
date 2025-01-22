import { View, ScrollView, Text, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import { useStoreContext } from '@/components/StoreContext';
import MainHeader from '@/components/MainHeader';


export default function Vitals() {
    const { state, dispatch } = useStoreContext();
    console.log(Array.from(state.vitals.keys()));

    return (
        <View style={styles.screen}>
            <MainHeader title='Vitals' />
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Vitals Screen</Text>
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