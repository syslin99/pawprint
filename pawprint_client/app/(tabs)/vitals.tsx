import { View, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import MainHeader from '@/components/MainHeader';
import VitalsList from '@/components/VitalsList';


export default function Vitals() {
    return (
        <View style={styles.screen}>
            <MainHeader title='Vitals'/>
            <VitalsList />
        </View>
    );
    }

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
});