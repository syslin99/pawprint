import { Text, ScrollView, StyleSheet} from 'react-native';

import { theme } from '@/theme';


export default function Pets() {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.text}>Pets Screen</Text>
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