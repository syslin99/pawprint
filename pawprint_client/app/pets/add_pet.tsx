import { View, Text, StyleSheet } from 'react-native';

import { THEME } from '@/theme';
import SecondaryHeader from '@/components/SecondaryHeader';


export default function AddPet() {
    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Add Pet' hasEditActions={false}/>
            <Text>ADD PET FORM</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
})
