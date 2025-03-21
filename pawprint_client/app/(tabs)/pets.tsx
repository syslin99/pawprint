import { View, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import MainHeader from '@/components/MainHeader';
import PetList from '@/components/PetList';


export default function Pets() {
    return (
        <View style={styles.screen}>
            <MainHeader title='Pets' />
            <PetList />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
});