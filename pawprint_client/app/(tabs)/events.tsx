import { View, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import MainHeader from '@/components/MainHeader';
import EventList from '@/components/EventList';


export default function Events() {
    return (
        <View style={styles.screen}>
            <MainHeader title='Events'/>
            <EventList />
        </View>
    );
    }

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE
    },
});