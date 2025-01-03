import { Text, ScrollView, StyleSheet} from 'react-native';

import { theme } from '@/theme';


export default function AddEntry() {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.text}>Add Entry Screen</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorMediumBlue,
    },
    text: {
        color: theme.colorDarkBlue,
        fontSize: 46,
    },
});